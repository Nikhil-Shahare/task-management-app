import { useFormik } from "formik";
import * as Yup from "yup";
import React from 'react';
import { color } from "@cloudinary/url-gen/qualifiers/background";
import axios from "axios";
const{VITE_CLOUD_NAME,VITE_API_KEY,VITE_API_SECRET,VITE_UPLOAD_PRESET} = import.meta.env;
const Log = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      password: Yup.string(),
      image: Yup.mixed().required("Image is required")
      .test("FILE_SIZE", "File is too big! Maximum size is 2MB.", (value) => {
        return value ? value.size <= 2 * 1024 * 1024 : true;
      })
      .test("FILE_TYPE", "Invalid file type! Only PNG and JPEG are allowed.", (value) => {
        return value ? ["image/png", "image/jpeg"].includes(value.type) : true;
      })
    }),
      
    onSubmit: async(values, { resetForm }) => {
      console.log("submitted");
      console.log(values);
      const {image} = values
      const formData = new FormData()
      try{
          formData.append("file",image)
        formData.append("upload_preset",VITE_UPLOAD_PRESET)
       const res = await axios.post(` https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,formData)
       console.log("this is cloudinary res ",res)
      }catch(err){
        console.log(err)
      }
      // Reset the form after submission
    //   resetForm();
    },
  });

  return (
    <div className="user-registration">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="First Name"
        />

        <input
          type="text"
          name="lastName"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          placeholder="Last Name"
        />

        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />

        <input
          type="file"
          name="image"
          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
        />
        <div>{formik.errors.image && <p style={{color:"red"}}>{formik.errors.image}</p>}</div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Log;
