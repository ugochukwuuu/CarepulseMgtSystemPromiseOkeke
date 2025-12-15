import '../styles/scheduleAppointment.css'
import whiteCancelIcon from '../assets/whiteCancelIcon.png'


const CancelAppointmentModal = ({closeModalFunc,selectedAppointment,cancelAppointmentFunc})=>{
const appointment = selectedAppointment || {};
    const closeModal =()=>{
        closeModalFunc()
    }

    const cancelAppointment = async () =>{
      const appointmentId = appointment.id;
      console.log('appointment id', appointmentId)
      await cancelAppointmentFunc(appointmentId)
      closeModal()

    }
    const modalShadowStyle = {
    boxShadow: `
      inset 0px 8px 12px 0px rgba(255, 255, 255, 0.04),
      inset 0px 24px 64px -16px rgba(0, 0, 0, 0.24)
    `,
  };
  

    return (
       <div 
    className="fixed inset-0 z-50 flex items-center justify-center 
             glass-morphism-overlay"
    onClick={closeModal} 
  >
    
    <div 
     
     className="main-modal main-cancel-modal w-full  p-8 rounded-xl shadow-2xl transform transition-all 
                       bg-[#1A1D21]/96 border border-white/8" 
            style={modalShadowStyle}
      onClick={(e) => e.stopPropagation()} 
    >
      
      
      <div className=" modal-header flex justify-between items-center mb-6">
      <div className="texts">

        <h3 className="">
          Cancel Appointment
        </h3>
        <p>Are you sure you want to cancel your appointment</p>
      </div>
        <button onClick={closeModal} className="text-gray-400 hover:text-white">
          <img className='img' src={whiteCancelIcon} alt="" />
        </button>
      </div>

         <form onSubmit={cancelAppointment}>

            <label className="label " htmlFor="reason">
              Reason for cancellation
              <div className="input-container">
                <textarea 
                  placeholder='ex:Urgent meeting came up'
                  type="text"
                  name="reason"
                  id="reason"
                  required></textarea>
              </div>
            </label>

 

          


      <button 
        // onClick={() => cancelAppointment()}
        className="w-full  cancel-btn hover:bg-[#cb1717]"
      >
        Cancel appointment
      </button>
   
          </form>

    </div>
  </div>
    )
}

export default CancelAppointmentModal