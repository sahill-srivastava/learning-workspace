import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsPremium(true);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleSubscribeClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true },
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    //it should open razorpay dialog box
    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to other developers",
      order_id: orderId,

      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isPremium ? (
    "You're already a Premium User."
  ) : (
    <div className="mx-auto w-fit h-fit gap-5 mt-20 grid grid-cols-1 md:grid-cols-2">
      {/* card1 */}
      <div className="card w-96 h-full bg-base-300 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">Most Popular</span>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Silver Membership</h2>
            <span className="text-xl">$29/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Chat with other people</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>100 connection Requests per day</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Blue Tick</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>3 months</span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleSubscribeClick("gold")}
              className="btn btn-primary btn-block"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="card w-96 h-full bg-base-300 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Gold Membership</h2>
            <span className="text-xl">$49/mo</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Chat with other people</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Infinite connection Requests per day</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Blue Tick</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>12 months</span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              onClick={() => handleSubscribeClick("silver")}
              className="btn btn-primary btn-block"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
