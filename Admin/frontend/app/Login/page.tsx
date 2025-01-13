"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
    const router = useRouter();
React.useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
        router.push('/Dashboard')
    }
})
    const onSubmit = async (data: { email: string; password: string }) => {
        // Add your login logic here
        console.log(data);
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch("http://127.0.0.1:5000/auth/login", {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // Handle HTTP errors (e.g., 400, 500)
          const errorData = await response.json(); // Try to parse the error response
          console.error("API Error:", response.status, errorData); // Log the error details
          // Display an error message to the user
          throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
        console.log("API Response:", result);
        localStorage.setItem("token", result.token);
        router.push('/Dashboard');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7fafc' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '28rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#4a5568', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }} htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                    style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', lineHeight: '1.25' }}
                />
                {errors.email && typeof errors.email.message === 'string' && <p style={{ color: '#f56565', fontSize: '0.75rem', fontStyle: 'italic' }}>{errors.email.message}</p>}
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#4a5568', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                    style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', appearance: 'none', border: '1px solid #e2e8f0', borderRadius: '0.375rem', width: '100%', padding: '0.5rem 0.75rem', color: '#4a5568', marginBottom: '0.75rem', lineHeight: '1.25' }}
                />
                {errors.password && typeof errors.password.message === 'string' && <p style={{ color: '#f56565', fontSize: '0.75rem', fontStyle: 'italic' }}>{errors.password.message}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                    type="submit"
                    style={{ backgroundColor: '#4299e1', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}
                >
                    Login
                </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default LoginPage;