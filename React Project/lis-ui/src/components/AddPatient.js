import React from "react";
import { Link } from "react-router-dom";
import './App.css';
import api from '../api/patients'

class AddPatient extends React.Component {
  state = { 
    state1: { patient: {
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
  }},
    state2: {
      options: []
    }
};

componentDidMount(){
api.get("/allPhysicians")
.then(response => {
  this.setState({state2: {options: response.data}});
}).catch(err => {
  console.error('Error fetching data:', err);
})
}

add = (e) => {
  e.preventDefault();
  if (this.state.state1.patient.lname === "" || this.state.state1.patient.fname === "" || this.state.state1.patient.dob === "" || this.state.state1.patient.orderDate === "" || this.state.state1.patient.phy === ""){
    alert("Please fill out all the required fields");
    return
  }
  console.log(this.state.state1.patient);
  this.props.addPatientHandler(this.state.state1.patient);
  this.setState({state1: {patient : { address: "", zipCode: "", orderDate: "", phyId: "", state: "", fname: "", city: "", ssn: "", lname: "", dob: ""}}})
}

handleInputChange = (event) => {
  const { name, value } = event.target;
  this.setState((prevState) => ({
    state1: {
      ...prevState.state1,
      patient: {
        ...prevState.state1.patient,
        [name]: value
      }
    }
  }));
};


  render() {
  return(
      <div>
          <h2 className="head">Add new Patient</h2>
          <form className="addForm" onSubmit={this.add}>
          <input type="hidden"></input>
          <div class="border border-secondary rounded p-3">
      <div class="addPatient form-group-row">
      
      <div><label class="col-sm-4 col-form-label">Last Name:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" name="lname" value={this.state.state1.patient.lname} onChange={this.handleInputChange}/>
      </div></div>
      

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">First Name:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" name="fname" value={this.state.state1.patient.fname} onChange={this.handleInputChange}/>

      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">DOB:</label>
      <div class="col-sm-8">
        <input type="date" class="form-control" name="dob" value={this.state.state1.patient.dob} onChange={this.handleInputChange}/>

      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">SSN:</label>
      <div class="col-sm-8">
        <input id="ssn" name="ssn" class="form-control" value={this.state.state1.patient.ssn} onChange={(e) => this.setState({state1: {ssn: e.target.value}})}/>

      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">Address:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" value={this.state.state1.patient.address} onChange={(e) => this.setState({state1: {address: e.target.value}})}/>

      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">City:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" value={this.state.state1.city} onChange={(e) => this.setState({state1: {city: e.target.value}})}/>

      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">State:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" value={this.state.state1.state} onChange={(e) => this.setState({state1: {state: e.target.value}})}/>

      </div>


    </div>



    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">Zip Code:</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" value={this.state.state1.zipCode} onChange={(e) => this.setState({state1: {zipCode: e.target.value}})}/>


      </div>


    </div>

    <div class="form-group-row">
      <label class="col-sm-4 col-form-label">Order Date:</label>
      <div class="col-sm-8">
        <input type="date" class="form-control" name="orderDate" value={this.state.state1.orderDate} onChange={this.handleInputChange}/>

      </div>


    </div>

    <div class="form-group-row">

      <label class="col-sm-4 col-form-label">Physician</label>
      <div class="col-sm-8">
        <td>
          <select class="form-control" name="phyId" value={this.state.state1.phyId} onChange={this.handleInputChange}>
          <option key="" value="">Please select a Physician</option>
            {this.state.state2.options.map(phy => (
              <option key={phy.phyId} value={phy.phyId}>{phy.name}</option>
            ))}
          </select>
        </td>

      </div>


    </div>

    <div class="text-center">
      <button type="submit" class="btn btn-primary m-2">Save</button>
      <Link to="/"><button type="button" class="btn btn-secondary m-2">Cancel</button></Link>

    </div>

  </div>
  </div>

</form>
      </div>
  )

}
}

export default AddPatient;