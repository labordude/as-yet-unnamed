import React, {useEffect, useState} from "react";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import getUserbyidData from "./features/helpers"


export default function SideStats() {
    const {totalreviews, totalgamesplayed, toatalreviews} = profileStats;

    return (
        <div className="stats stats-vertical shadow">
            
            <div className="stat">
                <div className="stat-title">Total Games Played </div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Total Ratings</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Total Reviews</div>
                <div className="stat-value">1,200</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
            
        </div>
    );
}
