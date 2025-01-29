"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import showPopup from '@/app/components/Toast';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import axios from 'axios';

const VerifyEmail = () => {
  const router = useRouter();
  const { uidb64, token } = useParams(); // Get the uidb64 and token from the URL
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uidb64 && token) {
      axios
        .get(`${apiUrl}/verify-email/${uidb64}/${token}/`)
        .then((response) => {
          showPopup('Your email has been successfully verified!')
          setMessage('Your email has been successfully verified!');
          setLoading(false);
          router.push(`/signin`);
          
        })
        .catch((error) => {
          showPopup('Error');
          setMessage('Invalid or expired token.');
   
        });
    }



  }, [uidb64, token]);

 

  return (
    <div className='m-auto bg-[#EBFFF9] h-screen'>
      <h1>Email Verification</h1>
      {loading ? (
        <p>Verifying...</p>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
