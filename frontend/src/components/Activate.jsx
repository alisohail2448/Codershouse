import React, { useState } from 'react'
import StepName from '../Pages/Steps/StepName';
import StepAvatar from '../Pages/Steps/StepAvatar';


const steps = {
  1: StepName,
  2: StepAvatar,
}

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onNext = () => {
    setStep(step+1);
  }

  return (
    <div>
      <Step onNext={onNext}></Step>
    </div>
  )
}

export default Activate