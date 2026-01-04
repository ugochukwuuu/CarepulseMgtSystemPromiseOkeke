import carePulseLogo from "../assets/CarePlusLogo.png"

const logoText = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={carePulseLogo} alt="careplus" />
      <h1 className="brand-name">CarePulse</h1>
    </div>
  );
};

export default logoText;
