import React, {useState, useEffect} from 'react';
import api from '../api/patients'
import Header from './Header';
import AllPatients from './Patient/AllPatients';
import AddPatient from './Patient/AddPatient';
import AllPhysicians from './Physician/AllPhysicians';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditPatient from './Patient/EditPatient';
import AddPhysician from './Physician/AddPhysician';
import EditPhysician from './Physician/EditPhysician';
import AllOrderList from './OrderList/AllOrderList';
import './App.css';

function App() {

  const [patients, setPatients] = useState([]);
  const [physicians, setPhysicians] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const retrievePatients = async () => {
    const response = await api.get("/allPatients");
    return response.data;
  }

  const retrievePhysicians = async () => {
    const response = await api.get("/allPhysicians");
    return response.data;
  }

  const retrieveOrderList = async () => {
    const response = await api.get("/getOrderList");
    return response.data;
  }

  const addPatientHandler = async (patient) => {
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

  useEffect(() => {
    const getAllOrderList = async () => {
      const allOrderList = await retrieveOrderList();

      if(allOrderList) setOrderList(allOrderList);
    };

    getAllOrderList();
  }, []);


  return (
    <div>
      <Router>
        <Header />
        <Routes>
        <Route path="/" exact Component={() => (<AllPatients patients={patients}/>)} />
        <Route path='/addPatient' Component={() => (<AddPatient addPatientHandler={addPatientHandler} />)} />
        <Route path='/editPatient/:id' element = {<EditPatient physicians={physicians}/>} />
        <Route path='/allPhysicians' Component={() => (<AllPhysicians physicians={physicians}/>)} />
        <Route path='/addPhysician' element={<AddPhysician/>}></Route>
        <Route path='/editPhysician/:id' element={<EditPhysician />}></Route>
        <Route path='/getAllOrderList' element={<AllOrderList  orderList={orderList}/>}></Route>
      </Routes>
      </Router>
      </div>
    
  );
}

export default App;
