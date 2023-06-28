import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const BoatForm = ({ addBoat }) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const boatSchema = yup.object().shape({
    make: yup.string()
      .min(1, 'Make must be at least 1 character')
      .max(30, 'Make must be at most 30 characters')
      .required('Make is required'),
    model: yup.string()
      .min(1, 'Model must be at least 1 character')
      .max(50, 'Model must be at most 50 characters')
      .required('Model is required'),
    description: yup.string()
      .required('Description is required'),
    price: yup.number()
      .min(1, 'Price must be greater than $1.00')
      .max(1000000000000, 'Price must not be greater than $1,000,000,000,000'),
    image: yup.string()
      .required('Image is required'),
    city: yup.string()
      .required('City is required'),
    state: yup.string()
    .required('State is required'),
    country: yup.string()
    .required('Country is required'),
  });

  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      description: "",
      price: "",
      image: "",
      city: "",
      state: "",
      country: ""
    },
    validationSchema: boatSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("/boats/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              addBoat(data);
              resetForm({ values: "" });
              history.push("/");
            });
          } else {
            r.json().then((error) => setErrors(error.message));
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <div className="App">
      <p className="errors">{errors}</p>
      <Form onSubmit={formik.handleSubmit}>
        <label>Make </label>
        <input
          type="text"
          name="make"
          value={formik.values.make}
          onChange={formik.handleChange}
        />
        {formik.errors.make ? (
          <div className="error-message show">{formik.errors.make}</div>
        ) : null}
        <label>Model</label>
        <input
          type="text"
          name="model"
          value={formik.values.model}
          onChange={formik.handleChange}
        />
        {formik.errors.model ? (
          <div className="error-message show">{formik.errors.model}</div>
        ) : null}
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        {formik.errors.price ? (
          <div className="error-message show">{formik.errors.price}</div>
        ) : null}
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />
        {formik.errors.image ? (
          <div className="error-message show">{formik.errors.image}</div>
        ) : null}
        <label>Description</label>
        <textarea
          type="text"
          rows="10"
          cols="50"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description ? (
          <div className="error-message show">{formik.errors.description}</div>
        ) : null}
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        {formik.errors.city ? (
          <div className="error-message show">{formik.errors.city}</div>
        ) : null}
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
        />
        {formik.errors.state ? (
          <div className="error-message show">{formik.errors.state}</div>
        ) : null}
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
        />
        {formik.errors.country ? (
          <div className="error-message show">{formik.errors.country}</div>
        ) : null}
        <input type="submit" />
      </Form>
    </div>
  );
};

export default BoatForm;

const Form = styled.form`
display: flex;
flex-direction: column;
width: 400px;
margin: auto;
font-family: Arial;
font-size: 30px;
input[type="submit"] {
background-color: gray;
color: white;
height: 40px;
font-family: Arial;
font-size: 30px;
margin-top: 10px;
margin-bottom: 10px;
}
`;