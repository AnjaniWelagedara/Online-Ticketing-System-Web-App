/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
import getLabels from "../GetLabels/getLabels";

const getPassengerCountByYear = (passengers) => {
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

module.exports = getPassengerCountByYear;