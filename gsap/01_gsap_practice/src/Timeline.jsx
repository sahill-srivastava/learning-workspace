import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Timeline() {
  const menuRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        paused: true,
      });

      tl.from(".mobile-menu", {
        height: 0,
        duration: 0.4,
      });

      tl.from(
        ".menu-item",
        {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.3,
        },
        "<",
      );

      timelineRef.current = tl;
    },
    { scope: menuRef },
  );

  return (
    <nav ref={menuRef}>
      <button className="menu-btn">Menu</button>

      <div className="mobile-menu">
        <a className="menu-item">Home</a>
        <a className="menu-item">About</a>
        <a className="menu-item">Projects</a>
        <a className="menu-item">Contact</a>
      </div>
    </nav>
  );
}
