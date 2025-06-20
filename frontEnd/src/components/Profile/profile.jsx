import React, { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import HashLoader from "react-spinners/HashLoader";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
        if (!res.ok) throw new Error("Gagal mengambil data user");
        return res.json();
      })
      .then((data) => {
        const userData = data.user || data;
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          address: userData.address,
          phone: userData.phone,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleEditClick = () => {
    setEditing(true);
    setUpdateError(null);
    setUpdateSuccess(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update gagal");
      }

      const updatedData = await response.json();
      setUser(updatedData.user || updatedData);
      setEditing(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <HashLoader color="#0854ff" />
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="relative bg-white border border-blue-400 rounded-xl p-10 max-w-4xl w-full shadow-md text-center">
        {!editing && (
          <button
            onClick={handleEditClick}
            className="absolute top-4 right-4 text-blue-500 hover:text-blue-700"
          >
            <Pencil size={20} />
          </button>
        )}

        <div className="flex justify-center mb-2">
          <img
            src="https://picsum.photos/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-sm"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

        {updateSuccess && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Profile berhasil diupdate!
          </div>
        )}
        {updateError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {updateError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 text-left">
            <ProfileRow
              label="Name"
              value={
                editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                    required
                  />
                ) : (
                  user.name
                )
              }
            />
            <ProfileRow
              label="Email"
              value={
                editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                    required
                  />
                ) : (
                  user.email
                )
              }
            />
            <ProfileRow
              label="Address"
              value={
                editing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                    required
                  />
                ) : (
                  user.address
                )
              }
            />
            <ProfileRow
              label="Phone"
              value={
                editing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                    required
                  />
                ) : (
                  user.phone
                )
              }
            />
          </div>

          {editing && (
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
              >
                <X size={16} className="mr-1" /> Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
              >
                {isUpdating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-1" /> Save
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <div className="text-gray-600">{value}</div>
    </div>
  </div>
);

export default UserProfile;
