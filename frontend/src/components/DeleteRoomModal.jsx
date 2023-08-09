import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DeleteRoomModal = ({ room, closeModal, onDelete }) => {

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div className="w-[50%] max-w-[500px] bg-[#1d1d1d] rounded-[20px] relative">
        <div className="p-[20px]">
          <h3 className="text-white text-[18px] font-bold text-center">
            Delete Room
          </h3>
          <p className="text-[#ccc] mt-[10px]">
            Are you sure you want to delete the room: {room.topic}?
          </p>
          <div className="flex mt-[10px] justify-end flex-col">
            <button onClick={onDelete} className="bg-[#fb2020] py-[8px] px-[20px] rounded-[12px] flex hover:bg-[#ff5f5f] transition-all ease-in w-[100%] items-center justify-center mt-[10px] text-white font-bold">
              Confirm
            </button>
            <button onClick={closeModal} className="bg-[#090909] py-[8px] px-[20px] rounded-[12px] flex hover:bg-[#0e0e0e] transition-all ease-in w-[100%] items-center justify-center mt-[10px] text-white font-bold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomModal;
