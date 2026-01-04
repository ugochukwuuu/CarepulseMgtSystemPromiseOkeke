import "../styles/scheduleAppointment.css";
import whiteCancelIcon from "../assets/whiteCancelIcon.png";
import dateIcon from "../assets/dateIcon.png";
import AlexRamirez from "../assets/AlexRamirez.png";
import JasmineLee from "../assets/JasmineLee.png";
import HardikSharma from "../assets/HardikSharma.png";
import AlyanaCruz from "../assets/AlyanaCruz.png";
import DoctorSelect from "./doctorsSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleAppointmentModal = ({
  isOpen,
  passedDownSelection,
  closeModalFunc,
}) => {
  const navigate = useNavigate();

  const closeModal = () => {
    console.log("hola");
    closeModalFunc();
  };
  const modalShadowStyle = {
    boxShadow: `
      inset 0px 8px 12px 0px rgba(255, 255, 255, 0.04),
      inset 0px 24px 64px -16px rgba(0, 0, 0, 0.24)
    `,
  };

  const ALL_DOCTORS = [
    { id: 1, name: "Dr. Alex Ramirez", imgUrl: AlexRamirez },
    { id: 2, name: "Dr. Hardik Sharma", imgUrl: HardikSharma },
    { id: 3, name: "Dr. Jasmine Lee", imgUrl: JasmineLee },
    { id: 4, name: "Dr. Alyana Cruz", imgUrl: AlyanaCruz },
    { id: 5, name: "Dr. Michael May", imgUrl: null },
  ];

  const { doctor, doctorId, doctorImgUrl } = passedDownSelection;
  const [selectedDoctor, setSelectedDoctor] = useState(
    ALL_DOCTORS.filter((doc) => doc.id === doctorId)[0] || ALL_DOCTORS[0],
  );

  const handleDoctorSelect = (doctor) => {
    console.log("doctor is", doctor);
    setSelectedDoctor(doctor);
  };

  const [formData, setFormData] = useState({
    doctor: selectedDoctor.name,
    reason: "",
    date: "",
    img: selectedDoctor.imgUrl,
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
      navigate("/success", {
        state: {
          appointment: formData,
        },
      });
    } else {
      console.log("Form submitted:", formData);
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
            <h3 className="">Schedule Appointment</h3>
            <p>Please fill in the following details to schedule</p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white"
          >
            <img className="img" src={whiteCancelIcon} alt="" />
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
              <textarea
                value={formData.reason}
                onChange={handleChange}
                placeholder="ex: Annual montly check-up"
                type="text"
                name="reason"
                id="reason"
                required
              ></textarea>
            </div>
          </label>

          <label className="label " htmlFor="date">
            Expected Appointment date
            <div className="input-container">
              <img className="img" src={dateIcon} alt="date" />
              <input
                value={formData.date}
                onChange={handleChange}
                type="datetime-local"
                name="date"
                id="date"
                required
              />
            </div>
          </label>

          <button className="w-full submit-btn hover:bg-[#16a085]">
            Schedule appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;
