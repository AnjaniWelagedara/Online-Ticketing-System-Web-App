/*
 *      Author          -   Ashen Senevirathne
 *      IT Number       -   IT18178678
 *
 */
const compare = require('./compare');

test('comparePositive', () => {
    expect(compare({arrival : "11:30"}, {arrival : "11:30"})).toStrictEqual(0);
});

test('compareNegative', () => {
    expect(compare({arrival : "11:30"}, {arrival : "11:30"})).not.toStrictEqual(0);
});

