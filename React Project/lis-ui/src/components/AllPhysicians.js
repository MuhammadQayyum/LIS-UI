/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import AddPatient from "./AddPatient";
import { Link } from "react-router-dom";
import "./App.css"

const AllPhysicians = (props) => {
    const phy = props.physicians.map((physician) => {
        return(

            <tr>
            <td class = "r" >{physician.phyId}</td>
            <td class = "r" >{physician.name}</td>
            <td class = "r" >{physician.officeAddress}</td>
            <td class = "r" >{physician.city}</td>
            <td class = "r" >{physician.state}</td>
            <td class = "r" >{physician.zipCode}</td>
            <td>
              <a class="e">Edit</a>
            </td>
            <td>
              <a class="e1">Delete</a>
            </td>
    
    
          </tr>
          
        )
    });

    <AddPatient physicians={props.physicians}></AddPatient>

    return(
        <div>
    <h2 class="head" align="center">Lab Information System</h2>
  <ul class="nav justify-content-end">
    <li class="nav-item">
    <Link to="/"><a class="nav-link" >Home</a></Link>
    </li>
    <li class="nav-item">
    <a class="nav-link">New Physician</a>
    </li>
    </ul>

  <h2 class="head" align="center">Physician List</h2>
  <tr>
    <table class="table table-bordered" >
      <thead class="thead-dark" >
      <tr>
        <th class = "r">ID</th>
        <th class = "r">Name</th>
        <th class = "r">Office Address</th>
        <th class = "r">City</th>
        <th class = "r">State</th>
        <th class = "r">ZipCode</th>
      </tr>
      </thead>
      <tbody>
        {phy}

      </tbody>
    </table>


  </tr>
        </div>
        
    )

}

export default AllPhysicians;