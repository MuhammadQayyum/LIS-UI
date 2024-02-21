/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/patients";
import "../App.css";

function UpdateOrderList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState({
    testCode: "",
    description: "",
  });

  useEffect(() => {
    const getOderListData = async () => {
      const OrderList = await api.get("/getOrderList/" + id);
      if (OrderList) setOrderList(OrderList.data);
    };

    getOderListData();
  }, [id]);

  const handleChange = (e) => {
    setOrderList({
      ...orderList, // Spread the unchanged values
      [e.target.name]: e.target.value, // Update the state of the changed value
    });
  };

  const navigateAllOrderList = () => {
    navigate("/getAllOrderList");
    window.location.reload();
  };

  const add = (e) => {
    e.preventDefault();
    try {
      api.post("/editOrderList/" + id, orderList);
      navigateAllOrderList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link to={"/"}>
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/getAllOrderList"}>
            <a className="nav-link">Order List</a>
          </Link>
        </li>
      </ul>

      <div>
        <h2 className="head">Edit Order List</h2>
      </div>

      <form className="editOrderList" onSubmit={add}>
        <input type="hidden" />
        <div className="border border-secondary rounded p-3">
          <div className="form-group-row">
            <label className=" col-form-label">Test Code:</label>
            <div className="">
              <input
                type="text"
                className=""
                name="testCode"
                value={orderList.testCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-row">
            <label className="col-form-label">Test Description:</label>
            <div className="">
              <textarea
                type="description"
                className="form-control"
                name="description"
                value={orderList.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary m-2">
              Save
            </button>
            <Link to={"/getAllOrderList"}>
              <button type="button" className="btn btn-secondary m-2">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateOrderList;
