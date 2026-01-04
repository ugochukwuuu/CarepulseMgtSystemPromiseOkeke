import "../styles/scheduleAppointment.css";
import whiteCancelIcon from "../assets/whiteCancelIcon.png";
import AlexRamirez from "../assets/AlexRamirez.png";
import JasmineLee from "../assets/JasmineLee.png";
import HardikSharma from "../assets/HardikSharma.png";
import AlyanaCruz from "../assets/AlyanaCruz.png";
import DoctorSelect from "./doctorsSelect";
import { useState } from "react";

const TodoModal = ({ closeModalFunc, addItemFunc }) => {
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

  const [selectedDoctor, setSelectedDoctor] = useState(ALL_DOCTORS[0]);

  const handleDoctorSelect = (doctor) => {
    console.log("doctor is", doctor);
    setSelectedDoctor(doctor);
  };

  const [formData, setFormData] = useState({
    id: null,
    patientName: "",
    initials: "",
    date: "",
    status: "",
    doctor: selectedDoctor.name,
    doctorId: selectedDoctor.id,
    doctorImgUrl: selectedDoctor.imgUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  const validateForm = (patientName, status, date) => {
    if (!patientName || !patientName.trim())
      return "Patient Name should be chosen";
    if (!status || !status.trim()) return "Status is required";
    if (!date || !date.trim()) return "Date is required";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm(
      formData.patientName,
      formData.status,
      formData.date,
    );
    setError(validationError || "");
    if (!validationError) {
      console.log("Form submitted:", formData);
      closeModalFunc();
      addItemFunc(formData);
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
            <h3 className="">Add items to the list</h3>
            <p>Please fill in the following details to add</p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white"
          >
            <img className="img" src={whiteCancelIcon} alt="" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="label " htmlFor="patientName">
            Patient's Name
            <div className="input-container">
              <input
                value={formData.patientName}
                onChange={handleChange}
                type="text"
                name="patientName"
                id="patientName"
                required
              />
            </div>
          </label>

          <label className="label " htmlFor="status">
            Status
            <div className="input-container">
              <select
                value={formData.status}
                onChange={handleChange}
                name="status"
                id=""
              >
                <option value="scheduled">Scheduled</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </label>

          <DoctorSelect
            doctors={ALL_DOCTORS}
            selectedDoctor={selectedDoctor}
            onSelect={handleDoctorSelect}
            withImg={false} // i just don't like how all but this input has an icon, call it pedantic but i like uniformity
          />

          <label className="label " htmlFor="date">
            Date
            <div className="input-container">
              <input
                value={formData.date}
                onChange={handleChange}
                type="date"
                name="date"
                id="date"
                required
              />
            </div>
          </label>

          <button className="w-full submit-btn hover:bg-[#16a085]">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
