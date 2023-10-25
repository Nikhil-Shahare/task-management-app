import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfileUpdate = () => {
  const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      image: null,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      image: Yup.mixed()
        .test('FILE_SIZE', 'File is too big! Maximum size is 2MB.', (value) => {
          return value ? value.size <= 2 * 1024 * 1024 : true;
        })
        .test('FILE_TYPE', 'Invalid file type! Only PNG and JPEG are allowed.', (value) => {
          return value ? ['image/png', 'image/jpeg'].includes(value.type) : true;
        }),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      // Upload the image to Cloudinary
      const { image, ...otherValues } = values;
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', VITE_UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = res.data.secure_url;

        // Combine all the form data, including the image URL
        const formDataToSubmit = { ...otherValues, image: imageUrl };
        const updateData = await axios.put(`http://localhost:4000/api/v1/users/${user._id}`, formDataToSubmit);
        updateUser(updateData.data);

        navigate('/home'); // Redirect to the profile page
      } catch (err) {
        console.error('Error updating user profile:', err);
      }
      setLoading(false);
    },
  });

  const handleDeleteAccount = async () => {
    try {
      // Send a request to delete the user account (replace with your API endpoint)
      await axios.delete(`http://localhost:4000/api/v1/users/${user._id}`);

      // Logout the user after the account is deleted
      logout();
    } catch (err) {
      console.error('Error deleting user account:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>

      {loading ? (
        'Updating user profile...'
      ) : (
        <div className="space-y-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-600 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                className="p-2 border rounded"
                placeholder="First Name"
              />
              {formik.errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                className="p-2 border rounded"
                placeholder="Last Name"
              />
              {formik.errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="text-sm font-medium text-gray-600 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
                className="p-2 border rounded"
              />
              {formik.errors.image && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Update Profile
            </button>
          </form>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileUpdate;
