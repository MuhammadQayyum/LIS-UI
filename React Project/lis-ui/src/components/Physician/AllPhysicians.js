/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import api from "../../api/patients";

const AllPhysicians = (props) => {
  const deletePhysicianHandler = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(
        api
          .delete("/deletePhysician/" + id)
          .then(() => window.location.reload())
          .catch((err) => {
            console.log(err.message);
          })
      );
    }
  };

  const phy = props.physicians.map((physician) => {
    return (
      <tr>
        <td class="r">
          <Link to={"/editPhysician/" + physician.phyId}>
            {physician.phyId}
          </Link>
        </td>
        <td class="r">{physician.name}</td>
        <td class="r">{physician.officeAddress}</td>
        <td class="r">{physician.city}</td>
        <td class="r">{physician.state}</td>
        <td class="r">{physician.zipCode}</td>
        <td>
          <a
            className="fa fa-trash-o"
            style={{ color: "red", marginTop: "7px" }}
            onClick={() => {
              deletePhysicianHandler(physician.phyId);
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
          <Link to="/">
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/addPhysician"}>
            <a className="nav-link">New Physician</a>
          </Link>
        </li>
      </ul>

      <h2 className="head">Physician List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr className="phyTable">
            <th className="r">ID</th>
            <th className="r">Name</th>
            <th className="r">Office Address</th>
            <th className="r">City</th>
            <th className="r">State</th>
            <th className="r">ZipCode</th>
          </tr>
        </thead>
        <tbody>{phy}</tbody>
      </table>
    </div>
  );
};

export default AllPhysicians;
