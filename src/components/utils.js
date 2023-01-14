import { async } from "@firebase/util";
import { useState } from "react";
import { auth, getData } from "../config/firebase"




//Helper function to turn type into unix time
const typing = function (type) {
    switch(type){
        case "daily": return 57600000;
        case "weekly": return 403200000;
        case "biweekly": return 806400000;
        case "monthly": return 1728000000;
    }
}

//Helper function to turn type into days
const typingDays = function (type) {
    switch(type){
    case "daily": return 1;
    case "weekly": return 7;
    case "biweekly": return 14;
    case "monthly": return 30;
    }
}


//Days left data
const days = async function () {
    const current = new Date().getTime();;
    const data = await getData();
    const timed = typing(data.type);
    if(data.used == 0) {
        return timed / 57600000
    }
    if(data.start == 0) {
        var final = (timed - data.used) / 57600000;
    }
    if(data.start > 0) {
        const used = current - data.start + data.used;
        var final = (timed - used) / 57600000;
    }
    //Turn unix time to 15hrs and return
    if(final < 1 && final > -1  ) {
        return Math.round(final)
    }
    const val = Math.round(final);
    if(isNaN(val)) {
        return 0;
    }
    return Math.round(val)
}
//Hours Worn
const worn = async function () {
    const current = new Date().getTime();;
    const data = await getData();
    if(data.end != 0) {
        return 0;
    }
    const start = data.start;
    if(start == 0) {
        return 0
    }
    //Gets hours used
    const final = (current - start) / 3600000;
    if(final < 1 && final > -1  ) {
        return Math.round(final).toFixed(1);
    }
    const val = Math.round(final);
    if(isNaN(val)) {
        return 0;
    }
    return Math.round(val) 
}

//Hours Remaining 
const remaining = async function () {
    var userWorn = await worn();
    //Max hours that contacts should be worn to stay healthy,
    const maxHours = 16
    if(userWorn < 0) {
        return maxHours
    }
    //Gets hours used
    const final = (maxHours - userWorn);
    if(final < 1 && final > -1  ) {
        return Math.round(final).toFixed(1);
    }
    const val = Math.round(final);
    if(isNaN(val)) {
        return 0;
    }
    return Math.round(val) 
}

//Start button for Lensi
const startExists = async function () {
    const data = await getData();
    console.log("START EXISTS FUNC: ", data.start)
    if(data.start == 0) {
        return false
    }
    return true

}

//Helper function for lens status to return result
const scoring = function (score) {
    if(score >= 30) {
        return "GOOD";
    }
    if(score < 30 && score > 0) {
        return "OK";
    }
    return "BAD";
}

const lensStatus = async function (day, wore, remain, status){
    const data = await getData();
    //scoring system, 100 is good 0 is bad
    var score = 100;
    if(status) {
        const wornScore = (wore / 16).toFixed(1)
        score = score - (score * wornScore);
    }
    if(!status) {
        const totalDays = typingDays(data.type);
        const dayScore = day / totalDays;
        score = dayScore * score;
    }
    return scoring(score);
}

//Gets color of health status
export const getHealthColor = function (score) {
    switch(score){
        case "GOOD": return "#20D78A";
        case "OK": return "#EDD927";
        case "BAD": return "#ED4A27";
    }
}


//Puts all data together and sends data object
export const user = async function () {
    const userDays = await days();
    const userWorn = await worn();
    const userRemaining = await remaining();
    const start = await startExists();
    const score = await lensStatus(userDays, userWorn, userRemaining, start);
    console.log("USER CALLED");
    console.log("USER SCORE: ", score);
    return {days: userDays, worn: userWorn, remaining: userRemaining, startExists: start, scoreStatus: score}
}