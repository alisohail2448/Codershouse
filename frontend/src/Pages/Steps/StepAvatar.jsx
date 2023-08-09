import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../store/activateSlice";
import { activateAccount } from "../../http";
import { setAuth } from "../../store/authSlice";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";

const StepAvatar = ({ onNext }) => {
  const { name, avatar } = useSelector((state) => state?.activate);
  const dispatch = useDispatch();
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const handleSubmit = async () => {
    if(!name || !avatar) {
      toast.error("Avatar is Required!")
    }
    setLoading(true);
    try {
      const { data } = await activateAccount({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) return <Loader message="Activation in Progress.." />

  return (
    <>
      <div className="flex items-center  justify-center mt-[6rem]">
        <Card title={`Okay, ${name}`} icon="monkey-emoji">
          <p className="text-[#c4c5c5] text-center mb-[20px]">
            How's this photo?
          </p>

          <div className="imageWrapper">
            <img
              src={image}
              className="w-[90%] h-[90%] object-cover"
              alt="profile"
            />
          </div>

          <div className="">
            <input
              type="file"
              className="hidden"
              onChange={captureImage}
              id="avatarInput"
            />
            <label
              htmlFor="avatarInput"
              className="text-[#3acfd5] my-[30px] inline-block cursor-pointer"
            >
              Choose a different photo
            </label>
          </div>

          <div className="">
            <div className="">
              <Button
                title="Next"
                icon="arrow-forward"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
