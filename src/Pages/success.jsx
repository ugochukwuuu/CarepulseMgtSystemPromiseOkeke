import LogoText from "../components/logo";
import '../styles/Success.css'
import successCheckmarkIcon from '../assets/successCheckmarkIcon.png'
import AlexRamirez from "../assets/AlexRamirez.png";
import { useLocation } from "react-router-dom";


const Success = ()=>{
    const location = useLocation()

    const passedData = location.state
    const {appointment} = passedData
    console.log('passedData',passedData)


    const selectedDoctor = {
        imgUrl: AlexRamirez,
        name: 'random'
    }
    return(
        <main className="main flex flex-wrap  flex-col items-center">
            <LogoText className='logo-text'/>

            <div className="message flex  flex-wrap flex-col items-center justify-center gap-6">
            <img src={successCheckmarkIcon} alt="success" className="block" />
            <h1 className="text-center">Your <span className="highlighted">appointment request</span> has been successfully submitted!</h1>
             <p>We'll be in touch shortly to confirm.</p>
                
            </div>

            <div className="appointment-details-container flex flex-wrap items-center flex-row gap-6">
                <h2>Requested appointment details:</h2>
                  <div className="flex items-center gap-2 selected-doctor-container">

                       <img 
              src={appointment.img} 
              alt={appointment.doctor} 
              className="w-7 h-7 rounded-full object-cover"
            />
              {appointment.doctor}
          </div>
                <h2 className="flex flex-row items-center gap-3">
                 <img className='img' src="src/assets/dateIcon.png" alt="date" />
             {appointment.date}</h2>
            </div>
        </main>
    )
}

export default Success