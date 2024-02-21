/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import api from "../../api/patients";

const AllPatients = (props) => {
  const [search, setSearch] = useState("");

  const deletePatientHandler = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(api.delete("/deletePatient/" + id))
        .then(() => window.location.reload())
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const refresh = () => {
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const renderAllPatientList = props.patients
    .filter((patient) => {
      if (search === "") {
        return true;
      } else {
        const lastName = `${patient.lname}`.toLowerCase();
        return lastName.includes(search.toLowerCase());
      }
    })
    .map((patient) => {
      return (
        <tr key={patient.patId}>
          <td className="r">
            <Link to={"/editPatient/" + patient.patId}> {patient.patId}</Link>
          </td>
          <td className="r">{patient.lname}</td>
          <td className="r">{patient.fname}</td>
          <td className="r">{patient.dob}</td>
          <td className="r">{patient.ssn}</td>
          <td className="r">{patient.address}</td>
          <td className="r">{patient.city}</td>
          <td className="r">{patient.state}</td>
          <td className="r">{patient.zipCode}</td>
          <td className="r">{patient.phyId}</td>
          <td className="r">{patient.orderDate}</td>

          <td>
            <a className="e">Orders</a>
          </td>
          <td>
            <a
              className="fa fa-trash-o"
              style={{ color: "red", marginTop: "7px" }}
              onClick={() => {
                deletePatientHandler(patient.patId);
              }}
            ></a>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <input
            type="text"
            className="i"
            name="search"
            id="search"
            placeholder="Search by Last Name"
            value={search}
            onChange={handleSearchChange}
            required
          ></input>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <i className="fa fa-refresh fa-spin" onClick={refresh}></i>
          </a>
        </li>
        <li className="nav-item">
          <Link to="/addPatient">
            <a className="nav-link">New Patient</a>
          </Link>
        </li>

        <li className="nav-item">
          <a className="nav-link">Users Info</a>
        </li>
        <li className="nav-item">
          <Link to="/allPhysicians">
            <a className="nav-link">Physicians Info</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/getAllOrderList"}>
            <a className="nav-link">Order List</a>
          </Link>
        </li>
        <li>
          <a className="nav-link">Log Out</a>
        </li>
      </ul>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th className="r">Patient Id</th>
            <th className="r">Last Name</th>
            <th className="r">First Name</th>
            <th className="r">DOB</th>
            <th className="r">SSN</th>
            <th className="r">Address</th>
            <th className="r">City</th>
            <th className="r">State</th>
            <th className="r">ZipCode</th>
            <th className="r">Physician Id</th>
            <th className="r">Order Date</th>
            <th className="r"></th>
            <th className="r"></th>
          </tr>
        </thead>
        <tbody>{renderAllPatientList}</tbody>
      </table>
    </div>
  );
};

export default AllPatients;
