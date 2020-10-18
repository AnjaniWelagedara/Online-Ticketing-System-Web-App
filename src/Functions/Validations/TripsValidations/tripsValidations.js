import joi from "@hapi/joi"

const tripsValidations = (trip) => {
    const schema = joi.object({
        busNumber: joi.string().min(3).max(255).required().messages({
            "string.empty": `Bus Number is required.`,
            "any.required": `Bus Number is required.`,
            "string.base": `Bus Number should be a type of 'text'.`,
            "string.min": `Bus Number should have a minimum length of {#limit}.`,
            "string.max": `Bus Number should have a maximum length of {#limit}.`,
        }),
        day: joi.string().min(3).max(255).required().messages({
            "string.empty": `Day is required.`,
            "any.required": `Day is required.`,
            "string.base": `Day should be a type of 'text'.`,
            "string.min": `Day should have a minimum length of {#limit}.`,
            "string.max": `Day should have a maximum length of {#limit}.`,
        }),
        startStation: joi.string().min(3).max(255).required().messages({
            "string.empty": `Start Station is required.`,
            "any.required": `Start Station is required.`,
            "string.base": `Start Station should be a type of 'text'.`,
            "string.min": `Start Station should have a minimum length of {#limit}.`,
            "string.max": `Start Station should have a maximum length of {#limit}.`,
        }),
        endStation: joi.string().min(3).max(255).required().messages({
            "string.empty": `End Station is required.`,
            "any.required": `End Station is required.`,
            "string.base": `End Station should be a type of 'text'.`,
            "string.min": `End Station should have a minimum length of {#limit}.`,
            "string.max": `End Station should have a maximum length of {#limit}.`,
        }),
        arrival: joi.string().min(3).max(255).required().messages({
            "string.empty": `Arrival Time is required.`,
            "any.required": `Arrival Time is required.`,
            "string.base": `Arrival Time should be a type of 'text'.`,
            "string.min": `Arrival Time should have a minimum length of {#limit}.`,
            "string.max": `Arrival Time should have a maximum length of {#limit}.`,
        }),

    });

    const result = schema.validate(trip);

    if (result.error) {
        return {
            status: false,
            error: result.error.details[0].message,
            path: result.error.details[0].context.label,
        }
    } else {
        return {
            status: true
        }
    }
};

export default tripsValidations;
