import LogoText from "../components/logo";
import getInitials from "../composables/getInitials";
import "../styles/Success.css";
import successCheckmarkIcon from "../assets/successCheckmarkIcon.png";
import AlexRamirez from "../assets/AlexRamirez.png";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  const passedData = location.state;
  const { appointment } = passedData;
  console.log("passedData", passedData);

  const selectedDoctor = {
    imgUrl: AlexRamirez,
    name: "random",
  };

  function formatDateTime(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} ${month} ${year} · ${hours}:${minutes}${ampm}`;
  }
  return (
    <main className="main flex flex-wrap  flex-col items-center">
      <LogoText className="logo-text" />

      <div className="message flex  flex-wrap flex-col items-center justify-center gap-6">
        <img src={successCheckmarkIcon} alt="success" className="block" />
        <h1 className="text-center">
          Your <span className="highlighted">appointment request</span> has been
          successfully submitted!
        </h1>
        <p>We'll be in touch shortly to confirm.</p>
      </div>

      <div className="appointment-details-container flex flex-wrap items-center flex-row gap-6">
        <h2>Requested appointment details:</h2>
        <div className="flex items-center gap-2 selected-doctor-container">
          {appointment.img ? (
            <div className="avatar-wrapper doctor-image-container">
              <img src={appointment.img} alt="img" />
            </div>
          ) : (
            <div className="flex items-center justify-center avatar-wrapper initials-wrapper">
              {getInitials(appointment.doctor)[0]}
            </div>
          )}

          {appointment.doctor}
        </div>

        <h2 className="flex flex-row items-center gap-3">
          <img className="img" src="src/assets/dateIcon.png" alt="date" />
          {formatDateTime(appointment.date)}
        </h2>
      </div>
    </main>
  );
};

export default Success;
