"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import axios from 'axios';
import api from "../../../services/api";

const VerifyEmail = () => {
  const router = useRouter();
  const { uidb64, token } = useParams(); // Get the uidb64 and token from the URL
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uidb64 && token) {
      api
        .get(`/verify-email/${uidb64}/${token}/`)
        .then((response) => {
          setMessage('Your email has been successfully verified!');
          toast.success('Your email has been successfully verified!');
          setLoading(false);
          router.push(`/signin`);
          
        })
        .catch((error) => {
          setMessage('Invalid or expired token.');
          toast.error('Invalid or expired token.');
        });
    }



  }, [uidb64, token]);

 

  return (
    <div className='m-auto  h-screen'>
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
