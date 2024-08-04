import { BrowserRouter, Routes, Route } from "react-router-dom";



import HomePage from "./Homepage";
// import Erh from "../app/ehr/page";
import Appointment from "../app/appointments/page";
import Inventory from "../app/inventory/page";
import About from "../app/page";
import Doctor from "../app/doctor-dashboard/page";
import EHR from "../app/ehr/page";
import Patient from "../app/patient/[id]/page";




function App() {
  return <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<HomePage/>} />
      <Route path="/ehr" element={<EHR/>} />
      <Route path="/appointments" element={<Appointment/>} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/doctor" element={<Doctor/>} />
      <Route path="/patient/:id" element={<Patient/>} />
      <Route path="/doctor-dashboard" element={<Doctor/>} />
      <Route path="*" element={<div>404 Not Found</div>} />



    </Routes>




  </BrowserRouter>

}


export default App;
