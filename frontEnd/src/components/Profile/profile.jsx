import React from "react";
import { Pencil } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white border border-blue-400 rounded-xl p-10 max-w-4xl w-full shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
          {/* Foto & Identitas */}
          <div className="flex flex-col items-center md:items-start md:w-1/3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold text-center md:text-left mt-2">Jessica Alba</h2>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              @jennywilson <Pencil size={14} className="cursor-pointer text-blue-500" />
            </p>
          </div>

          {/* Informasi Profil */}
          <div className="w-full md:w-2/3 mt-6 md:mt-0 space-y-5">
            <ProfileRow label="Username" value="Jenny Wilson" />
            <ProfileRow label="Email" value="jenny@gmail.com" />
            <ProfileRow label="Address" value="New York, USA" />
            <ProfileRow label="Nickname" value="Sky Angel" />
            <ProfileRow label="DOB" value="April 28, 1981" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
    <Pencil size={16} className="text-blue-500 cursor-pointer" />
  </div>
);

export default UserProfile;
