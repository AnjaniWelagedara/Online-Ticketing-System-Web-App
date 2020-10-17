const getPassengerCount = (passengers) => {
    let localCount = 0;
    let ForeignCount = 0;
    passengers.map(p => {
        if (p.passengerType === "Local") {
            ++localCount;
        } else {
            ++ForeignCount;
        }
    })
    let passengerCount = [localCount, ForeignCount];
    return passengerCount;
}

module.exports = getPassengerCount;