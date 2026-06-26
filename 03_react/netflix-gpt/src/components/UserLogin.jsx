import Header from "./Header"
import heroBanner from "../assets/netflix-hero-banner.jpg"

const UserLogin = () => {
  return (
    <div>
        <Header />
       <main className="relative">
        <div>
           <img className="w-screen  object-cover" src={heroBanner} alt="banner" />
        </div>
        <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 w-3/12 bg-black flex flex-col items-center justify-center">
          <input type="text" placeholder="Email Address" className="p-2  m-2"/>
          <input type="password" placeholder="Email Password" className="p-2  m-2"/>
          <button className="p-4 m-4 ">Sign In</button>
        </form>
       </main>
    </div> 
  )
}

export default UserLogin