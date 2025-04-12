import React from "react";
import {
  FaShippingFast,
  FaUsers,
  FaThumbsUp,
  FaHeartbeat,
} from "react-icons/fa";

function Information(props) {
  return (
    <div className="information-container py-10 px-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="info-card text-center p-6 rounded-lg shadow-lg bg-blue-500 text-white">
          <FaShippingFast className="text-4xl mb-2" />
          <h3 className="text-3xl font-semibold">1K+</h3>
          <p className="text-lg">Medicines Delivered</p>
        </div>

        <div className="info-card text-center p-6 rounded-lg shadow-lg bg-green-500 text-white">
          <FaUsers className="text-4xl mb-2" />
          <h3 className="text-3xl font-semibold">10K+</h3>
          <p className="text-lg">Followers</p>
        </div>

        <div className="info-card text-center p-6 rounded-lg shadow-lg bg-yellow-500 text-white">
          <FaThumbsUp className="text-4xl mb-2" />
          <h3 className="text-3xl font-semibold">5K+</h3>
          <p className="text-lg">Trust Numbers</p>
        </div>

        <div className="info-card text-center p-6 rounded-lg shadow-lg bg-red-500 text-white">
          <FaHeartbeat className="text-4xl mb-2" />
          <h3 className="text-3xl font-semibold">2K+</h3>
          <p className="text-lg">Happy Customers</p>
        </div>
      </div>

      <div className="border-b-2 border-dotted border-gray-400 mt-6"></div>
    </div>
  );
}

export default Information;
