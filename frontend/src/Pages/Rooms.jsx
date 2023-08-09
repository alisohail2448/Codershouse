import React, { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import AddRoomModal from "../components/AddRoomModal";
import { getAllRooms, getUserAllRooms } from "../http";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPublicRooms, setFilteredPublicRooms] = useState([]);
  const [filteredSocialRooms, setFilteredSocialRooms] = useState([]);
  const [filterUserPrivateRooms, setFilterUserPrivateRooms] = useState([]);


  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchUserRooms = async () => {
      const { data } = await getUserAllRooms();
      setUserRooms(data);
    };
    fetchUserRooms();
  }, []);




  useEffect(() => {
    const filteredPublic = rooms.filter(
      (room) =>
        room.roomType === "open" &&
        room.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPublicRooms(filteredPublic);

    const filteredSocial = rooms.filter(
      (room) =>
        room.roomType === "social" &&
        room.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSocialRooms(filteredSocial);

    const filteredPrivateUser = userRooms.filter(
      (room) =>
        room.roomType === "private" &&
        room.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterUserPrivateRooms(filteredPrivateUser);
  }, [rooms, userRooms, searchQuery]);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between my-[20px]">
          <div className="flex items-">
            <span className="heading text-[20px] font-bold flex justify-center items-center">
              All Voice Rooms
            </span>
            <div className="bg-[#262626] ml-[20px] flex items-center px-[10px] min-w-[300px] rounded-[10px]">
              <img src="/images/search-icon.png" alt="search" />
              <input
                type="text"
                name=""
                id=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none py-[7px] px-[10px] text-white w-[100%]"
              />
            </div>
          </div>
          <div className="">
            <button className="roomBtn" onClick={openModal}>
              <img src="/images/add-room-icon.png" alt="add-room" />
              <span className="text-[16px] ml-[10px]">Start a room</span>
            </button>
          </div>
        </div>
      </div>

      <Tabs value="public" defaultActive="public" className="relative z-0">
        <TabsHeader className="flex items-center justify-center py-[5px] px-[5px] bg-[#1d1d1d4d] rounded-[10px] transition duration-100 w-[50%]">
          <Tab
            value="public"
            activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
          >
            <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
              <h1>Public</h1>
            </div>
          </Tab>
          <Tab
            value="social"
            activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
          >
            <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
              <h1>Social</h1>
            </div>
          </Tab>
          <Tab
            value="private"
            activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
          >
            <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
              <h1>Private</h1>
            </div>
          </Tab>
        </TabsHeader>
        <TabsBody className="container">
          <TabPanel value="public">
            <div className="grid grid-cols-4 gap-[20px] mt-[60px]">
              {filteredPublicRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="social">
            <div className="grid grid-cols-4 gap-[20px] mt-[60px]">
              {filteredSocialRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="private">
            <div className="grid grid-cols-4 gap-[20px] mt-[60px]">
              {filterUserPrivateRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>

      {showModal && <AddRoomModal closeModal={closeModal} />}
    </>
  );
};

export default Rooms;
