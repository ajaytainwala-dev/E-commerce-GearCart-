"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
    const router = useRouter();

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

        const response = await fetch("http://127.0.0.1:6000/admin/login", {
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
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && typeof errors.email.message === 'string' && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && typeof errors.password.message === 'string' && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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