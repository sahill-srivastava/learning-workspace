import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Timeline() {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from("h1", {
      y: -200,
      duration: 2,
    });

    tl.from(
      ".menu_item",
      {
        y: -60,
        duration: 10,
      },
      "-=0.5",
    );

    console.log(tl.duration())

    tl.from("h2", {
      x: -400,
      opacity: 0,
      duration: 1,
    });

    console.log(tl.duration())
    console.log(tl.duration() * 1000)
    
    setTimeout(() => {
      tl.reverse();
    }, tl.duration() * 1000);
  });

  return (
    <div>
      <nav>
        <h1>Navbar</h1>

        <div className="menu_container">
          <span className="menu_item">Home</span>
          <span className="menu_item">About</span>
          <span className="menu_item">Projects</span>
          <span className="menu_item">Blogs</span>
          <span className="menu_item">Contact Us</span>
        </div>
      </nav>
      <div className="grid">
        <div className="grid_box">
          <h2>Discover the world of Timeline</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
            facere eum quidem cupiditate, nihil, officia fuga magni ipsa labore
            est impedit exercitationem eligendi error nisi doloremque?
          </p>
          <button>Click Me</button>
        </div>
        <div className="grid_box">
          <img
            src="https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
