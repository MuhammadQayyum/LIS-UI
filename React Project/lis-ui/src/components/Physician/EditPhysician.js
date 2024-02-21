/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/patients";
import states from "../States.json";

function EditPhysician() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [phyData, setPhyData] = useState({
    name: "",
    officeAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    const getPatData = async () => {
      const phy = await api.get("/physician/" + id);
      if (phy) setPhyData(phy.data);
    };

    getPatData();
  }, [id]);

  const navigateAllPhy = () => {
    navigate("/allPhysicians");
    window.location.reload();
  };

  const handleChange = (e) => {
    setPhyData({
      ...phyData, // Spread the unchanged values
      [e.target.name]: e.target.value, // Update the state of the changed value
    });
  };

  const add = (e) => {
    e.preventDefault();
    api.post("/editPhysician/" + id, phyData);
    navigateAllPhy();
  };

  return (
    <div>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <Link to={"/"}>
            <a class="nav-link">Home</a>
          </Link>
        </li>
        <li class="nav-item">
          <Link to={"/allPhysicians"}>
            <a class="nav-link">All Physicians</a>
          </Link>
        </li>
      </ul>
      <h2 className="head">Edit Physician</h2>
      <form className="editPhy" onSubmit={add}>
        <input type="hidden" />
        <div class="border border-secondary rounded p-3">
          <div className="form-group-row">
            <label class="col-sm-4 col-form-label">Name:</label>
            <div class="col-sm-8">
              <input
                type="text"
                name="name"
                class="form-control"
                value={phyData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-row">
            <label class="col-sm-4 col-form-label">Address:</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                name="officeAddress"
                value={phyData.officeAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-row">
            <label class="col-sm-4 col-form-label">City:</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                name="city"
                value={phyData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="form-group-row">
            <label class="col-sm-4 col-form-label">State:</label>
            <div class="col-sm-8">
              <select
                class="form-control"
                name="state"
                value={phyData.state}
                onChange={handleChange}
              >
                {states.map((item) => (
                  <option key={item.abbreviation} value={item.abbreviation}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group-row">
            <label class="col-sm-4 col-form-label">Zip Code:</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                name="zipCode"
                value={phyData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <br />

          <div className="text-center">
            <button type="submit" class="btn btn-primary m-2">
              Save
            </button>
            <Link to={"/allPhysicians"}>
              <button type="button" class="btn btn-secondary m-2">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPhysician;
