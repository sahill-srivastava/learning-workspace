import Header from "./Header"
import heroBanner from "../assets/netflix-hero-banner.jpg"

const UserLogin = () => {
  return (
    <div>
        <Header />
       <main>
         <img src={heroBanner} alt="banner" />
       </main>
    </div> 
  )
}

export default UserLogin