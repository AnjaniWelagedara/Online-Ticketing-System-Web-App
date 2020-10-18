/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
const getTripsByDay = require('./getTripsByDay');
/*Checked test cases*/
test('getTripsByDayPositive', () => {
    expect(getTripsByDay("Tuesday", {
        distance: "12.6",
        end: "Kollupitiya",
        fare: 12,
        hours: "1",
        id: "dnTTcWr2gd1Pgyj7Eskd",
        minutes: "50",
        routeNumber: "117",
        start: "Kaduwela",
        stations : [{
            distance: 12.6,
            end: "Sliit",
            start: "Kaduwela",
        },{

            distance: 5,
            end: "malabe",
            start: "sliit",
        }],
        trips : [{
            arrival: "08:30",
            busNumber: "NT2235",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602855644213,
            startStation: "Kaduwela",
            status: "notstart"
        },{
            arrival: "20:31",
            busNumber: "NT2235",
            day: "Wednesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602857869914,
            startStation: "Kaduwela",
            status: "notstart",
        },{
            arrival: "22:50",
            busNumber: "NW555",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602955220234,
            startStation: "Kaduwela",
        },{
            arrival: "11:00",
            busNumber: "NT2235",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602955296726,
            startStation: "Kaduwela",
        }]
    })).toStrictEqual([{
        arrival: "08:30",
        busNumber: "NT2235",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602855644213,
        startStation: "Kaduwela",
        status: "notstart",
    },{
        arrival: "11:00",
        busNumber: "NT2235",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602955296726,
        startStation: "Kaduwela"
    },{
        arrival: "22:50",
        busNumber: "NW555",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602955220234,
        startStation: "Kaduwela"
    }]);
});test('getTripsByDayNegative', () => {
    expect(getTripsByDay("Tuesday", {
        distance: "12.6",
        end: "Kollupitiya",
        fare: 12,
        hours: "1",
        id: "dnTTcWr2gd1Pgyj7Eskd",
        minutes: "50",
        routeNumber: "117",
        start: "Kaduwela",
        stations : [{
            distance: 12.6,
            end: "Sliit",
            start: "Kaduwela",
        },{

            distance: 5,
            end: "malabe",
            start: "sliit",
        }],
        trips : [{
            arrival: "08:30",
            busNumber: "NT2235",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602855644213,
            startStation: "Kaduwela",
            status: "notstart"
        },{
            arrival: "20:31",
            busNumber: "NT2235",
            day: "Wednesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602857869914,
            startStation: "Kaduwela",
            status: "notstart",
        },{
            arrival: "22:50",
            busNumber: "NW555",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602955220234,
            startStation: "Kaduwela",
        },{
            arrival: "11:00",
            busNumber: "NT2235",
            day: "Tuesday",
            duration: null,
            endStation: "Kollupitiya",
            id: 1602955296726,
            startStation: "Kaduwela",
        }]
    })).not.toStrictEqual([{
        arrival: "08:30",
        busNumber: "NT2235",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602855644213,
        startStation: "Kaduwela",
        status: "notstart",
    },{
        arrival: "11:00",
        busNumber: "NT2235",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602955296726,
        startStation: "Kaduwela"
    },{
        arrival: "22:50",
        busNumber: "NW555",
        day: "Tuesday",
        duration: null,
        endStation: "Kollupitiya",
        id: 1602955220234,
        startStation: "Kaduwela"
    }]);
});


