import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { setEmailOtp } from '../../store/authSlice'
import { sendOtpByEmail } from '../../http'

const EmailStep = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  
  const emailSubmit = async() =>{
    if(!email){
      toast.error("Email is required!")
      return;
    };
    const { data } = await sendOtpByEmail({ email });
    console.log(data)
    dispatch(setEmailOtp({ email: data.email, hash: data.hash }))

    onNext();
  }

  return (
    <Card title="Enter your email id" icon="email-emoji">
       <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
       <div className="">
        <div className="mt-[40px]">
        <Button title="Next" icon="arrow-forward" onClick={emailSubmit} />
        </div>
        <p className="text-[#c4c5c5] w-[80%] mx-auto mt-[20px]">
        By entering your number, you’re agreeing to our Terms of Service and Privacy Policy Thanks
        </p>
      </div>
  </Card>
  )
}

export default EmailStep