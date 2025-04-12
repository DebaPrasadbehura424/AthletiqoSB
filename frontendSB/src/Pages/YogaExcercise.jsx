import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import andoutjacks from "../workoutwomen/andoutjacks.gif";
import baamboozle from "../workoutwomen/baambozzle.gif";
import bicepsstrech from "../workoutwomen/bicpesstrech.gif";
import hourGlass from "../images/hourglass.gif";

function Workout() {
  const workoutItems = [
    {
      name: "Andout Jacks",
      image: andoutjacks,
      repetitions: "x30",
      description: "A great cardio exercise to warm up the body.",
    },
    {
      name: "Baamboozle",
      image: baamboozle,
      repetitions: "x30",
      description: "A fun exercise for improving coordination and agility.",
    },
    {
      name: "Biceps Stretch",
      image: bicepsstrech,
      repetitions: "x20",
      description: "Helps in increasing biceps flexibility.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30); 
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [resting, setResting] = useState(false); 
  const [isTimerStopped, setIsTimerStopped] = useState(false); 

  useEffect(() => {
    let interval;

    if (isWorkoutActive && !resting && timer > 0 && !isTimerStopped) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    else if (timer === 0 && currentIndex < workoutItems.length - 1) {
      setResting(true); 
      setTimer(10); 
    }
    else if (timer === 0 && resting && currentIndex < workoutItems.length - 1) {
      setResting(false); 
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
    }
    else if (timer === 0 && currentIndex === workoutItems.length - 1) {
      Swal.fire({
        title: "Workout Complete!",
        text: "Congratulations, you've completed today's workout!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Restart",
        cancelButtonText: "End",
      }).then((result) => {
        if (result.isConfirmed) {
          setCurrentIndex(0);
          setTimer(30);
          setIsWorkoutActive(true);
        } else {
          setIsWorkoutActive(false);
        }
      });
    }

    return () => clearInterval(interval);
  }, [isWorkoutActive, timer, currentIndex, resting, isTimerStopped]);

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setTimer(30); 
  };

  const stopTimer = () => {
    setIsTimerStopped(true);
  };

  const resumeTimer = () => {
    setIsTimerStopped(false); 
  };

  const restartWorkout = () => {
    setTimer(30);
    setIsWorkoutActive(true);
    setResting(false);
    setIsTimerStopped(false);
  };

  const goToNext = () => {
    if (currentIndex < workoutItems.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
      setResting(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setTimer(30); 
      setResting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Your Daily Workout</h1>
        <p className="text-gray-600 mt-2">
          Stay fit and healthy with these exercises!
        </p>
      </div>

      <div className="flex flex-col items-center mb-6">
        {isWorkoutActive && !resting ? (
          <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-blue-600">
              {workoutItems[currentIndex].name}
            </h2>
            <p className="text-gray-500 mt-2 text-xl">
              {workoutItems[currentIndex].description}
            </p>

            {isTimerStopped ? (
              <img src={hourGlass} alt="hourglass" className="h-72" />
            ) : (
              <img
                src={workoutItems[currentIndex].image}
                alt={workoutItems[currentIndex].name}
                className="w-full h-72 object-cover rounded-md mt-4"
              />
            )}

            <p className="mt-4 text-lg text-gray-700">Time Left: {timer}s</p>
            {isTimerStopped ? (
              <div className="flex justify-center mb-2 mt-2">
                <button
                  onClick={resumeTimer}
                  className="px-6 py-2 bg-green-600 text-white rounded-md text-xl font-medium hover:bg-green-700 transition duration-300"
                >
                  Start Timer
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-2 mt-2">
                <button
                  onClick={stopTimer}
                  className="px-6 py-2 bg-red-600 text-white rounded-md text-lg font-medium hover:bg-red-700 transition duration-300"
                >
                  Stop Timer
                </button>
              </div>
            )}
          </div>
        ) : resting ? (
          <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-blue-600">Rest Time</h2>
            <p className="text-gray-500 mt-2 text-xl">Take a 10-second rest!</p>
            <p className="mt-4 text-lg text-gray-700">Time Left: {timer}s</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={goToNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300"
              >
                Next
              </button>
              <button
                onClick={goToPrev}
                className="px-6 py-2 bg-gray-600 text-white rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300"
              >
                Prev
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <p className="text-xl text-gray-700">
              Click "Start Workout" to begin your session!
            </p>
          </div>
        )}
      </div>

      {!isWorkoutActive && (
        <div className="flex justify-center mb-6">
          <button
            onClick={startWorkout}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-xl font-medium hover:bg-blue-700 transition duration-300"
          >
            Start Workout
          </button>
        </div>
      )}

      {isWorkoutActive && !resting && (
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={goToPrev}
            className="px-6 py-2 bg-gray-600 text-white rounded-md text-lg font-medium hover:bg-gray-700 transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={goToNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Next
          </button>
        </div>
      )}

      <div className="text-center mt-8 text-gray-500">
        <p>
          Credit goes to{" "}
          <a href="https://www.spotbi.com" className="text-blue-600">
            SPOTBI.COM
          </a>{" "}
          for the images used.
        </p>
      </div>
    </div>
  );
}

export default Workout;
