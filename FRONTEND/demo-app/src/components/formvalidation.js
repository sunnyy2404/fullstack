import React, { useState } from 'react';

const MyForm = () => {
  // State to track form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State to track form input validity
  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input and update form errors
    validateInput(name, value);
  };

  // Function to validate form inputs
  const validateInput = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'username':
        errorMessage = value.length < 3 ? 'Username must be at least 3 characters long' : '';
        break;
      case 'email':
        // You can use a regular expression for email validation
        errorMessage = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address' : '';
        break;
      case 'password':
        errorMessage = value.length < 6 ? 'Password must be at least 6 characters long' : '';
        break;
      default:
        break;
    }

    // Update form errors
    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (Object.values(formErrors).every((error) => error === '')) {
      // Form is valid, you can submit the data or perform other actions
      alert("Details are valid")
      console.log('Form is valid. Submitting:', formData);
    } else {
      // Form is invalid, show an error message or handle it as needed
      console.log('Form is invalid. Please fix the errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <span>{formErrors.username}</span>
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <span>{formErrors.email}</span>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <span>{formErrors.password}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
