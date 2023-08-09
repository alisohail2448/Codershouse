import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteRoomModal from "./DeleteRoomModal";

const RoomCardProfile = ({ room, deleteRoom, showDeleteModal, setShowDeleteModal }) => {


  const handleDeleteClick = (event) => {
    event.stopPropagation();

    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="bg-[#1d1d1d] p-[20px] rounded-[10px] cursor-pointer relative">
        <Link to={`/room/${room?.id}`}>
          <h3 className="text-white">{room.topic}</h3>
          <div
            className={
              room.speakers.length === 1
                ? "flex items-center relative my-[20px] singleAvatar"
                : "flex items-center relative my-[20px]"
            }
          >
            <div className="roomCard">
              {room.speakers.map((speaker) => {
                return (
                  <img
                    src={speaker.avatar}
                    key={speaker.id}
                    alt="speakers"
                    className="w-[40px] h-[40px] rounded-[50%] object-cover border-[2px] border-[#32dc76] absolute top-0  left-0 bg-[#1d1d1d] avatarImg"
                  />
                );
              })}
            </div>
            <div className="names">
              {room.speakers.map((speaker) => {
                return (
                  <div className="flex items-center pb-[5px]" key={speaker.id}>
                    <span className="text-white mr-[5px]">{speaker.name}</span>
                    <img src="/images/chat-bubble.png" alt="chat-bubble" />
                  </div>
                );
              })}
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-end">
          <span className="font-bold mr-[5px] text-white">
            {room.totalPeople}
          </span>
          <img src="/images/user-icon.png" alt="user-icon" />
        </div>
        <XMarkIcon
          className="w-[20px] text-white absolute top-[10px] right-[10px]"
          onClick={handleDeleteClick}
        />
      </div>

      {showDeleteModal && (
        <DeleteRoomModal room={room}
          closeModal={() => setShowDeleteModal(false)}
          onDelete={() => deleteRoom(room.id)}
        />
      )}
    </>
  );
};

export default RoomCardProfile;
