const getLabels = (passengers) => {
    let flags = [], output = [], l = passengers.length, i;
    for( i=0; i<l; i++) {
        if( flags[passengers[i].registeredDate]) continue;
        flags[passengers[i].registeredDate] = true;
        output.push(passengers[i].registeredDate);
    }
    return output;
}

module.exports = getLabels;