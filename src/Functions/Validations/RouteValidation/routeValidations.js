import joi from "@hapi/joi"

const routeValidations = (route) => {
    const schema = joi.object({
        routeNumber: joi.string().min(3).max(255).required().messages({
            "string.empty": `Route Number is required.`,
            "any.required": `Route Number is required.`,
            "string.base": `Route Number should be a type of 'text'.`,
            "string.min": `Route Number should have a minimum length of {#limit}.`,
            "string.max": `Route Number should have a maximum length of {#limit}.`,
        }),
        distance: joi.number().positive().required().messages({
            "number.positive": `Distance for the route can not be negative value.`,
            "number.base": `Please enter distance for the route.`,
        }),
        start: joi.string().min(3).max(255).required().messages({
            "string.empty": `Start Station is required.`,
            "any.required": `Start Station is required.`,
            "string.base": `Start Station should be a type of 'text'.`,
            "string.min": `Start Station should have a minimum length of {#limit}.`,
            "string.max": `Start Station should have a maximum length of {#limit}.`,
        }),
        end: joi.string().min(3).max(255).required().messages({
            "string.empty": `End Station is required.`,
            "any.required": `End Station is required.`,
            "string.base": `End Station should be a type of 'text'.`,
            "string.min": `End Station should have a minimum length of {#limit}.`,
            "string.max": `End Station should have a maximum length of {#limit}.`,
        }),
        hours: joi.number().positive().required().messages({
            "number.positive": `Hours for the route can not be negative value.`,
            "number.base": `Please enter hours for the route.`,
        }),
        minutes: joi.number().positive().required().messages({
            "number.positive": `Minutes for the route can not be negative value.`,
            "number.base": `Please enter minutes for the route.`,}),
        fare: joi.number().positive().required().messages({
            "number.positive": `Fare for the route can not be negative value.`,
            "number.base": `Please enter fare for the route.`,
        }),
        stations: joi.array().min(1).required().messages({
            "string.empty": `Please add at least one search tag.`,
            "any.required": `Please add at least one search tag.`,
            "array.min": `Please add at least one Station.`,
        }),
    });

    const result = schema.validate(route);

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

export default routeValidations;
