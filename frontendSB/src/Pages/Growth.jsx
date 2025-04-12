import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { userHelperContextData } from "../context/UserHelperContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function Growth() {
  const { userData } = useContext(userHelperContextData);
  const totalPointsFix = 600.0;

  const currentPoints = userData?.user?.goalDetails.totalPoints || 0;
  const currentGrowth = (currentPoints / totalPointsFix) * 100.0;

  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    let growthValue = 0;
    const interval = setInterval(() => {
      if (growthValue < currentGrowth) {
        growthValue += 1;
        setGrowth(growthValue);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentGrowth]);

  const doughnutData = {
    labels: ["Growth", "Remaining"],
    datasets: [
      {
        label: "Growth Progress",
        data: [growth, 100 - growth],
        backgroundColor: ["#00bcd4", "#333333"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
  };

  return (
    <div className="w-full h-screen p-6 flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center">
        {/* Display growth percentage */}
        <div className="text-6xl font-bold text-sky-300 mb-4">
          {Math.round(growth)}%
        </div>

        {/* Display total points */}
        <div className="text-3xl font-semibold text-white mb-4">
          {currentPoints} / {totalPointsFix} Points
        </div>

        <div className="relative w-96 h-96 mb-8">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="text-3xl font-semibold text-white">Growth Rate</div>
      </div>
    </div>
  );
}

export default Growth;
