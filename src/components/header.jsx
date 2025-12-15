import LogoText from "./logo";
import doctorProfile from "../assets/doctorProfile.png";
import "../styles/header.css";

const Header = () => {
  return (
    <nav className="flex flex-row items-center justify-between px-8">
      <LogoText />

      <div className="profile-container flex items-center justify-center gap-2">
        <img src={doctorProfile} alt="profile" />
        <p>Admin</p>
      </div>
    </nav>
  );
};

export default Header;
