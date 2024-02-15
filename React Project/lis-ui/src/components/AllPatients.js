/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from "react-router-dom";
import './App.css';
import api from '../api/patients'
// import EditPatient from './EditPatient';

const AllPatients = (props) => {

  const deletePatientHandler = ((id) => {
    if(window.confirm("Do you want to remove?")){
      fetch(api.delete("/deletePatient/"+id)).then(() =>
      window.location.reload()
      ).catch((err) => {
        console.log(err.message);
      })
    }
    })

    const renderAllPatientList = props.patients.map((patient) => {
    
        return(
            <tr>
        <td> <a className = "r" >{patient.patId}</a></td>
        <td className = "r" >{patient.lname}</td>
        <td className = "r" >{patient.fname}</td>
        <td className = "r" >{patient.dob}</td>
        <td className = "r" >{patient.ssn}</td>
        <td className = "r" >{patient.address}</td>
        <td className = "r" >{patient.city}</td>
        <td className = "r" >{patient.state}</td>
        <td className = "r" >{patient.zipCode}</td>
        <td className = "r" >{patient.phyId}</td>
        <td className = "r" >{patient.orderDate}</td>

        <td>
          <a className="e" >Add Order</a>
        </td>
        <td>
        <a className='fa fa-trash-o' style={{color:"red", marginTop: "7px"}} onClick={() => {deletePatientHandler(patient.patId)}}></a>
        </td>

      </tr> 
        );
    });

    return(
        <div>
        <h2 className = "head">Lab Information System</h2>
        <ul className="nav justify-content-end">
        <li className="nav-item">
          <input type='text' className="i" name="keyword" id="keyword" placeholder="Search by Last Name"  required></input>
          <button type='submit' className="i"><i class="fa fa-search"></i></button>
        </li>
        <li className="nav-item">
        <a className="nav-link"><i className="fa fa-refresh fa-spin"></i></a>
        </li>
        <li className="nav-item">
            <Link to="/addPatient"><a className="nav-link" >New Patient</a></Link>
        </li>

        <li className="nav-item">
            <a className="nav-link">Users Info</a>
        </li>
        <li className="nav-item">
            <Link to="/allPhysicians"><a className="nav-link">Physicians Info</a></Link>
        </li>
        <li className="nav-item">
            <a className="nav-link">Order List</a>
        </li>
        <li>
            <a className="nav-link">Log Out</a>
        </li>

      </ul>

    <table className="table table-bordered" >
      <thead className="thead-dark" >
      <tr>
        <th className = "r">Patient Id</th>
        <th className = "r">Last Name</th>
        <th className = "r">First Name</th>
        <th className = "r">DOB</th>
        <th className = "r">SSN</th>
        <th className = "r">Address</th>
        <th className = "r">City</th>
        <th className = "r">State</th>
        <th className = "r">ZipCode</th>
        <th className = "r">Physician Id</th>
        <th className = "r">Order Date</th>
        <th className = "r"></th>
        <th className = "r"></th>

      </tr>
      </thead>
      <tbody>
        {renderAllPatientList}


      </tbody>
    </table>
      </div>
    )
}

export default AllPatients;