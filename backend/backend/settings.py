from pathlib import Path
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent


RAZORPAY_KEY_ID = "rzp_test_MMtbyq8sHx2QaO"
RAZORPAY_KEY_SECRET = "bQWcQjJUwScgrNiKkCTmsJG4"


# Media & Static Files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
STATIC_URL = 'static/'


# Installed Apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main_app',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'django.contrib.sites',
    'corsheaders',
    'channels',
    'courses_app',
    'django_filters',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'
ASGI_APPLICATION = 'backend.asgi.application'


SECRET_KEY = "django-insecure-igt2(drbd-j!9174r@skyw1p%&f53i3q5dhlpp7o$!(4t$7ko0"
DEBUG = True

# Allow All Hosts & CORS (Temporary for Development)
ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["*"]
CORS_ALLOWED_ORIGINS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True  # Required for Django-CORS-Headers


# Authentication & Permissions
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'userid',
    'USER_ID_CLAIM': 'user_id',
}

# Email Configuration

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],  # Ensure this directory exists
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "jeeneetpulse",
        "USER": "postgres",
        "PASSWORD": "1234",
        "HOST": "db",
        "PORT": "5432",
    }
}

# Email Configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "websitenotificationsender@gmail.com"
EMAIL_HOST_PASSWORD = "cnbhnghsdfuqccez"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Site & Djoser Settings
SITE_ID = 1
DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'auth/users/reset_password_confirm/{uid}/{token}/',
    'SEND_ACTIVATION_EMAIL': False,
    'SERIALIZERS': {
        'user_create': 'djoser.serializers.UserCreateSerializer',
        'user': 'djoser.serializers.UserSerializer',
        'current_user': 'djoser.serializers.UserSerializer',
    },
}

# Content Security Policy (CSP) Settings
CSP_DEFAULT_SRC = ("'self'",)
CSP_FONT_SRC = ("'self'", "https://fonts.gstatic.com",
                "https://fonts.googleapis.com")
CSP_STYLE_SRC = ("'self'", "https://fonts.googleapis.com", "'unsafe-inline'")
CSP_IMG_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'")
CSP_REPORT_URI = '/csp-violation-report-endpoint/'

SECURE_CONTENT_TYPE_NOSNIFF = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'main_app.CustomUser'
