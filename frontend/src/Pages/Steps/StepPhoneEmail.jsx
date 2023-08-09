import React, { useState } from "react";
import PhoneStep from "./PhoneStep";
import EmailStep from "./EmailStep";

const phoneEmailMap = {
  phone: PhoneStep,
  email: EmailStep,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className="flex items-center justify-center mt-[6rem] ">
        <div>
          <div className="stepButton">
            <button className={`tabBtn ${type === 'phone' ? 'activeTab' : ''}`} onClick={() => setType("phone")}>
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button
              className={`tabBtn ml-[20px] ${type === 'email' ? 'activeTab' : ''}`}
              onClick={() => setType("email")}
            >
              <img src="/images/mail-white.png" alt="email" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
