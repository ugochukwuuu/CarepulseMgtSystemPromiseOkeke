import Header from "../components/header";
import ScheduleAppointmentModal from "../components/scheduleAppointmentModal";
import CancelAppointmentModal from "../components/cancelAppointmentModal";
import TodoModal from "../components/TodoModal";
import "../styles/Dashboard.css";
import toast from 'react-hot-toast';
import AlexRamirez from "../assets/AlexRamirez.png";
import JasmineLee from "../assets/JasmineLee.png";
import HardikSharma from "../assets/HardikSharma.png";
import AlyanaCruz from "../assets/AlyanaCruz.png";
import { useState } from "react";
const Dashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      initials: "PB",
      patientName: "Phoenix Baker",
      date: "Jan 4, 2022",
      status: "Scheduled",
      doctor: "Dr. Alex Ramirez",
      doctorId: 1,
      doctorImgUrl: AlexRamirez,
      actions: ["Schedule", "Cancel"],
    },
    {
      id: 2,
      initials: "LS",
      patientName: "Candice Wu",
      date: "Jan 2, 2022",
      status: "Pending",
      doctor: "Dr. Michael May",
      doctorId: 5,
      doctorImgUrl: null,
      actions: ["Schedule", "Cancel"],
    },
    {
      id: 3,
      initials: "LS",
      patientName: "Lana Steiner",
      date: "Jan 4, 2022",
      status: "Cancelled",
      doctor: "Dr. Jasmine Lee",
      doctorId: 3,
      doctorImgUrl: JasmineLee,
      actions: ["Schedule", "Cancel"],
    },
    {
      id: 4,
      initials: "DC",
      patientName: "Drew Cano",
      date: "Jan 8, 2022",
      status: "Scheduled",
      doctor: "Dr. Hardik Sharma",
      doctorId: 2,
      doctorImgUrl: HardikSharma,
      actions: ["Schedule", "Cancel"],
    },
    {
      id: 5,
      initials: "NC",
      patientName: "Natali Craig",
      date: "Jan 6, 2022",
      status: "Pending",
      doctor: "Dr. Alyana Cruz",
      doctorId: 4,
      doctorImgUrl: AlyanaCruz,
      actions: ["Schedule", "Cancel"],
    },
  ]);

  const [scheduleIsOpen, setScheduleIsOpen] = useState(false)
  const [cancelIsOpen, setCancelIsOpen] = useState(false)
  const [todoIsOpen, setTodoIsOpen] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState(null)
  const closeScheduleModal = () =>{
    setScheduleIsOpen(false)
    setAppointmentDetails(null)
  }
  const closeCancelModal = () =>{
    setCancelIsOpen(false) 
  }
  const closeTodoModal = () =>{
    setTodoIsOpen(false) 
  }
  const getQuantity = (category) => {
    return appointments.filter(
      (item) => item.status.toLowerCase() === category.toLowerCase(),
    ).length;
  };


  const statistics = [
    {
      category: "scheduled",
      quantity: getQuantity("scheduled"),
    //   quantity: 94,
      text: "Total number of scheduled appointments",
      imgSrc: "src/assets/calendarIcon.png",
    },
    {
      category: "pending",
      quantity: getQuantity("pending"),
    //   quantity: 32,
      text: "Total number of pending appointments",
      imgSrc: "src/assets/hourGlassIcon.png",
    },
    {
      category: "cancelled",
    //   quantity: 56,
      quantity: getQuantity("cancelled"),
      text: "Total number of cancelled appointments",
      imgSrc: "src/assets/cancellIcon.png",
    },
  ];

  const statusMap = {
    scheduled: "scheduled",
    pending: "pending",
    cancelled: "cancelled",
  };
  const getInitials = (name) => {
    const initials = name
      .split(" ")
      .filter((word) => word !== "Dr." && word !== "Dr")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return initials;
  };

  const randomizeBackgroundColor = () => {
    const randomColors = ["#B6F09C", "#B6F09C", "#D59CF0"];
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  const commitAction = (action,id)=>{
    if(action.toLowerCase() === 'schedule'){
        console.log('appointment is', appointments[id])
        if(appointments[id].status.toLowerCase() === 'scheduled'){
            toast.error('Apppointment is already scheduled')
            return
        }
        if(appointments[id].status.toLowerCase() === 'cancelled'){
            toast.error('Apppointment is cancelled')
            return
        }
        else{
            setScheduleIsOpen(true)
            setAppointmentDetails(appointments[id])
        }
    }
    if(action.toLowerCase() === 'cancel'){
        console.log('appointment is', appointments[id])
        if(appointments[id].status.toLowerCase() === 'scheduled'){
            toast.error('Apppointment is already scheduled')
            return
        }
        if(appointments[id].status.toLowerCase() === 'cancelled'){
            toast.error('Apppointment is cancelled')
            return
        }
        else{
            setAppointmentDetails(appointments[id])
            setCancelIsOpen(true)
        }
    }
    if(action.toLowerCase() === 'remove'){
        const removedAppointment = appointments.filter(app => app.id !== id + 1)
        setAppointments(removedAppointment)
        toast.success('Dynamically added appointment has been removed')
    }
  }

  const cancelAppointment = (id) =>{
    const appointment = appointments.find(app => app.id === id)
    appointment.status = 'cancelled'
    
  }


  //todo list functionality

  const addItem = (form)=>{
    console.log(form)
    setAppointments((prevData) => {
        const newId = prevData.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    const newAppointment  =  {
      id: newId,
      initials: getInitials(form.patientName),
      patientName: form.patientName,
      date: form.date,
      status: form.status,
      doctor: form.doctor   ,
      doctorId: form.doctorId,
      doctorImgUrl: form.doctorImgUrl,
      actions: ["Schedule", "Cancel", "Remove"],

    };
    return[
        ...prevData,
        newAppointment
    ]
    })

    toast.success('Dynamically added appointment has been added')
  }
  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-container">
        <div className="greetings">
          <h1>Welcome Admin</h1>
          <p>Start day with managing new appointments</p>
        </div>
        <div className="stats-cards-container grid grid-cols-1 md:grid-cols-3 gap-3">
          {statistics.map((item, index) => (
            <div key={index} className="stats-card">
              <div className="stat-quantity flex items-center flex-row gap-3">
                <img src={item.imgSrc} alt="" />
                <p>{item.quantity}</p>
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
<div className="appointments-table-wrapper">
        <div className="appointments-table">
          <table className="table-overflow">
            <thead>
              <tr className="grid-columns-5">
                <th className="rounded-tl-[25px]">Patient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment,index) => (
                <tr className="grid-columns-5" key={appointment.id}>
                  <td className="patient">
                    <div className="flex flex-row gap-2 items-center patient-wrapper">
                      <div
                        className="flex items-center justify-center avatar-wrapper initials-wrapper"
                        style={{ backgroundColor: randomizeBackgroundColor() }}
                      >
                        {getInitials(appointment.patientName)}
                      </div>
                      <p>{appointment.patientName}</p>
                    </div>
                  </td>
                  <td className="name"> {appointment.date}</td>
                  <td className="status">
                    <div
                      className={`${statusMap[appointment.status.toLowerCase()]} status-pill`}
                    >
                    <div className="flex-container flex flex-row items-center gap-2">
                      <img
                        src={`src/assets/${appointment.status.toLowerCase()}Icon.png`}
                        alt="icon"
                      />
                      <p>{appointment.status}</p>
                    </div>
                    </div>
                  </td>
                  <td className="doctor">
                    <div className="flex flex-row items-center gap-2 doctor-name-wrapper">
                      {appointment.doctorImgUrl ? (
                        <div className="avatar-wrapper doctor-image-container">
                          <img src={appointment.doctorImgUrl} alt="img" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center avatar-wrapper initials-wrapper">
                          {getInitials(appointment.doctor)[0]}
                        </div>
                      )}

                      {appointment.doctor}
                    </div>
                  </td>
                  <td className="flex gap-4 flex-row">
                    {" "}
                    {appointment.actions.map((action) => (
                      <div
                      onClick={() => commitAction(action, index)} 
                      className={`${action}-btn action-btn`} key={action}>
                        {action}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
     

        {
            scheduleIsOpen && (
        <ScheduleAppointmentModal
        closeModalFunc={closeScheduleModal}
        passedDownSelection={appointmentDetails}
        />
            )}
        {
            cancelIsOpen && (
        <CancelAppointmentModal
        closeModalFunc={closeCancelModal}
        selectedAppointment={appointmentDetails}
        cancelAppointmentFunc={cancelAppointment}
        />
            )}
        {
            todoIsOpen && (
        <TodoModal
        closeModalFunc={closeTodoModal}
        addItemFunc={addItem}
        />
            )}
        
        </div>
      </div>
         <div className="pagination flex items-center justify-between">
            <button>
                {/* <img src="src/assets/leftIcon.png" alt="<=" /> */}
<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.750163 4.08333L3.52794 0.75M0.750163 4.08333L3.52794 7.41667M0.750163 4.08333L9.0835 4.08333" stroke="#24AE7C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </button>
    <button onClick={() => setTodoIsOpen(true)}>Add to List</button>
            <button>
                {/* <img src="src/assets/rightIcon.png" alt="=>" /> */}
                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.08333 4.08333L6.30556 0.75M9.08333 4.08333L6.30556 7.41667M9.08333 4.08333L0.75 4.08333" stroke="#24AE7C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
