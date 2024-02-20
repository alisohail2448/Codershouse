import React, { useEffect, useState } from "react";
import { useWebRTC } from "../hooks/useWebRTC";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoom } from "../http";
import { ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

const SingleRoom = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state?.auth?.user);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const clientsToRender = clients.slice(0, 1).concat(clients.slice(2));
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [isMute, setIsMute] = useState(true);
  const colors = ["#3a4ed5", "#20bd5f", "#3acfd5", "#feee50", "#ffa51d"];

  const handleManualLeave = () => {
    navigate("/rooms");
  };

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [isMute]);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      setRoom((prev) => data);
    };

    fetchRoom();
  }, [roomId]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setIsMute((isMute) => !isMute);
    // if (user.id === room.ownerId) {
    //   handleMute(!isMute, user.id);
    //   setIsMute((prevIsMute) => !prevIsMute);
    // }
  };

  const handleShare = () => {
    const roomLink = `${window.location.origin}/room/${roomId}`;

    navigator.clipboard
      .writeText(roomLink)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        toast.error("Failed to copy link to clipboard");
      });
  };

  const speakersString =
    room?.speakers?.length > 0 ? room?.speakers[0]?.toString() : "";

  return (
    <div>
      <div className="container">
        <button
          onClick={handleManualLeave}
          className="flex items-center bg-none outline-none mt-[2rem]"
        >
          <img src="/images/arrow-left.png" alt="arrow-left" />
          <span className="goBack">All voice rooms</span>
        </button>
      </div>

      <div className="clientWrap">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold">{room?.topic}</h2>
          <div className="flex items-center">
            <button className="actionBtn">
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button onClick={handleManualLeave} className="actionBtn">
              <img src="/images/win.png" alt="win-icon" />
              <span className="font-bold ml-[12px]">Leave Quietly</span>
            </button>
            {room?.roomType === "private" && (
              <button className="actionBtn" onClick={handleShare}>
                <ShareIcon className="w-[18px] font-bold" />
                <span className="font-bold ml-[10px]">Share</span>
              </button>
            )}
          </div>
        </div>
        {room?.roomType === "open" && (
          <div className="clientsList">
            {[...clientsToRender]
              .sort((a, b) => {
                if (a.id === speakersString) return -1;
                if (b.id === speakersString) return 1;
                return 0;
              })
              .map((client) => {
                return (
                  <div className="flex flex-col items-center" key={client.id}>
                    <div
                      className="userHead"
                      style={{
                        border: `2px solid ${
                          colors[Math.floor(Math.random() * colors.length)]
                        }`,
                      }}
                    >
                      <audio
                        ref={(instance) => provideRef(instance, client.id)}
                        autoPlay
                      ></audio>
                      <img
                        src={client.avatar}
                        alt="avatar"
                        className="userAvatar"
                      />
                      {speakersString === client.id ? (
                        <button
                          onClick={() => handleMuteClick(client.id)}
                          className="micBtn"
                        >
                          {client.muted ? (
                            <img
                              src="/images/mic-mute.png"
                              alt="mic-mute-btn"
                            />
                          ) : (
                            <img src="/images/mic.png" alt="mic-btn" />
                          )}
                        </button>
                      ) : null}
                    </div>
                    <h4 className="font-bold mt-[.8rem]">{client.name}</h4>
                  </div>
                );
              })}
          </div>
        )}
        {room?.roomType === "social" && (
          <div className="clientsList">
            {[...clientsToRender]
              .sort((a, b) => {
                if (a.id === speakersString) return -1;
                if (b.id === speakersString) return 1;
                return 0;
              })
              .map((client) => {
                return (
                  <div className="flex flex-col items-center" key={client.id}>
                    <div
                      className="userHead"
                      style={{
                        border: `2px solid ${
                          colors[Math.floor(Math.random() * colors.length)]
                        }`,
                      }}
                    >
                      <audio
                        ref={(instance) => provideRef(instance, client.id)}
                        autoPlay
                      ></audio>
                      <img
                        src={client.avatar}
                        alt="avatar"
                        className="userAvatar"
                      />
                      <button
                        onClick={() => handleMuteClick(client.id)}
                        className="micBtn"
                      >
                        {client.muted ? (
                          <img src="/images/mic-mute.png" alt="mic-mute-btn" />
                        ) : (
                          <img src="/images/mic.png" alt="mic-btn" />
                        )}
                      </button>
                    </div>
                    <h4 className="font-bold mt-[.8rem]">{client.name}</h4>
                  </div>
                );
              })}
          </div>
        )}
        {room?.roomType === "private" && (
          <div className="clientsList">
            {[...clientsToRender]
              .sort((a, b) => {
                if (a.id === speakersString) return -1;
                if (b.id === speakersString) return 1;
                return 0;
              })
              .map((client) => {
                return (
                  <div className="flex flex-col items-center" key={client.id}>
                    <div
                      className="userHead"
                      style={{
                        border: `2px solid ${
                          colors[Math.floor(Math.random() * colors.length)]
                        }`,
                      }}
                    >
                      <audio
                        ref={(instance) => provideRef(instance, client.id)}
                        autoPlay
                      ></audio>
                      <img
                        src={client.avatar}
                        alt="avatar"
                        className="userAvatar"
                      />
                      <button
                        onClick={() => handleMuteClick(client.id)}
                        className="micBtn"
                      >
                        {client.muted ? (
                          <img src="/images/mic-mute.png" alt="mic-mute-btn" />
                        ) : (
                          <img src="/images/mic.png" alt="mic-btn" />
                        )}
                      </button>
                    </div>
                    <h4 className="font-bold mt-[.8rem]">{client.name}</h4>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRoom;
