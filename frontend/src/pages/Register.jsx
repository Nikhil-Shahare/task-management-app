import { useFormik } from "formik";
import * as Yup from "yup";
import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;
const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required("First Name is required")
        .min(2, "Minimum 2 characters")
        .max(10, "Maximum 10 characters"),
      lastName: Yup.string()
        .required("Last Name is required")
        .min(2, "Minimum 2 characters")
        .max(10, "Maximum 10 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("FILE_SIZE", "File is too big! Maximum size is 2MB.", (value) => {
          return value ? value.size <= 2 * 1024 * 1024 : true;
        })
        .test("FILE_TYPE", "Invalid file type! Only PNG and JPEG are allowed.", (value) => {
          return value ? ["image/png", "image/jpeg"].includes(value.type) : true;
        }),
    }),

    onSubmit: async (values) => {
        setLoading(true);
      console.log("submitted");
      console.log(values);

      // Upload the image to Cloudinary
      const { image,confirmPassword, ...otherValues } = values;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", VITE_UPLOAD_PRESET);

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = res.data.secure_url;

        // Combine all the form data, including the image URL
        const formDataToSubmit = { ...otherValues, image: imageUrl };
        const uploadData = await axios.post("http://localhost:4000/api/v1/users",formDataToSubmit)
        console.log("Form Data Submitted:", uploadData);
        navigate("/home")
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
      }
      setLoading(false)
    },
  });

  return (
    <div className="user-registration">
        {loading?
        "creating user":
            <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="First Name"
        />
        {formik.errors.firstName && <p style={{ color: "red" }}>{formik.errors.firstName}</p>}

        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder="Last Name"
          />
        {formik.errors.lastName && <p style={{ color: "red" }}>{formik.errors.lastName}</p>}

        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
          />
        {formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}

        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          />
        {formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}

        <input
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          placeholder="Confirm Password"
          />
        {formik.errors.confirmPassword && <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>}

        <input
          type="file"
          name="image"
          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
          />
        {formik.errors.image && <p style={{ color: "red" }}>{formik.errors.image}</p>}

        <button type="submit">Upload</button>
      </form>
}
    </div>
  );
};

export default Register;