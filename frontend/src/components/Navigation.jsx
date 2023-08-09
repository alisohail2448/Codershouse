import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/authSlice";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state?.auth);
  const logoutUser = async () => {
    try {
      const data = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="container py-[20px] flex items-center justify-between">
      <Link to="/" className="font-bold text-[22px] flex items-center">
        <img src="/images/logo.png" alt="logo" />
        <span className="ml-[10px]">Codershouse</span>
      </Link>

      {isAuth && (
        <div className="flex items-center">
          <h3>{user?.name}</h3>
          <Link to="/profile">
            <img
              src={user.avatar ? user.avatar : '/images/monkey-avatar.png'}
              width={50}
              height={50}
              alt="avatar"
              className="imgAvatar"
            />
          </Link>
          {isAuth && (
            <button className="logoutBtn" onClick={logoutUser}>
              <ArrowRightCircleIcon className="h-[26px] w-[26px] text-white" />
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
