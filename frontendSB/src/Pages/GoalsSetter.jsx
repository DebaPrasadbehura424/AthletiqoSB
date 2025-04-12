import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { userHelperContextData } from "../context/UserHelperContext";

function GoalsSetter() {
  const { userData } = useContext(userHelperContextData);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [currentWeight, setCurrentWeight] = useState(
    userData?.user?.goalDetails?.currentWeight
  );
  const [targetWeight, setTargetWeight] = useState(
    userData?.user?.goalDetails?.targetWeight
  );
  const [sleepGoal, setSleepGoal] = useState(
    userData?.user?.goalDetails?.sleepGoal
  );
  const [readingGoal, setReadingGoal] = useState(
    userData?.user?.goalDetails?.readingGoal
  );
  const [waterGoal, setWaterGoal] = useState(
    userData?.user?.goalDetails?.waterGoal
  );
  const [walkingGoal, setWalkingGoal] = useState(
    userData?.user?.goalDetails?.walkingGoal
  );
  const [age, setAge] = useState(userData?.user?.goalDetails?.age);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = {
      currentWeight,
      targetWeight,
      sleepGoal,
      readingGoal,
      waterGoal,
      walkingGoal,
      age,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/user/update/${userId}`,
        goalData
      );
      if (response.status === 200) {
        alert("Updated successfully");
        setCurrentWeight(goalData.currentWeight);
        setTargetWeight(goalData.targetWeight);
        setSleepGoal(goalData.sleepGoal);
        setReadingGoal(goalData.readingGoal);
        setWaterGoal(goalData.waterGoal);
        setWalkingGoal(goalData.walkingGoal);
        setAge(goalData.age);
      }
    } catch (err) {
      console.error("Error updating goals:", err);
      setError("Failed to update goals.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Set Your Goals</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentWeight"
            className="block text-sm font-medium text-gray-700"
          >
            Current Weight
          </label>
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="targetWeight"
            className="block text-sm font-medium text-gray-700"
          >
            Target Weight
          </label>
          <input
            type="number"
            id="targetWeight"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="sleepGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Sleep Goal (hours)
          </label>
          <input
            type="number"
            id="sleepGoal"
            value={sleepGoal}
            onChange={(e) => setSleepGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="readingGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Reading Goal (pages)
          </label>
          <input
            type="number"
            id="readingGoal"
            value={readingGoal}
            onChange={(e) => setReadingGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="waterGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Water Goal (liters)
          </label>
          <input
            type="number"
            id="waterGoal"
            value={waterGoal}
            onChange={(e) => setWaterGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="walkingGoal"
            className="block text-sm font-medium text-gray-700"
          >
            Walking Goal (steps)
          </label>
          <input
            type="number"
            id="walkingGoal"
            value={walkingGoal}
            onChange={(e) => setWalkingGoal(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Update Goals
        </button>
      </form>

      {message && <div className="mt-4 text-green-500">{message}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}

export default GoalsSetter;
