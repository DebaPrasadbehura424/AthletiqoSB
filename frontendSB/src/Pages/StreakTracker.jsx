import React, { useState } from "react";
import { FaCrown } from "react-icons/fa"; // Make sure to install react-icons if you haven't already
import { NavLink } from "react-router-dom";

const StreakTracker = () => {
  const [streakData, setStreakData] = useState([
    { month: "January", gainPoints: 20 },
    { month: "February", gainPoints: 21 },
    { month: "March", gainPoints: 22 },
    { month: "April", gainPoints: 24 },
    { month: "May", gainPoints: 5 },
    { month: "June", gainPoints: 2 },
    { month: "July", gainPoints: 12 },
    { month: "August", gainPoints: 12 },
    { month: "September", gainPoints: 12 },
    { month: "October", gainPoints: 12 },
    { month: "November", gainPoints: 12 },
    { month: "December", gainPoints: 12 },
  ]);

  const generateDailyPoints = (gainPoints) => {
    const daysInMonth = 30;
    let dailyPoints = [];
    for (let i = 0; i < daysInMonth; i++) {
      const dailyGain = Math.floor(Math.random() * 5);
      dailyPoints.push({
        day: i + 1,
        gain: dailyGain,
        isCompleted: dailyGain >= gainPoints,
      });
    }
    return dailyPoints;
  };

  const getCurrentDay = () => {
    return new Date().getDate();
  };

  let date = new Date().getFullYear();
  const currentDay = getCurrentDay(); 

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          FitYatra Streak {date}
        </h1>
        <NavLink to="/leadership">
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            <FaCrown />
            <span>Leaderboard</span>
          </button>
        </NavLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {streakData.map((monthData, index) => {
          const dailyPoints = generateDailyPoints(monthData.gainPoints);

          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 md:space-y-4 rounded-lg p-4 md:p-6 shadow-lg bg-white hover:bg-gray-100 transition-all"
            >
              <div className="text-md md:text-lg font-semibold mb-2 md:mb-4">
                {monthData.month}
              </div>
              <div className="grid grid-cols-7 gap-1 md:gap-2 w-full">
                {dailyPoints.map((dayData, dayIndex) => (
                  <div key={dayIndex} className="relative">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center cursor-pointer transform transition-all ${
                        dayData.isCompleted
                          ? "bg-green-500 text-white"
                          : dayData.day === currentDay
                          ? "bg-red-500 text-white"
                          : "bg-gray-400 text-white"
                      } ${
                        dayData.isCompleted && "line-through"
                      }`}
                    >
                      {dayData.day}
                    </div>
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 mt-1 p-4 text-sm bg-black text-center text-white rounded-md opacity-0 pointer-events-none transition-opacity duration-300 shadow-2xl ${
                        dayData.isCompleted ? "bg-green-500" : "bg-red-700"
                      } tooltip-content z-20`}
                    >
                      Day {dayData.day}: {dayData.gain} points
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .relative:hover .tooltip-content {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};

export default StreakTracker;
