import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaTrophy, FaMedal, FaShieldAlt } from "react-icons/fa";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/getAll")
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response.data;
          setUsers(fetchedUsers);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const sortedUsers = users.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user, index) => {
          let rankIcon = null;
          if (index === 0) {
            rankIcon = <FaTrophy className="inline text-yellow-500 mr-2" />;
          } else if (index === 1) {
            rankIcon = <FaMedal className="inline text-gray-500 mr-2" />;
          } else if (index === 2) {
            rankIcon = <FaShieldAlt className="inline text-amber-700 mr-2" />;
          }

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-2 border-black shadow-lg"
            >
              <div className="text-center">
                <h2 className="text-3xl text-black font-semibold">
                  {rankIcon}
                  {user.firstName}
                </h2>
                <p className="text-black text-xl mt-2">
                  Total Points: {user.totalPoints}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
