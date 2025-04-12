import React, { useContext, useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { userContextData } from "../context/UserContext";
import { userHelperContextData } from "../context/UserHelperContext";

function GraphTrack(props) {
  const { userData } = useContext(userHelperContextData);

  const goalDetails = userData?.user?.goalDetails || {};
  const dailyPoints = goalDetails?.dailyPoints || [];
  const [selectedOption, setSelectedOption] = useState("Weight Goals");

  const getChartData = (option) => {
    let labels = [];
    let data = [];

    switch (option) {
      case "Weight Goals":
        labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
        data = dailyPoints;
        break;
      case "Sleep Training":
        labels = Array.from(
          { length: 7 },
          (_, i) =>
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ][i]
        );
        data = dailyPoints;
        break;
      case "Fitness Goals":
        labels = Array.from(
          { length: 7 },
          (_, i) =>
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ][i]
        );
        data = dailyPoints;
        break;
      case "Mind Relaxation":
        labels = Array.from(
          { length: 7 },
          (_, i) =>
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ][i]
        );
        data = dailyPoints;
        break;
      case "Vocal Exercise":
        labels = Array.from(
          { length: 7 },
          (_, i) =>
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ][i]
        );
        data = dailyPoints;
        break;
      default:
        labels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
        data = dailyPoints;
        break;
    }

    return { labels, data };
  };

  const { labels, data } = getChartData(selectedOption);

  const lineData = {
    labels,
    datasets: [
      {
        label: `${selectedOption} - Monthly Data`,
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: `${selectedOption} - Weekly Overview`,
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#FFB6C1",
          "#8A2BE2",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#FFB6C1",
          "#8A2BE2",
        ],
      },
    ],
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="p-2 md:p-8 bg-gray-100 w-full ">
      <div className="flex justify-end p-2">
        <select
          id="goal-selection"
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-1/5 p-1 border rounded-lg"
        >
          <option value="Weight Goals">Weight Goals</option>
          <option value="Sleep Training">Sleep Training</option>
          <option value="Fitness Goals">Fitness Goals</option>
          <option value="Mind Relaxation">Mind Relaxation</option>
          <option value="Vocal Exercise">Vocal Exercise</option>
        </select>
      </div>

      <div className="w-full h-96 flex justify-center items-center shadow-xl p-6 bg-white rounded-lg mb-4 md:mb-0">
        <Line data={lineData} options={{ responsive: true }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:mt-6">
        <div className="w-full shadow-lg h-96 p-6 bg-white rounded-lg">
          <Bar data={barData} />
        </div>

        <div className="w-full flex justify-center items-center shadow-lg h-96 p-6 bg-white rounded-lg">
          <Doughnut data={pieData} />
        </div>
      </div>
    </div>
  );
}

export default GraphTrack;
