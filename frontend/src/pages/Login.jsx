import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      console.log('Login submitted');
      console.log(values);
      try {
        const loginData = await axios.post('http://localhost:4000/api/v1/users/login', values);
        if (loginData.data.user) {
            // Update user context with user data
            signIn(loginData.data.user);
            // Redirect to the home page or any other page after successful login
            navigate('/home');
          }
      } catch (err) {
        console.error('Login error:', err);
      }

      setLoading(false);
    },
  });

  return (
    <div className="user-login">
      {loading ? (
        'Logging in...'
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.errors.email && <p style={{ color: 'red' }}>{formik.errors.email}</p>}

          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.errors.password && <p style={{ color: 'red' }}>{formik.errors.password}</p>}

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
