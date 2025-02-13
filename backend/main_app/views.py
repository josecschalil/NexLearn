from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer
from django.core.mail import send_mail
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from main_app.models import CustomUser

User = get_user_model()


class ContactUsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:

            data = json.loads(request.body)
            first_name = data.get('firstName', '')
            last_name = data.get('lastName', '')
            phone = data.get('phone', '')
            email = data.get('email', '')
            message = data.get('message', '')

            send_mail(
                subject="Thank You for Contacting Us!",
                message=f"Hi {first_name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Team",
                from_email="no-reply@yourdomain.com",
                recipient_list=[email],
                fail_silently=False,
            )

            # Send the form details to the admin
            admin_email = "josecschalil@gmail.com"
            admin_subject = "New Contact Us Form Submission"
            admin_message = (
                f"New contact form submission:\n\n"
                f"Name: {first_name} {last_name}\n"
                f"Phone: {phone}\n"
                f"Email: {email}\n"
                f"Message: {message}\n"
            )

            send_mail(
                subject=admin_subject,
                message=admin_message,
                from_email="no-reply@yourdomain.com",
                recipient_list=[admin_email],
                fail_silently=False,
            )

            return JsonResponse({"message": "Your message has been sent successfully."}, status=200)

        except Exception as e:
            return JsonResponse({"error": "Something went wrong while processing your request.", "details": str(e)}, status=500)


token_generator = PasswordResetTokenGenerator()


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            # Check if a user exists with the given email
            user = CustomUser.objects.get(email=email)

            # Generate a secure token and UID
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = token_generator.make_token(user)

            reset_link = f"http://localhost:3000/reset-password/{uidb64}/{token}/"
            subject = "Reset Your Password"
            message = f"""
            Hello {user.name},

            Click the link below to reset your password:
            {reset_link}

            If you didn't request this, you can safely ignore this email.

            Thanks,
            Your Team
            """
            send_mail(
                subject,
                message,
                'no-reply@yourdomain.com',
                [email],
                fail_silently=False,
            )

            return Response({'message': 'Password reset email sent successfully!'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'message': 'No user found with this email address!'}, status=status.HTTP_404_NOT_FOUND)


class ResetPasswordConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            # Decode the UID and get the user
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)

            # Verify the token
            if not token_generator.check_token(user, token):
                return Response({'message': 'Invalid or expired token!'}, status=status.HTTP_400_BAD_REQUEST)

            # Get and validate the new password
            new_password = request.data.get('password')
            confirm_password = request.data.get('password')

            if len(new_password) < 8:
                return Response({'message': 'Password must be at least 8 characters long.'}, status=status.HTTP_400_BAD_REQUEST)
            if new_password != confirm_password:
                return Response({'message': 'Passwords do not match!'}, status=status.HTTP_400_BAD_REQUEST)

            # Update the user's password
            user.password = make_password(new_password)
            user.save()

            return Response({'message': 'Password reset successfully!'}, status=status.HTTP_200_OK)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({'message': 'Invalid request!'}, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    """Handles user registration."""
    permission_classes = [AllowAny]

    def post(self, request):
        """Handle POST request for user registration."""
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            self.send_verification_email(user, request)

            return Response(
                {'message': 'User registered successfully! Please check your email to verify your account.'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user, request):
        """Send account verification email to the user."""
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode('utf-8'))

        current_site = get_current_site(request)
        relative_link = reverse(
            'verify-email', kwargs={'uidb64': uid, 'token': token})
        # full_url = f'http://{current_site.domain}{relative_link}'
        full_url = f'http://localhost:3000{relative_link}'
        print("Relative Link:", relative_link)
        print("Full URL:", full_url)

        email_subject = "Activate your account"
        email_message = render_to_string(
            'registration/activation_email.html',
            {'user': user, 'activation_url': full_url}
        )

        send_mail(
            email_subject,
            email_message,
            'no-reply@yourdomain.com',
            [user.email],
            fail_silently=False,
            html_message=email_message
        )


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'message': 'Invalid token!'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """Handles user authentication and token generation."""
    permission_classes = [AllowAny]

    def post(self, request):
        """Handle POST request for user authentication."""
        serializer = UserAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"name": user.name, "email": user.email, })
