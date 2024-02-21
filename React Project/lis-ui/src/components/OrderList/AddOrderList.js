/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/patients";
import "../App.css";

const AddOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState({
    testCode: "",
    description: "",
  });

  const handleChange = (e) => {
    setOrderList({
      ...orderList, // Spread the unchanged values
      [e.target.name]: e.target.value, // Update the state of the changed value
    });
  };

  const navigateAllOrders = () => {
    navigate("/getAllOrderList");
    window.location.reload();
  };

  const add = (e) => {
    e.preventDefault();
    try {
      api.post("addOrderList", orderList);
      navigateAllOrders();
    } catch (error) {
      console.error(error);
    }
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
          <Link to={"/getAllOrderList"}>
            <a class="nav-link">Order List</a>
          </Link>
        </li>
      </ul>

      <div>
        <h2 class="head">Add Order List</h2>
      </div>

      <form className="addOrderList" onSubmit={add}>
        <input type="hidden" />
        <div class="border border-secondary rounded p-3">
          <div class="form-group-row">
            <label class=" col-form-label">Test Code:</label>
            <div class="">
              <input
                type="text"
                class=""
                name="testCode"
                value={orderList.testCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="form-group-row">
            <label class="col-form-label">Test Description:</label>
            <div class="">
              <textarea
                type="description"
                class="form-control"
                name="description"
                value={orderList.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary m-2">
              Save
            </button>
            <Link to={"/getAllOrderList"}>
              <button type="button" class="btn btn-secondary m-2">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOrderList;
