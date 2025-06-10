import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User belum login");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data user");
        }
        return res.json();
      })
      .then((data) => {
        // Jika response adalah { user: { ... } }, ambil data.user
        setUser(data.user || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return null;

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white border border-blue-400 rounded-xl p-10 max-w-4xl w-full shadow-md text-center">
      {/* Foto Profil Bulat */}
      <div className="flex justify-center mb-2">
        <img
          src="https://picsum.photos/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-sm"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

      <div className="space-y-5 text-left">
        <ProfileRow label="Name" value={user.name} />
        <ProfileRow label="Email" value={user.email} />
        <ProfileRow label="Address" value={user.address} />
        <ProfileRow label="Phone" value={user.phone} />
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
