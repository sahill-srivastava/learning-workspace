import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      console.log("disconnected");
      setOnlineStatus(false);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
