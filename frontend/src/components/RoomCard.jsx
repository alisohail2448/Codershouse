import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/room/${room?.id}`}>
      <div className="bg-[#1d1d1d] p-[20px] rounded-[10px] cursor-pointer">
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

        <div className="flex items-center justify-end">
          <span className="font-bold mr-[5px] text-white">{room.totalPeople}</span>
          <img src="/images/user-icon.png" alt="user-icon" />
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
