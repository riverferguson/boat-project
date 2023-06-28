import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const BoatForm = ({ addBoat }) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const boatSchema = yup.object().shape({
    make: yup.string(),
    model: yup.string(),
    description: yup.string(),
    price: yup.number(),
    city: yup.string(),
    state: yup.string(),
    country: yup.string()
  });

  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      description: "",
      price: "",
      city: "",
      state: "",
      country: ""
    },
    validationSchema: boatSchema,
    onSubmit: (values, { resetForm }) => {
      fetch("/boats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
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
background-color: #42ddf5;
color: white;
height: 40px;
font-family: Arial;
font-size: 30px;
margin-top: 10px;
margin-bottom: 10px;
}
`;
