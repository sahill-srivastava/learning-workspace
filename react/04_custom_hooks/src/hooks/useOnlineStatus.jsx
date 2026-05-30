import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    console.log("useeffect")
    window.addEventListener("offline", () => {
      console.log("disconnected");
      setOnlineStatus(false);
    });

    window.addEventListener("online", () => {
      console.log("connected");
      setOnlineStatus(true);
    });

    
  }, []);

  console.log("onlineStatus", onlineStatus)
  return onlineStatus;
};

export default useOnlineStatus;
