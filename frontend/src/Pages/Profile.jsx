import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon } from "@heroicons/react/24/outline";
import UpdateProfileModal from "../components/UpdateProfileRoomModal";
import { deleteUserRoom, getUserAllRooms } from "../http";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import RoomCardProfile from "../components/RoomCardProfile";
import { toast } from "react-hot-toast";


const Profile = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const [userRooms, setUserRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPublicRooms, setFilteredPublicRooms] = useState([]);
  const [filteredSocialRooms, setFilteredSocialRooms] = useState([]);
  const [filterUserPrivateRooms, setFilterUserPrivateRooms] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    const fetchUserRooms = async () => {
      const { data } = await getUserAllRooms();
      setUserRooms(data);
    };
    fetchUserRooms();
  }, [showDeleteModal]);


  
  const deleteRoom = async (roomId) => {
    const response = await deleteUserRoom(roomId);
    if (response.status === 200) {
      toast.success("Room Deleted successfully");
      setShowDeleteModal(false);
    } else {
      const data = response.data;
      toast.error(data.message);
    }
};



  useEffect(() => {
    const filteredPublic = userRooms.filter(
      (room) =>
        room.roomType === "open" &&
        room.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPublicRooms(filteredPublic);

    const filteredSocial = userRooms.filter(
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
  }, [userRooms, searchQuery]);


  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container flex justify-center flex-col mb-[150px]">
        <div className="top flex justify-center mt-[20px] items-center flex-col  rounded-[10px] py-[20px] gap-[4px]">
          <img
            src={userData.avatar ? userData.avatar : "/images/user.png"}
            width={50}
            height={50}
            alt="avatar"
            className="w-[100px] h-[100px] p-1 rounded-full ring-4 ring-[#3acfd5] mb-[10px]"
          />
          <h2 className="text-[30px] font-bold">{userData.name}</h2>
          <h2 className="text-[#ccc]">{userData.email ? userData.email : ''}</h2>
          <h2 className="text-[#ccc]">{userData.phone}</h2>
          <button className="mt-[10px] bg-[#1d1d1d] py-[10px] px-[20px] rounded-[12px] flex hover:bg-[#1d1d1d9a] transition-all ease-in" onClick={openModal} >
            <PencilIcon className="w-[16px] mr-[6px]" />
            Edit Profile
          </button>
        </div>
        <div className="bottom mt-[20px] mb-[100px]">
          <Tabs value="public" defaultActive="public" className="relative z-0">
            <TabsHeader className="flex items-center justify-center rounded-[10px] transition duration-100 w-[50%]">
              <Tab
                value="public"
                activeClassName="border-b-2 border-[#3acfd5]  text-gray-900 w-full transition duration-500 ease-in-out"
              >
                <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
                  <h1>Public</h1>
                </div>
              </Tab>
              <Tab
                value="social"
                activeClassName="border-b-2 border-[#3acfd5] text-gray-900 w-full transition duration-500 ease-in-out"
              >
                <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
                  <h1>Social</h1>
                </div>
              </Tab>
              <Tab
                value="private"
                activeClassName="border-b-2 border-[#3acfd5] text-gray-900 w-full transition duration-500 ease-in-out"
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
                    <RoomCardProfile key={room.id} room={room} deleteRoom={deleteRoom} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="social">
                <div className="grid grid-cols-4 gap-[20px] mt-[60px]">
                  {filteredSocialRooms.map((room) => (
                    <RoomCardProfile key={room.id} room={room} deleteRoom={deleteRoom} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="private">
                <div className="grid grid-cols-4 gap-[20px] mt-[60px]">
                  {filterUserPrivateRooms.map((room) => (
                    <RoomCardProfile key={room.id} room={room} deleteRoom={deleteRoom} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                  ))}
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>

      {showModal && <UpdateProfileModal closeModal={closeModal}  />}
    </>
  );
};

export default Profile;
