/*
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
const compare = (a, b) => {
    if (a.arrival < b.arrival) {
        return -1;
    }
    if (a.arrival > b.arrival) {
        return 1;
    }
    return 0;
}

module.exports = compare;