import React, { useEffect, useState } from 'react';
import api from '../../api/patients'
import '../App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

function EditPatient(props) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
    patId: id,
    address: "",
    zipCode: "",
    orderDate: "",
    state: "",
    fname: "",
    city: "",
    ssn: "",
    lname: "",
    dob: "",
    phyId: ""
    })

    const [phyName, setPhyName] = useState({
        phyId: "",
        name: ""

    })

    useEffect(() => {
        const getPatData = async () => {
          const pat = await api.get('/patient/'+id);
          if(pat) setValues(pat.data);

          const phy = await api.get('/physician/'+pat.data.phyId);
          if(phy) setPhyName(phy.data);
        };

        getPatData();
    }, [id]);

    const requiredFieldsValidation = (e) => {
      if (e.lname === "" || e.fname === "" || e.dob === "" || e.orderDate === "" || e.phyId === ""){
        alert("Please fill out all the required fields.");
        return false;
      } else{
        return true;
      }
    }
    
    const ssnValidation = (e) => {
      let isNum = /^\d+$/.test(e);
      if (e.length > 0){
        if (isNum === false || e.length < 9){
        alert("Please Make sure SSN is correct and has 9 Digits.");
        return false;
      } else{
        return true;
      }
    }
      else{
        return true;
      }
    }

    const add = (e) => {
    
      let ssn;
      const fieldsVal = requiredFieldsValidation(values);
    
      if (fieldsVal === true){
        ssn = ssnValidation(values.ssn);
      }
    
      if (ssn === true){
        console.log(values);
        api.post("/editPatient/"+id , values);

        navigate("/");
        window.location.reload();
      }
    }

    const handleChange = (e) => {
      setValues({
        ...values, // Spread the unchanged values
        [e.target.name]: e.target.value, // Update the state of the changed value
      });
    };
    
return(
<div>
    <h2 className="head">Edit Patient {values.lname}, {values.fname}</h2>
    <div className='editForm'>
    <input type="hidden"></input>
    <div class="border border-secondary rounded p-3">
<div class="addPatient ">

<div><label class="col-sm-4 col-form-label">Last Name:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='lname' value={values.lname} onChange={handleChange} required></input>

</div></div>


<div class="form-group-row">
<label class="col-sm-4 col-form-label">First Name:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='fname' value={values.fname} onChange={handleChange} required/>

</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">DOB:</label>
<div class="col-sm-8">
  <input type="date" class="form-control" name='dob' value={values.dob} onChange={handleChange} required/>

</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">SSN:</label>
<div class="col-sm-8">
  <input id="ssn" name="ssn" class="form-control" value={values.ssn} onChange={handleChange}/>

</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">Address:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='address' value={values.address} onChange={handleChange}/>

</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">City:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='city' value={values.city} onChange={handleChange}/>

</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">State:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='state' value={values.state} onChange={handleChange}/>

</div>


</div>



<div class="form-group-row">
<label class="col-sm-4 col-form-label">Zip Code:</label>
<div class="col-sm-8">
  <input type="text" class="form-control" name='zipCode' value={values.zipCode} onChange={handleChange}/>


</div>


</div>

<div class="form-group-row">
<label class="col-sm-4 col-form-label">Order Date:</label>
<div class="col-sm-8">
  <input type="date" class="form-control" name='orderDate' value={values.orderDate} onChange={handleChange} required/>

</div>


</div>

<div class="form-group-row">

<label class="col-sm-4 col-form-label">Physician</label>
<div class="col-sm-8">
  <td>
    <select class="form-control" name='phyId' value={values.phyId} onChange={handleChange}>
        <option key={phyName.phyId} value={phyName.phyId}>{phyName.name}</option>
    {props.physicians.map(phy => (
              <option key={phy.phyId} value={phy.phyId}>{phy.name}</option>
            ))}
      
    </select>
  </td>

</div>
<br></br>


</div>

<div class="text-center">
<button type="button" class="btn btn-primary" onClick={add}>Update</button>
<Link to={"/"}><button type="button" class="btn btn-secondary m-2">Cancel</button></Link>

</div>

</div>
</div>

</div>
</div>
);
}


export default EditPatient;