import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import { useDispatch } from 'react-redux';
import { setOtp } from "../../store/authSlice";
import { sendOtp } from "../../http";
import { toast } from "react-hot-toast";



const PhoneStep = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  const phoneSubmit = async() =>{
    if(!phoneNumber){
      toast.error("Phone number is required!")
      return;
    };
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data)
    dispatch(setOtp({ phone: data.phone, hash: data.hash }))

    onNext();
  }

  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <div className="">
        <div className="mt-[40px]">
        <Button title="Next" icon="arrow-forward" onClick={phoneSubmit} />
        </div>
        <p className="text-[#c4c5c5] w-[80%] mx-auto mt-[20px]">
        By entering your number, you’re agreeing to our Terms of Service and Privacy Policy Thanks
        </p>
      </div>
    </Card>
  );
};

export default PhoneStep;
