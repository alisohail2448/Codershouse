import React, { useState } from "react";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { verifyOtp, verifyOtpOfEmail } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { toast } from "react-hot-toast";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash, email } = useSelector((state) => state?.auth?.otp);

  const submitOtp = async () => {
    if(!otp) {
      toast.error("Otp is required!")
      return;
    }
    try {
      if(phone){
        const { data } = await verifyOtp({ otp, phone, hash });
        dispatch(setAuth(data));
      }
      if(email){
        const { data } = await verifyOtpOfEmail({ otp, email, hash });
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center  justify-center mt-[6rem]">
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />

          <div className="">
            <div className="mt-[40px]">
              <Button title="Next" onClick={submitOtp} icon="arrow-forward" />
            </div>
            <p className="text-[#c4c5c5] w-[80%] mx-auto mt-[20px]">
              By entering your number, you’re agreeing to our Terms of Service
              and Privacy Policy Thanks
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
