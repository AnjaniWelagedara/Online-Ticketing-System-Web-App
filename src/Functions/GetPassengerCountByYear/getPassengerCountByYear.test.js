/*Registration Number: IT18180626
Author: H.M.A.N.Welagedara
Group Number: 2020-REG-WE-20*/
const getPassengerCountByYear = require('./getPassengerCountByYear');
/*Positive test case*/
test('getPassengerCountByYearPositive', () => {
    expect(getPassengerCountByYear([{
        id: "3lO4CBtkq2pIV1CLP5yk",
        passengerAddress: "Kekirihena, Malabe",
        passengerCreditLimit: 0,
        passengerMobileNo: 789456321,
        passengerNIC: "984935178V",
        passengerName: "Kusal",
        passengerPassword: "123",
        passengerType: "Local",
        registeredDate: "2018",
    },
        {
            id: "Aoo3uwtLvE6T6dgghmAH",
            passengerAddress: "Kurunegala",
            passengerCreditLimit: 0,
            passengerMobileNo: 789785146,
            passengerNIC: "723654195V",
            passengerName: "Ashen",
            passengerPassword: "7854",
            passengerType: "Local",
            registeredDate: "2019",
        }]))
        .toStrictEqual([1,1]);
});
/*Negative test case*/

test('getPassengerCountByYearNegative', () => {
    expect(getPassengerCountByYear([{
        id: "3lO4CBtkq2pIV1CLP5yk",
        passengerAddress: "Kekirihena, Malabe",
        passengerCreditLimit: 0,
        passengerMobileNo: 789456321,
        passengerNIC: "984935178V",
        passengerName: "Kusal",
        passengerPassword: "123",
        passengerType: "Local",
        registeredDate: "2018",
    },
        {
            id: "Aoo3uwtLvE6T6dgghmAH",
            passengerAddress: "Kurunegala",
            passengerCreditLimit: 0,
            passengerMobileNo: 789785146,
            passengerNIC: "723654195V",
            passengerName: "Ashen",
            passengerPassword: "7854",
            passengerType: "Local",
            registeredDate: "2019",
        }])).not.toStrictEqual([1,1]);
});