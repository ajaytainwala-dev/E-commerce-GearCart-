// App.js
"use client"
import React, { useState, useRef } from 'react';

export const OTPInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input on backspace
    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: '40px',
            height: '40px',
            margin: '0 5px',
            textAlign: 'center',
            fontSize: '18px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    // Here you could send the mobile number to an API to send an OTP
    // For demo purposes, just show OTP input
    setShowOtpInput(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {!showOtpInput ? (
        <form onSubmit={handleMobileNumberSubmit} style={{ textAlign: 'center' }}>
          <h3>Enter your mobile number</h3>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            style={{
              width: '250px',
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button type="submit" style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}>
            Send OTP
          </button>
        </form>
      ) : (
        <div>
          <h3>Enter the OTP sent to your mobile number</h3>
          <OTPInput length={6} />
        </div>
      )}
    </div>
  );
};

export default App;