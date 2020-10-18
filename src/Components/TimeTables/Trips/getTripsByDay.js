import compare from "../../../Functions/CompareTime/compare";

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

export default getTripsByDay;