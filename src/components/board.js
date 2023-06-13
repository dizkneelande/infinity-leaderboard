import React, { useState } from 'react'
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {
    const [period, setPeriod] = useState(0);

    const handleClick = (e) => {
        setPeriod(Number(e.target.dataset.id)) // Parse period as number
    }

    return (
        <div className="board">
            <h1 className='leaderboard'>Infinity Leaderboard</h1>

            <div className="duration">
                <button onClick={handleClick} data-id='7'>7 Days</button>
                <button onClick={handleClick} data-id='30'>30 Days</button>
                <button onClick={handleClick} data-id='0'>All-Time</button>
            </div>

            <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
        </div>
    )
}

function between(data, period){
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    const previous = new Date();
    previous.setDate(previous.getDate() - period);
    previous.setHours(0, 0, 0, 0); // Start of previous day

    let filter = data.filter(val => {
        let userDate = new Date(val.dt);
        if (period === 0) return true;
        return previous <= userDate && userDate <= today;
    })

    // sort in descending order
    return filter.sort((a, b) => b.score - a.score);
}

// phones, pre-entry, ST, vets, data entry, MACROS, MICROS, checking