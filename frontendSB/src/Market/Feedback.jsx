import React from "react";
import { FaUser, FaCalendarAlt, FaStar } from "react-icons/fa";

function Feedback(props) {
  return (
    <div className="feedback-container py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-6">Customer Feedback</h2>
      <div className="flex flex-wrap justify-evenly gap-6">
        <div className="feedback-card bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 border-dotted w-72 h-72">
          <div className="flex items-center mb-4">
            <FaUser className="text-xl mr-2" />
            <span className="font-semibold text-lg">John Doe</span>
            <span className="ml-4 text-sm text-gray-500">
              <FaCalendarAlt className="inline-block mr-1" />
              March 10, 2025
            </span>
          </div>
          <div className="mb-4">
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-gray-300 inline-block" />
          </div>
          <p className="text-gray-700">
            "The medicines were delivered quickly and the quality is top-notch.
            Highly recommend this service to anyone!"
          </p>
        </div>

        <div className="feedback-card bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 border-dotted w-72 h-72">
          <div className="flex items-center mb-4">
            <FaUser className="text-xl mr-2" />
            <span className="font-semibold text-lg">Jane Smith</span>
            <span className="ml-4 text-sm text-gray-500">
              <FaCalendarAlt className="inline-block mr-1" />
              March 5, 2025
            </span>
          </div>
          <div className="mb-4">
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-gray-300 inline-block" />
          </div>
          <p className="text-gray-700">
            "The service is excellent. The delivery was on time and the customer
            support was amazing. Very satisfied!"
          </p>
        </div>

        <div className="feedback-card bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 border-dotted w-72 h-72">
          <div className="flex items-center mb-4">
            <FaUser className="text-xl mr-2" />
            <span className="font-semibold text-lg">Michael Brown</span>
            <span className="ml-4 text-sm text-gray-500">
              <FaCalendarAlt className="inline-block mr-1" />
              February 25, 2025
            </span>
          </div>
          <div className="mb-4">
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
          </div>
          <p className="text-gray-700">
            "Amazing experience. The medicine worked well for me and I am very
            happy with the overall service."
          </p>
        </div>

        <div className="feedback-card bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500 border-dotted w-72 h-72">
          <div className="flex items-center mb-4">
            <FaUser className="text-xl mr-2" />
            <span className="font-semibold text-lg">Emma White</span>
            <span className="ml-4 text-sm text-gray-500">
              <FaCalendarAlt className="inline-block mr-1" />
              February 10, 2025
            </span>
          </div>
          <div className="mb-4">
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-yellow-500 inline-block" />
            <FaStar className="text-gray-300 inline-block" />
            <FaStar className="text-gray-300 inline-block" />
          </div>
          <p className="text-gray-700">
            "Great service, although the delivery was a bit delayed, the
            medicine worked fine. Would try again."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
