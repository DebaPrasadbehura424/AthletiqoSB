import React, { useContext, useEffect, useState, useCallback } from "react";
import { GiElectric } from "react-icons/gi";
import Diet from "../images/diet.png";
import axios from "axios";
import Cookies from "universal-cookie";
import { userHelperContextData } from "../context/UserHelperContext";

function TrackCal() {
  const [waterLevel, setWaterLevel] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const { userData } = useContext(userHelperContextData);

  const age = userData?.user.goalDetails.age || 0;

  const [mealCalories, setMealCalories] = useState({
    breakfast: { calory: 0, isCompltere: false },
    lunch: { calory: 0, isCompltere: false },
    dinner: { calory: 0, isCompltere: false },
  });

  const calculateMealCalories = useCallback(() => {
    let updatedMealCalories = {};

    if (age <= 20) {
      updatedMealCalories = {
        breakfast: { calory: 350, isCompltere: false },
        lunch: { calory: 450, isCompltere: false },
        dinner: { calory: 400, isCompltere: false },
      };
    } else if (age > 20 && age <= 40) {
      updatedMealCalories = {
        breakfast: { calory: 500, isCompltere: false },
        lunch: { calory: 700, isCompltere: false },
        dinner: { calory: 600, isCompltere: false },
      };
    } else if (age > 40 && age <= 60) {
      updatedMealCalories = {
        breakfast: { calory: 450, isCompltere: false },
        lunch: { calory: 650, isCompltere: false },
        dinner: { calory: 550, isCompltere: false },
      };
    } else if (age > 60) {
      updatedMealCalories = {
        breakfast: { calory: 400, isCompltere: false },
        lunch: { calory: 600, isCompltere: false },
        dinner: { calory: 500, isCompltere: false },
      };
    }

    if (userData && userData?.user.goalDetails) {
      if (userData?.user.goalDetails.firstmeal) {
        updatedMealCalories.breakfast.isCompltere = true;
      }
      if (userData?.user.goalDetails.secmeal) {
        updatedMealCalories.lunch.isCompltere = true;
      }
      if (userData?.user.goalDetails.thirdmeal) {
        updatedMealCalories.dinner.isCompltere = true;
      }
    }

    setMealCalories(updatedMealCalories);
  }, [age, userData]);

  useEffect(() => {
    calculateMealCalories();
  }, [userData, age, calculateMealCalories]);

  const totalCalories = Object.values(mealCalories).reduce(
    (sum, meal) => sum + meal.calory,
    0
  );

  useEffect(() => {
    const updatedMeals = {
      breakfast: mealCalories.breakfast.isCompltere,
      lunch: mealCalories.lunch.isCompltere,
      dinner: mealCalories.dinner.isCompltere,
    };
    setSelectedMeals(updatedMeals);

    const newCalories = Object.keys(updatedMeals)
      .filter((meal) => updatedMeals[meal])
      .reduce((sum, meal) => sum + mealCalories[meal].calory, 0);

    setCalories(newCalories);

    const newWaterLevel = (newCalories / totalCalories) * 100;
    setWaterLevel(newWaterLevel);
  }, [mealCalories, totalCalories]);

  const handleMealSelection = async (meal) => {
    await axios.patch(`http://localhost:5000/goals/trackcal/${userId}/${meal}`);
    setSelectedMeals((prevState) => {
      const updatedMeals = { ...prevState, [meal]: !prevState[meal] };
      const newCalories = Object.keys(updatedMeals)
        .filter((meal) => updatedMeals[meal])
        .reduce((sum, meal) => sum + mealCalories[meal].calory, 0);
      setCalories(newCalories);
      const newWaterLevel = (newCalories / totalCalories) * 100;
      setWaterLevel(newWaterLevel);
      return updatedMeals;
    });
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="container mx-auto p-4 z-0">
      <div className="todays-goals bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Today's Calories
        </h3>

        <div className="grid md:grid-cols-3 grid-cols-2 gap-5 justify-evenly items-start lg:space-x-8 md:px-50">
          <div className="flex flex-col items-center lg:items-start space-y-4 w-full lg:w-auto">
            <div className="w-25 h-25 flex justify-center items-center">
              <img src={Diet} alt="Diet" className="md:w-full md:h-full" />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold text-gray-700">
                Track Food
              </h3>
              <p className="text-gray-600">{calories} cal</p>
            </div>
            <button
              onClick={togglePopup}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md mt-4"
            >
              Track My Meal
            </button>
          </div>

          <div className="relative w-32 h-48 md:ml-20 md:w-36 md:h-52 lg:w-40 lg:h-56 mt-6 lg:mt-0 flex flex-col justify-center items-center">
            <div className="relative w-full h-full battery-shape">
              <div
                className="absolute bottom-0 left-0 w-full bg-sky-500 transition-all duration-700 ease-in-out battery-fill"
                style={{ height: `${waterLevel}%` }}
              ></div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <GiElectric className="text-5xl text-yellow-500" />
            </div>
            <div className="mt-2 text-lg font-semibold text-center">
              {calories}/{totalCalories} cal
            </div>
          </div>

          <div className="grid md:grid-cols-2 items-center lg:items-end space-x-6 md:space-x-0 space-y-3 md:space-y-4 mt-6 lg:mt-0 w-full lg:w-auto gap-6">
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <label
                key={meal}
                className="flex items-center space-x-3 cursor-pointer text-gray-700 text-sm font-semibold"
              >
                <input
                  type="checkbox"
                  checked={selectedMeals[meal]}
                  onChange={() => handleMealSelection(meal)}
                  className="form-checkbox text-blue-500 w-5 h-5"
                />
                <span className="text-sm text-nowrap">
                  {meal.charAt(0).toUpperCase() + meal.slice(1)} -{" "}
                  {mealCalories[meal].calory}
                </span>
              </label>
            ))}
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4">Meal Calories</h2>
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Breakfast:</strong> {mealCalories["breakfast"].calory}{" "}
                  calories
                </p>
                <p className="text-gray-700">
                  <strong>Lunch:</strong> {mealCalories["lunch"].calory}{" "}
                  calories
                </p>
                <p className="text-gray-700">
                  <strong>Dinner:</strong> {mealCalories["dinner"].calory}{" "}
                  calories
                </p>
                <p className="text-gray-700 font-semibold mt-4">
                  <strong>Total Calories:</strong> {calories} calories
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={togglePopup}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackCal;
