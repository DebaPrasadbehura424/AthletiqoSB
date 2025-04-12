import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Components/Navbar";
import TrackCal from "../Components/TrackCal";
import GoalsCard from "../Components/GoalCard";
import Footer from "../Components/Footer";

function Progress(props) {
  
  return (
    <div>
      <Navbar />
      <TrackCal />
      <GoalsCard />
      <Footer />
    </div>
  );
}

export default Progress;
