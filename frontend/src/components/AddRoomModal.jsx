import React, { useState } from "react";
import TextInput from "./TextInput";
import { toast } from "react-hot-toast";
import { createRooms } from "../http";
import { useNavigate } from 'react-router-dom';

const AddRoomModal = ({ closeModal }) => {
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  const createRoom = async() => {
    if(!topic){
      toast.error("Topic is required!")
      return;
    }
    try {
      const { data } = await createRooms({ topic, roomType });
      console.log(data)
      navigate(`/room/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div className="w-[50%] max-w-[500px] bg-[#1d1d1d] rounded-[20px] relative">
        <button onClick={closeModal} className="absolute right-[8px] top-[8px]">
          <img src="/images/close.png" alt="close" />
        </button>

        <div className="p-[30px] border-b-2 border-[#262626]">
          <h1 className="mb-[5px]">Enter the topic to be discussed</h1>

          <TextInput fullWidth="true" value={topic} onChange={(e) => setTopic(e.target.value)}  />
          <h2 className="text-[18px] my-[10px]  font-bold">Room Types</h2>
          <div className="grid grid-cols-3 gap-[30px]">

            <div onClick={() => setRoomType('open')} className={roomType === 'open' ? 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer bg-[#262626]' : 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer'}>
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>


            <div onClick={() => setRoomType('social')} className={roomType === 'social' ? 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer bg-[#262626]' : 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer'}>
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>

            <div onClick={() => setRoomType('private')} className={roomType === 'private' ? 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer bg-[#262626]' : 'flex flex-col items-center p-[10px] rounded-[10px] cursor-pointer'}>
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
            
          </div>
        </div>
        <div className="p-[30px] text-center">
          <h2 className="mb-[20px] font-bold text-[20px]">
            Start a room, open to everyone
          </h2>
          <button onClick={createRoom}  className="roomBtn mx-auto w-[200px]">
            <img
              src="/images/celebration.png"
              alt="celebrate"
              className="mr-[5px]"
            />
            <span className="">Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
