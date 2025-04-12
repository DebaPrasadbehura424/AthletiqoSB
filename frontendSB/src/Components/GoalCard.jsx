import React, { useState, useContext, useEffect } from "react";
import { GiWaterBottle } from "react-icons/gi";
import { userContextData } from "../context/UserContext";
import { FaWeight, FaBed, FaWalking } from "react-icons/fa";
import { FcInternal, FcSearch } from "react-icons/fc";

import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { userHelperContextData } from "../context/UserHelperContext";

const GoalsCard = () => {
  const { addpoints } = useContext(userContextData);
  const { userData } = useContext(userHelperContextData);

  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const navigate = useNavigate();

  const goalDetails = userData?.user?.goalDetails || {};

  const [currentWeight, setCurrentWeight] = useState(
    goalDetails?.currentWeight || 0
  );
  const [gainWeight, setGainWeight] = useState(goalDetails?.targetWeight || 0);
  const [weightPerDay, setWeightPerDay] = useState(0);

  const [sleepTime, setSleepTime] = useState(goalDetails?.sleepGoalOneDay || 0);
  const [glassCount, setGlassCount] = useState(
    goalDetails?.waterGoalOneDay || 0
  );
  const [pageCount, setPageCount] = useState(
    goalDetails?.readingGoalOneDay || 0
  );
  const [stepCount, setStepCount] = useState(
    goalDetails?.walkingGoalOneDay || 0
  );

  const [fixedSleepGoal, setFixedSleepGoal] = useState(
    goalDetails?.sleepGoal || 8
  );
  const [fixedWaterGoal, setFixedWaterGoal] = useState(
    goalDetails?.waterGoal || 8
  );
  const [fixedReadingGoal, setFixedReadingGoal] = useState(
    goalDetails?.readingGoal || 20
  );
  const [fixedWalkingGoal, setFixedWalkingGoal] = useState(
    goalDetails?.walkingGoal || 100
  );

  useEffect(() => {
    if (goalDetails) {
      const {
        currentWeight,
        targetWeight,
        sleepGoalOneDay,
        waterGoalOneDay,
        readingGoalOneDay,
        walkingGoalOneDay,
        sleepGoal,
        waterGoal,
        readingGoal,
        walkingGoal,
      } = goalDetails;

      if (currentWeight !== undefined && targetWeight !== undefined) {
        setCurrentWeight(currentWeight);
        setSleepTime(sleepGoalOneDay);
        setGlassCount(waterGoalOneDay);
        setStepCount(walkingGoalOneDay);
        setPageCount(readingGoalOneDay);
        setFixedSleepGoal(sleepGoal);
        setFixedWaterGoal(waterGoal);
        setFixedReadingGoal(readingGoal);
        setFixedWalkingGoal(walkingGoal);

        const dailyWeightChange = (targetWeight - currentWeight) / 30;
        setWeightPerDay(dailyWeightChange.toFixed(2));
      }
    }
  }, [goalDetails]);

  const updateGoalProgress = async (
    goalCurrentValue,
    goalMaxValue,
    setGoalValue,
    goalUpdate
  ) => {
    if (goalCurrentValue < goalMaxValue) {
      const goalData = {
        sleepGoalOneDay: goalUpdate === "sleepGoalOneDay" ? 1.0 : 0.0,
        waterGoalOneDay: goalUpdate === "waterGoalOneDay" ? 1.0 : 0.0,
        walkingGoalOneDay: goalUpdate === "walkingGoalOneDay" ? 1.0 : 0.0,
        readingGoalOneDay: goalUpdate === "readingGoalOneDay" ? 1.0 : 0.0,
      };

      try {
        const response = await axios.patch(
          `http://localhost:5000/goals/update/${userId}`,
          goalData
        );
        if (response.status === 200) {
          setGoalValue((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error updating goal:", error);
      }
    } else {
      alert("you already completed this task");
      // return;
    }
    if (goalCurrentValue + 1 === goalMaxValue) {
      addpoints(5);
    }
  };

  const goals = [
    {
      id: 1,
      name: "Weight Goal",
      icon: <FaWeight className="text-pink-500 text-4xl" />,
      description: `from ${currentWeight} to ${gainWeight} kg in 30 days per day ${weightPerDay} kg`,
      type: "search",
    },
    {
      id: 2,
      name: "Sleep Goal",
      icon: <FaBed className="text-blue-500 text-4xl" />,
      description: `Sleep ${sleepTime}/${fixedSleepGoal} hours per day`,
      type: "internal",
    },
    {
      id: 3,
      name: "Water Goal",
      icon: <GiWaterBottle className="text-blue-500 text-4xl" />,
      description: `Drink ${glassCount}/${fixedWaterGoal} glasses of water a day`,
      type: "internal",
    },
    {
      id: 4,
      name: "Reading Goal",
      icon: <FcSearch className="text-red-500 text-4xl" />,
      description: `Read ${pageCount}/${fixedReadingGoal} pages per day`,
      type: "internal",
    },
    {
      id: 5,
      name: "Walking Goal",
      icon: <FaWalking className="text-green-500 text-4xl" />,
      description: `Walk ${stepCount}/${fixedWalkingGoal} steps per day`,
      type: "internal",
    },
  ];

  const handleGoalClick = (goalName, index) => {
    switch (index) {
      case 1:
        updateGoalProgress(
          sleepTime,
          fixedSleepGoal,
          setSleepTime,
          "sleepGoalOneDay"
        );
        break;
      case 2:
        updateGoalProgress(
          glassCount,
          fixedWaterGoal,
          setGlassCount,
          "waterGoalOneDay"
        );
        break;
      case 3:
        updateGoalProgress(
          pageCount,
          fixedReadingGoal,
          setPageCount,
          "readingGoalOneDay"
        );
        break;
      case 4:
        updateGoalProgress(
          stepCount,
          fixedWalkingGoal,
          setStepCount,
          "walkingGoalOneDay"
        );
        break;
      default:
        navigate(`/yogaexcer/${goalName}`);
        break;
    }
  };

  return (
    <div className="p-15 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <div
            key={goal.id}
            className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4"
          >
            {goal.icon}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {goal.name}
              </h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>

            <button
              className="text-4xl text-blue-500 cursor-pointer ml-auto"
              onClick={() => handleGoalClick(goal.name, index)}
            >
              {goal.type === "internal" ? (
                <FcInternal className="text-2xl rotate-180" />
              ) : (
                <FcSearch className="text-2xl" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsCard;
