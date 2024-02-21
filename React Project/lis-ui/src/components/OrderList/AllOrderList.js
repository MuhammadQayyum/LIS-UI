/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import api from "../../api/patients";

const AllOrderList = (props) => {
  const deleteOrderHandler = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(
        api
          .delete("/deleteOrderList/" + id)
          .then(() => window.location.reload())
          .catch((err) => {
            console.log(err.message);
          })
      );
    }
  };

  const orderList = props.orderList.map((order) => {
    return (
      <tr>
        <td class="r">
          <Link to={"/editOrderList/" + order.orderListId}>
            {order.testCode}
          </Link>
        </td>
        <td class="r">{order.description}</td>
        <td>
          <a
            className="fa fa-trash-o"
            style={{ color: "red", marginTop: "7px" }}
            onClick={() => {
              deleteOrderHandler(order.orderListId);
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
          <Link to={"/addOrderList"}>
            <a className="nav-link">Add New Order</a>
          </Link>
        </li>
      </ul>

      <h2 className="head">Order List</h2>
      <input id="orderId" type="hidden" />

      <table class="table table-bordered" id="myTable">
        <thead class="thead-dark">
          <tr>
            <th>Test Code</th>
            <th>Test Description</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

export default AllOrderList;
