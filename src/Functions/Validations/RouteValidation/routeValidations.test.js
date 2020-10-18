import routeValidations from "./routeValidations";

test('routeValidationsPositive', () => {
    expect(routeValidations({
        routeNumber: "507",
        start: "Kegalle",
        end: "Kurunagala",
        distance: 12,
        hours: 1,
        minutes: 50,
        fare: 64,
        stations: [{
            start: "Kegalle",
            end: "Karadupana",
            distance: 1,
        }],
    })).toStrictEqual({
        status: true
    });
});

test('routeValidationsNegative', () => {
    expect(routeValidations({
        routeNumber: "507",
        start: "Kegalle",
        end: "Kurunagala",
        distance: 12,
        hours: 1,
        minutes: 50,
        fare: 64,
        stations: [{
            start: "Kegalle",
            end: "Karadupana",
            distance: 1,
        }],
    })).not.toStrictEqual({
        status: true
    });
});

