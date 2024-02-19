/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";
import api from '../../api/patients'

const AddPhysician = () => {

    const navigate = useNavigate();

    const [phyData, setPhyData] = useState({
        name: '',
        officeAddress: "",
        city: "",
        state: "",
        zipCode: ""
    })

    const allPhy = () => {
        navigate('/allPhysicians');
    }

    const navigateAllPhy = () => {
        navigate('/allPhysicians');
        window.location.reload(); 
    }

    const handleChange = (e) => {
        setPhyData({
          ...phyData, // Spread the unchanged values
          [e.target.name]: e.target.value, // Update the state of the changed value
        });
      };

      const add = (e) => {
        e.preventDefault();
        console.log(phyData);
        api.post("/addPhysician", phyData);
        navigateAllPhy();
         
      }
   
    return(
        <div>
    <ul class="nav justify-content-end">
    <li class="nav-item">
      <Link to={'/'}><a class="nav-link">Home</a></Link>
    </li>
    <li class="nav-item">
      <a class="nav-link" onClick={allPhy}>All Physicians</a>
    </li>
  </ul>
  <h2 className="head">Add Physician</h2>
  <form className="addPhy" onSubmit={add}>
    <input type="hidden" />
    <div class="border border-secondary rounded p-3">
      <div className="form-group-row">
        <label class="col-sm-4 col-form-label" >Name:</label>
        <div class="col-sm-8">
          <input type="text" name="name" class="form-control" value={phyData.name} onChange={handleChange} required/>

        </div>


      </div>

      <div className="form-group-row">
        <label class="col-sm-4 col-form-label">Address:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" name="officeAddress" value={phyData.officeAddress} onChange={handleChange} required/>

        </div>


      </div>

      <div className="form-group-row">
        <label class="col-sm-4 col-form-label">City:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" name="city" value={phyData.city} onChange={handleChange} required/>

        </div>


      </div>


      <div className="form-group-row">
        <label class="col-sm-4 col-form-label">State:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" name="state" value={phyData.state} onChange={handleChange} required/>

        </div>


      </div>



      <div className="form-group-row">
        <label class="col-sm-4 col-form-label">Zip Code:</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" name="zipCode" value={phyData.zipCode} onChange={handleChange} required/>
        </div>
      </div>
      <br/>


      <div className="text-center">
        <button type="submit" class="btn btn-primary m-2">Save</button>
        <button type="button" class="btn btn-secondary m-2" onClick={allPhy} >Cancel</button>

      </div>
      </div>
  </form>
  
</div>
    )
}

export default AddPhysician;