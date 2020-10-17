import getLabels from "../../Functions/GetLabels/getLabels"

const GetPassengerCountByYear = (passengers) => {
    let passengerCount = [];
    getLabels(passengers).map(year => {
        let count = 0;
        passengers.map(p => {
            if(p.registeredDate === year){
                ++count;
            }
        })
        passengerCount.push(count);
    })
    return passengerCount;
}

export default GetPassengerCountByYear;