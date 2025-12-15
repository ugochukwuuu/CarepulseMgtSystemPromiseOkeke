import '../styles/scheduleAppointment.css'
import whiteCancelIcon from '../assets/whiteCancelIcon.png'
import AlexRamirez from "../assets/AlexRamirez.png";
import JasmineLee from "../assets/JasmineLee.png";
import HardikSharma from "../assets/HardikSharma.png";
import AlyanaCruz from "../assets/AlyanaCruz.png";
import DoctorSelect from './doctorsSelect';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const ScheduleAppointmentModal = ()=>{
      const navigate = useNavigate();

    const closeModal =()=>{
        console.log('hola')
    }
    const modalShadowStyle = {
    boxShadow: `
      inset 0px 8px 12px 0px rgba(255, 255, 255, 0.04),
      inset 0px 24px 64px -16px rgba(0, 0, 0, 0.24)
    `,
  };


  const ALL_DOCTORS = [
  { id: 1, name: 'Dr. Alex Ramirez', imgUrl: 'src/assets/AlexRamirez.png' },
  { id: 2, name: 'Dr. Hardik Sharma', imgUrl: 'src/assets/HardikSharma.png' },
  { id: 3, name: 'Dr. Jasmine Lee', imgUrl: 'src/assets/JasmineLee.png' },
  { id: 4, name: 'Dr. Alyana Cruz', imgUrl: 'src/assets/AlyanaCruz.png' }, // The one initially selected
];

const [selectedDoctor, setSelectedDoctor] = useState(ALL_DOCTORS[3]);

const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    // You could also perform other actions here, like fetching their schedule
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Example hardcoded selected doctor object for structure
  const currentSelection = {
    id: 1,
    name: 'Dr. Alex Ramirez',
    imgUrl: AlexRamirez,
  };

  const [formData, setFormData] = useState({
    doctor: "",
    reason: "",
    date: "",
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

    const validateForm = (doctor, reason, date) => {
    if (!doctor || !doctor.trim()) return "Doctor should be chosen";
    if (!reason || !reason.trim()) return "reason is required";

    if (!date || !date.trim()) return "Date of appointment is required";

    return null;
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm(
      formData.doctor,
      formData.reason,
      formData.date,
    );
    setError(validationError || "");
    if (!validationError) {
      console.log("Form submitted:", formData);
      navigate("/dashboard");
    } else {
      console.log("validation erro:", validationError);
    }
  };

    return (
       <div 
    className="fixed inset-0 z-50 flex items-center justify-center 
             glass-morphism-overlay"
    onClick={closeModal} 
  >
    
    <div 
     
     className="main-modal w-full  p-8 rounded-xl shadow-2xl transform transition-all 
                       bg-[#1A1D21]/96 border border-white/8" 
            style={modalShadowStyle}
      onClick={(e) => e.stopPropagation()} 
    >
      
      
      <div className=" modal-header flex justify-between items-center mb-6">
      <div className="texts">

        <h3 className="">
          Schedule Appointment
        </h3>
        <p>Please fill in the following details to schedule</p>
      </div>
        <button onClick={closeModal} className="text-gray-400 hover:text-white">
          <img className='img' src={whiteCancelIcon} alt="" />
        </button>
      </div>

         <form onSubmit={handleSubmit}>

            <DoctorSelect
        doctors={ALL_DOCTORS}
        selectedDoctor={selectedDoctor}
        onSelect={handleDoctorSelect}
      />

            <label className="label " htmlFor="reason">
              Reason for appointment
              <div className="input-container">
                <textarea   value={formData.reason}
                  onChange={handleChange}
                  placeholder='ex: Annual montly check-up'
                  type="text"
                  name="reason"
                  id="reason"
                  required></textarea>
              </div>
            </label>

            <label className="label " htmlFor="date">
              Expected Appointment date
              <div className="input-container">
                <img className='img' src="src/assets/dateIcon.png" alt="date" />
                <input
                  value={formData.date}
                  onChange={handleChange}
                  type='date'
                  name="date"
                  id="date"
                  required
                />
              </div>
            </label>

          


      <button 
        className="w-full submit-btn hover:bg-[#16a085]"
      >
        Schedule appointment
      </button>
   
          </form>

    </div>
  </div>
    )
}

export default ScheduleAppointmentModal