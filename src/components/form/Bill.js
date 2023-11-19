import React,{useState} from 'react';
import BillingAddressForm from './BillingAddressForm';


const Bill = () => {
  const [showFirstImage, setShowFirstImage] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false); 

  const toggleImages = () => {
    setShowFirstImage(!showFirstImage);
  };
  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setShowFirstImage(true);
  };
  
  return (
    <div className="bill-container">
      <br></br><br></br><br></br><br></br>
      <div className="form-with-image">
        <BillingAddressForm onFormSubmit={handleFormSubmit}/>
      </div>
      {formSubmitted && (
        <>
     
      {showFirstImage ? (
        <img
          src="/images/1700326398865.png" // Adjust the path as per your folder structure
          alt="Your Image Alt Text"
          className="image-style" // Add your preferred CSS class for styling the image
          style={{ width: "400px", height: "500px", marginTop: "-500px", marginLeft: "1000px" }}
        />
      ) : (
        <img
          src="/images/1700328003508.png" // Adjust the path as per your folder structure
          alt="Your Image Alt Text"
          className="image-style" // Add your preferred CSS class for styling the image
          style={{ width: "400px", height: "500px", marginTop: "-500px", marginLeft: "1000px" }}
        />
      )}

      <button onClick={toggleImages} style={{ marginTop: "20px" ,color:"purple",fontFamily:"sans-serif",fontSize:"20px",fontWeight:"bolder"}}>
        {showFirstImage ? "Procced with GPAY" : "Proceed with PHONEPAY"}
      </button>
      </>
      )}
    </div>
  );
};

export default Bill;
