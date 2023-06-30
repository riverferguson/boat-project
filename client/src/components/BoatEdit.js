import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const BoatEdit = ({ boatEdit, updateBoat }) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const boatSchema = yup.object().shape({
    make: yup
      .string()
      .min(1, 'Make must be at least 1 character')
      .max(30, 'Make must be at most 30 characters')
      .required('Make is required'),
    model: yup
      .string()
      .min(1, 'Model must be at least 1 character')
      .max(50, 'Model must be at most 50 characters')
      .required('Model is required'),
    description: yup.string().required('Description is required'),
    price: yup
      .number()
      .min(1, 'Price must be greater than $1.00')
      .max(1000000000000, 'Price must not be greater than $1,000,000,000,000'),
    image: yup.string().required('Image is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
  });

  const formik = useFormik({
    initialValues: {
      make: '',
      model: '',
      description: '',
      price: '',
      image: '',
      city: '',
      state: '',
      country: '',
    },
    validationSchema: boatSchema,
    onSubmit: (values, { resetForm }) => {
      const { make, model, image, price, description, city, state, country } = values;
      fetch(`/boats/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boat: { make, model, image, price, description }, location: { city, state, country } }),
      })
        .then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              updateBoat(data);
              resetForm({ values: '' });
              history.push('/boats');
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
      <ErrorMessage>{errors}</ErrorMessage>
      <Form onSubmit={formik.handleSubmit}>
        <label>Make </label>
        <input type="text" name="make" value={formik.values.make} onChange={formik.handleChange} />
        {formik.touched.make && formik.errors.make && (
          <ErrorMessage>{formik.errors.make}</ErrorMessage>
        )}
        <label>Model</label>
        <input type="text" name="model" value={formik.values.model} onChange={formik.handleChange} />
        {formik.touched.model && formik.errors.model && (
          <ErrorMessage>{formik.errors.model}</ErrorMessage>
        )}
        <label>Price</label>
        <input type="number" name="price" value={formik.values.price} onChange={formik.handleChange} />
        {formik.touched.price && formik.errors.price && (
          <ErrorMessage>{formik.errors.price}</ErrorMessage>
        )}
        <label>Image</label>
        <input type="text" name="image" value={formik.values.image} onChange={formik.handleChange} />
        {formik.touched.image && formik.errors.image && (
          <ErrorMessage>{formik.errors.image}</ErrorMessage>
        )}
        <label>Description</label>
        <textarea
          type="text"
          rows="10"
          cols="50"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
          <ErrorMessage>{formik.errors.description}</ErrorMessage>
        )}
        <label>City</label>
        <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} />
        {formik.touched.city && formik.errors.city && (
          <ErrorMessage>{formik.errors.city}</ErrorMessage>
        )}
        <label>State</label>
        <input type="text" name="state" value={formik.values.state} onChange={formik.handleChange} />
        {formik.touched.state && formik.errors.state && (
          <ErrorMessage>{formik.errors.state}</ErrorMessage>
        )}
        <label>Country</label>
        <input type="text" name="country" value={formik.values.country} onChange={formik.handleChange} />
        {formik.touched.country && formik.errors.country && (
          <ErrorMessage>{formik.errors.country}</ErrorMessage>
        )}
        <input type="submit" />
      </Form>
    </div>
  );
};

export default BoatEdit;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  font-family: Arial;
  font-size: 30px;

  input[type='submit'] {
    background-color: gray;
    color: white;
    height: 40px;
    font-family: Arial;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;