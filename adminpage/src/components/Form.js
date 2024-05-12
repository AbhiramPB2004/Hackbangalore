import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import { Form } from 'react-router-dom';
function FormApp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [address, setAddress] = useState('');
  const [aadharFile, setAadharFile] = useState(null);
  const [passbookFile, setPassbookFile] = useState(null);
  const [formDetails, setFormdetails] = useState({}); 
  const [file, setFile] = useState(null);
  const [valuedetail, setValue] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let details = 
        {
          "firstname":firstName,
          "lastname":lastName,
          "gender":gender,
          "day":day,
          "month":month,
          "year":year,
          "address":address
        }
      console.log(firstName); 
      const formData = new FormData();
      formData.append('file', aadharFile);
      console.log("formdetails");
      console.log(details);
      const response = await axios.post('http://localhost:8000/test',details);
      await axios.post('http://localhost:8000/process_image',formData).then((response) => {
        console.log(response.data.status);
        setValue(response.data.status);
      });
      
    } catch (error) {
      console.error(error);
      
    }

    console.log('Submitted values:', {
      firstName,
      lastName,
      gender,
      day,
      month,
      year,
      address,
      aadharFile,
      passbookFile
    });
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h1>Loan Application Form</h1>
          <div className="input-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="dob">Date of Birth:</label>
            <div className="dob-select">
              <select id="day" name="day" value={day} onChange={(e) => setDay(e.target.value)}>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select id="month" name="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <select id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="file-upload">
            <label htmlFor="aadharFile">Upload Aadhar Card:</label>
            <input type="file" id="aadharFile" accept=".pdf" onChange={(e) => setAadharFile(e.target.files[0])} />
          </div>
          <div className="file-upload">
            <label htmlFor="passbookFile">Upload Bank Passbook:</label>
            <input type="file" id="passbookFile" accept=".pdf" onChange={(e) => setPassbookFile(e.target.files[0])} />
          </div>
          <div>values detetected {valuedetail}</div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );






}

export default FormApp;
