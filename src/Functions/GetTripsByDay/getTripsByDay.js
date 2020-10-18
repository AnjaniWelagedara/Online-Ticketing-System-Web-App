/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
import compare from "../CompareTime/compare";

const getTripsByDay = (day, route) => {
    let trips = [];
    route.trips.map(trip => {
        if (trip.day === day) {
            trips.push(trip)
        }
    })

    trips.sort( compare );
    return trips;
}

module.exports = getTripsByDay;