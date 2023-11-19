import React, { useState } from 'react';
import Swal from 'sweetalert2';

const BillingAddressForm = ({ onFormSubmit }) => {
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '', // Initialize with an empty string
    state: '',   // Initialize with an empty string
    pincode: '',
    gender: '', // Initialize with an empty string
    agree: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setBillingInfo({
        ...billingInfo,
        [name]: checked,
      });
    } else {
      setBillingInfo({
        ...billingInfo,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (onFormSubmit) {
      onFormSubmit(); // Call the provided callback to notify the parent component
    }
    try {
      const response = await fetch('/api/billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billingInfo),
      });

      if (response.ok) {
        console.log('Billing information submitted successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Billing information received successfully!',
        });
      } else {
        console.error('Failed to submit billing information');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to submit billing information!',
        });
      }
    } catch (error) {
      console.error('Error submitting billing information:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error submitting billing information!',
      });
    }
    // Handle form submission, e.g., send data to the server
  };

  const getStatesForCountry = (country) => {
    switch (country) {
      case 'India':
        return ['Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'Other'];
      case 'UK':
        return ['England', 'Scotland', 'Wales', 'Northern Ireland'];
      case 'USA':
        return ['New York', 'California', 'Texas', 'Florida', 'Other'];
      case 'Canada':
        return ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Other'];
      default:
        return ['Select Country First'];
    }
  };

  const handleLabelClick = (inputId) => {
    document.getElementById(inputId).focus();
  };

  return (
    <div className="custom-billing-form-container">
      <form id="billing_form" onSubmit={handleFormSubmit}>
        <div className="custom-billing-form-header">
          <h3>Billing Address</h3>
        </div>

        <div className="custom-billing-form-body">
          <div className="custom-horizontal-inputs">
            <div className="custom-billing-input-box">
              <label
                htmlFor="firstName"
                onClick={() => handleLabelClick('firstName')}
                className={billingInfo.firstName ? 'active' : ''}
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={billingInfo.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="custom-billing-input-box">
              <label
                htmlFor="lastName"
                onClick={() => handleLabelClick('lastName')}
                className={billingInfo.lastName ? 'active' : ''}
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={billingInfo.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="custom-horizontal-inputs">
          
            <label>Gender</label>
            <div className="gender-radio-buttons">
              <label>
               <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={billingInfo.gender === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
              &emsp;   <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={billingInfo.gender === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
              <label>
              &emsp;   <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={billingInfo.gender === 'other'}
                  onChange={handleInputChange}
                />
                Other
              </label>
            </div>
          </div>
          <div className="custom-vertical-inputs">
            <div className="custom-billing-input-box">
              <label
                htmlFor="email"
                onClick={() => handleLabelClick('email')}
                className={billingInfo.email ? 'active' : ''}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingInfo.email}
                onChange={handleInputChange}
                required
              />
            </div><br></br>

            <div className="custom-billing-input-box">
              <label
                htmlFor="address"
                onClick={() => handleLabelClick('address')}
                className={billingInfo.address ? 'active' : ''}
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={billingInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="custom-horizontal-inputs">
          
              <select
                name="country"
                value={billingInfo.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
              &emsp;&emsp;&emsp;&emsp;
              <select
                name="state"
                value={billingInfo.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Select State</option>
                {getStatesForCountry(billingInfo.country).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            
              &emsp;&emsp;&emsp;&emsp;
            <div className="custom-billing-input-box">
              <label
                htmlFor="pincode"
                onClick={() => handleLabelClick('pincode')}
                className={billingInfo.pincode ? 'active' : ''}
              >
                Pincode
              </label>
              <input
                type="tel"
                id="pincode"
                name="pincode"
                value={billingInfo.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        <br></br>
            <label>
              <input
                type="checkbox"
                name="agree"
                checked={billingInfo.agree}
                onChange={handleInputChange}
              />
              I agree to the terms and conditions
            </label>
          
        </div>

        <button className="custom-billing-submit-button" type="submit">
          Submit Billing Address
        </button>
      </form>
    </div>
  );
};

export default BillingAddressForm;
