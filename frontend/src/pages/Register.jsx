import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const{VITE_CLOUD_NAME,VITE_API_KEY,VITE_API_SECRET,VITE_UPLOAD_PRESET} = import.meta.env;
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
  image: Yup.mixed().required("Image is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  image: "",
};

const UserForm = () => {
  const handleSubmit = async (values, actions) => {
    // Image upload to Cloudinary
    console.log("this is values.image",values)
    const formData = new FormData();
    formData.append("file", values.image);
    formData.append("upload_preset", VITE_UPLOAD_PRESET); // Set this in your Cloudinary settings

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      values.image = result.secure_url; // Update the form field with the Cloudinary URL

      // Now you can send the entire form data (including the Cloudinary URL) to your server for user creation
      console.log("Form Data Submitted:", values);

      // Reset the form after submission
      actions.resetForm();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form >
            <div>
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="text" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            
            <div>
              <label htmlFor="image">Image:</label>
              <Field
                type="file"
                name="image"
                onChange={(event) => {
                  setFieldValue("image",event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>
            <div>
              <button type="submit">Create User</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
