import logo from "../assets/netflix-logo.png";

const Header = () => {
  return (
    <div className="absolute z-50 px-5 py-2.5 bg-gradient-to-b from-black">
         <img className="w-40" src={logo} alt="logo" />
    </div>
  )
}

export default Header