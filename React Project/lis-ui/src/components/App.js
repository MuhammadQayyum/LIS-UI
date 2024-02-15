import React, {useState, useEffect} from 'react';
import api from '../api/patients'
import AllPatients from './AllPatients';
import AddPatient from './AddPatient';
import AllPhysicians from './AllPhysicians';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  const [patients, setPatients] = useState([]);
  const [physicians, setPhysicians] = useState([]);

  const retrievePatients = async () => {
    const response = await api.get("/allPatients");
    return response.data;
  }

  const retrievePhysicians = async () => {
    const response = await api.get("/allPhysicians");
    return response.data;
  }

  const addPatientHandler = async (patient) => {
    console.log(patient)
    const request = {
        ...patient
    }

    const response = await api.post("/addPatient", request);
    setPatients([...patients, response.data]);
  };

  useEffect(() => {
    const getAllPatients = async () => {
      const allPatients = await retrievePatients();

      if(allPatients) setPatients(allPatients);
    };

    getAllPatients();
  }, []);

  useEffect(() => {
  }, [patients]);

  useEffect(() => {
    const getAllPhysicians = async () => {
      const allPhysicians = await retrievePhysicians();

      if(allPhysicians) setPhysicians(allPhysicians);
    };

    getAllPhysicians();
  }, []);

  useEffect(() => {
  }, [physicians]);


  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" exact Component={() => (<AllPatients patients={patients}/>)} />
        <Route path='/addPatient' Component={() => (<AddPatient addPatientHandler={addPatientHandler}/>)} />
        <Route path='/allPhysicians' Component={() => (<AllPhysicians physicians={physicians}/>)} />
      </Routes>
      </Router>
      </div>
    
  );
}

export default App;
