import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);

const Box = () => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.from(".card", {
      x: 40,
      opacity: 0,
      stagger: 0.5,
    });
  });

  return (
    <div ref={cardRef}>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
    </div>
  );
};

export default Box;
