import React, { useState } from "react";
import TextInput from "./TextInput";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../store/activateSlice";
import { updateUser } from "../http";
import { setAuth } from "../store/authSlice";

const profileSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be Valid")
    .required("Email is Required"),
  phone: yup.string().required("Phone is Required"),
});

const UpdateProfileModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.user);
  const [image, setImage] = useState(userData.avatar);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      enableReinitialize: true,
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateUser(userData.id, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          avatar: image,
        });

        if (response.status === 200) {
          if (response.data.auth) {
            dispatch(setAuth(response.data));
          }
          toast.success("Profile updated successfully");
          closeModal();
        } else {
          const data = response.data;
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating the profile");
      }
    },
  });

  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };


  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div className="w-[50%] max-w-[500px] bg-[#1d1d1d] rounded-[20px] relative">
        <button onClick={closeModal} className="absolute right-[8px] top-[8px]">
          <img src="/images/close.png" alt="close" />
        </button>

        <div className="p-[30px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col justify-center items-center mb-4 ">
              <h3 className="text-white mb-[10px] text-[20px] font-bold ">
                Update Profile
              </h3>
              <input
                type="file"
                id="avatarInput"
                name="avatar"
                accept="image/*"
                onChange={captureImage}
                style={{ display: "none" }}
              />
              <div className="avatar-container cursor-pointer">
                <img
                  src={image || userData.avatar || "/images/user.png"}
                  width={50}
                  height={50}
                  alt="avatar"
                  className="w-[90px] h-[90px] p-1 rounded-full ring-4 ring-[#3acfd5] my-[5px]"
                />
                <div
                  className="overlay"
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  {" "}
                  <p className="absolute top-[28%] text-[14px] text-center">
                    Change Image
                  </p>{" "}
                </div>{" "}
                {/* Overlay */}
              </div>
            </div>
            <div className="mb-3 flex flex-col justify-center">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="inputField"
                id="exampleInputPassword1"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
              <div className="text-red-700 text-[14px]">
                {formik.touched.name && formik.errors.name}
              </div>
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                className="inputField"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <div className="text-red-700 text-[14px]">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone
              </label>
              <input
                placeholder="Phone Number"
                type="number"
                name="phone"
                className="inputField"
                id="exampleInputPassword1"
                value={formik.values.phone}
                onChange={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
              />
              <div className="text-red-700 text-[14px]">
                {formik.touched.phone && formik.errors.phone}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#090909] py-[10px] px-[20px] rounded-[12px] flex hover:bg-[#0e0e0e] transition-all ease-in w-full items-center justify-center mt-[20px]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
