import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollTriggerCompo = () => {

  useGSAP(() => {

    
  })

  return <div className="parent_container">
    <div className="container"></div>
    <div className="container"></div>
    <div className="container"></div>
  </div>;
};

export default ScrollTriggerCompo;
