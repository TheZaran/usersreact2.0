"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
//начало
const UserInfo = ({ params }) => {
  const { id } = params;

  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

//апи
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка при загрузке пользователя:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Загрузка...</p>;
  }
//хтмл инфа+кнопки
  return (
      <div className="flex flex-col p-6 rounded-lg">
        <div className="flex">
          <div>
            <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 mb-4"
            />
            <h2 className="font-bold text-2xl mb-2">
              {user.firstName} {user.lastName} {user.maidenName}
            </h2>
          </div>


          <div className="text-left flex justify-around p-4 bg-gray-50 rounded-lg shadow-md ml-12">

            <div className="mx-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <button onClick={() => setShowUserInfo(!showUserInfo)}>
                  {showUserInfo ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>

              {showUserInfo && (
                  <>
                    <p className="mb-2"><strong>Age:</strong> {user.age}</p>
                    <p className="mb-2"><strong>Gender:</strong> {user.gender}</p>
                    <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                    <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
                    <p className="mb-2"><strong>Username:</strong> {user.username}</p>
                    <p className="mb-2"><strong>Birth Date:</strong> {user.birthDate}</p>
                    <p className="mb-2"><strong>Blood Group:</strong> {user.bloodGroup}</p>
                    <p className="mb-2"><strong>Weight:</strong> {user.weight}</p>
                    <p className="mb-2"><strong>Height:</strong> {user.height}</p>
                    <p className="mb-2"><strong>Eye Color:</strong> {user.eyeColor}</p>
                    <p className="mb-2"><strong>Hair:</strong> {user.hair.color}, {user.hair.type}</p>
                  </>
              )}
            </div>


            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <button onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}>
                  {showAdditionalInfo ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>

              {showAdditionalInfo && (
                  <>
                    <p className="mb-2"><strong>IP:</strong> {user.ip}</p>
                    <p className="mb-2"><strong>Country:</strong> {user.country}</p>
                    <p className="mb-2"><strong>Address:</strong> {user.address.state}, {user.address.city}, {user.address.address}</p>
                    <p className="mb-2">
                      <strong>Address (in detail):</strong>
                      <i> state code:</i> {user.address.stateCode},
                      <i> postal code:</i> {user.address.postalCode}, <br />
                      <i> coordinates:</i> {user.address.coordinates.lat} (lat), {user.address.coordinates.lng} (lng)
                    </p>
                    <p className="mb-2"><strong>EIN:</strong> {user.ein}</p>
                    <p className="mb-2"><strong>SSN:</strong> {user.ssn}</p>
                    <p className="mb-2"><strong>User Agent:</strong> {user.userAgent}</p>
                    <p className="mb-2"><strong>Crypto:</strong> {user.crypto.coin}, {user.crypto.wallet}, {user.crypto.network}</p>
                    <p className="mb-2"><strong>Role:</strong> {user.role}</p>
                  </>
              )}
            </div>
          </div>
        </div>


        <center>
          <div className="mt-6">
            <Link
                href="/"
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black hover:border-2 hover:border-gray-500"
            >
              Go Back
            </Link>
          </div>
        </center>
      </div>
  );
};

export default UserInfo;
