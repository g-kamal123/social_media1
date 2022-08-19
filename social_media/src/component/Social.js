import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import FeedDeatail from "./FeedDeatail";
import Feeds from "./Feeds";
import Navbar from "./Navbar";
import { Storage } from "./Storage";
import classes from "./styles/Social.module.css";
import Trending from "./Trending";

function Social() {
  return (
    <div className={classes.social}>
      <Navbar />
      <div className={classes.postSection}>
        <Routes>
          <Route path="/" element={<Feeds />} />
          <Route path="/FeedDetails" element={<FeedDeatail />} />
        </Routes>
      </div>
      <Trending />
    </div>
  );
}

export default Social;
