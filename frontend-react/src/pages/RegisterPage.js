// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import AuthCard from '../components/auth/AuthCard';

// Definisikan komponen Spinner
const Spinner = () => <div className="spinner"></div>;

// Regex sederhana untuk validasi email
const emailRegex = /\S+@\S+\.\S+/;

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk error inline
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register, token } = useAuth();
  const { showToast } = useToast();

  // --- VALIDASI ONBLUR ---

  const validateName = () => {
    if (name.trim() === '') {
      setNameError('Nama wajib diisi');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email wajib diisi');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Email tidak valid');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // --- HANDLER SUBMIT ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Jalankan semua validasi sebelum submit
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    // Jika salah satu tidak valid, hentikan submit
    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      // Toast opsional untuk memberitahu user agar mengecek form
      showToast('Harap periksa kembali form Anda', 'error');
      return;
    }
    
    setIsLoading(true);
    await register(name, email, password); // Ini akan menangani toast sukses/gagal dari useAuth
    setIsLoading(false);
  };

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <AuthCard subtitle="Buat akun baru">
      <form id="registerForm" onSubmit={handleSubmit}>
        
        {/* Form Group Nama */}
        <div className="form-group">
          <input 
            type="text" 
            id="name" 
            className="form-input" 
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName} // Validasi saat keluar dari input
            required 
          />
          <label htmlFor="name" className="form-label">Nama Lengkap</label>
          {nameError && <small className="form-error">{nameError}</small>}
        </div>
        
        {/* Form Group Email */}
        <div className="form-group">
          <input 
            type="email" 
            id="email" 
            className="form-input" 
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail} // Validasi saat keluar dari input
            required 
          />
          <label htmlFor="email" className="form-label">Email</label>
          {emailError && <small className="form-error">{emailError}</small>}
        </div>
        
        {/* Form Group Password */}
        <div className="form-group">
          <input 
            type={showPassword ? 'text' : 'password'}
            id="password" 
            className="form-input input-password"
            placeholder=" " 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword} // Validasi saat keluar dari input
            required 
          />
          <label htmlFor="password" className="form-label">Password</label>
          <button 
            type="button" 
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {passwordError && <small className="form-error">{passwordError}</small>}
        </div>
        
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Daftar'}
        </button>
      </form>
      
      <div className="auth-links text-center">
        <span>Sudah punya akun? <Link to="/login" className="auth-link">Login di sini</Link></span>
      </div>
    </AuthCard>
  );
}

export default RegisterPage;