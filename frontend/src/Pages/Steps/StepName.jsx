import React, { useState } from "react";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../store/activateSlice";

const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state?.activate);
  const [fullName, setFullName] = useState(name);

  const nextStep = () => {
    if (!fullName) return;

    dispatch(setName(fullName));
    onNext();
  };
  return (
    <>
      <div className="flex items-center  justify-center mt-[6rem]">
        <Card title="What's your full name?" icon="goggle-emoji">
          <TextInput
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <div className="">
            <p className="text-[#c4c5c5] w-[80%] mx-auto mt-[20px]">
              People use real name at codershouse {":)"} !
            </p>
            <div className="mt-[40px]">
              <Button title="Next" icon="arrow-forward" onClick={nextStep} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepName;
