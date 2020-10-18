import joi from "@hapi/joi"

const BusValidations = (bus) => {
    const schema = joi.object({
        busNumber: joi.string().min(3).max(255).required().messages({
            "string.empty": `Bus Number is required.`,
            "any.required": `Bus Number is required.`,
            "string.base": `Bus Number should be a type of 'text'.`,
            "string.min": `Bus Number should have a minimum length of {#limit}.`,
            "string.max": `Bus Number should have a maximum length of {#limit}.`,
        }),
        routeNumber: joi.string().min(3).max(255).required().messages({
            "string.empty": `Route Number is required.`,
            "any.required": `Route Number is required.`,
            "string.base": `Route Number should be a type of 'text'.`,
            "string.min": `Route Number should have a minimum length of {#limit}.`,
            "string.max": `Route Number should have a maximum length of {#limit}.`,
        }),
        type: joi.string().min(3).max(255).required().messages({
            "string.empty": `Condition is required.`,
            "any.required": `Condition is required.`,
            "string.base": `Condition should be a type of 'text'.`,
            "string.min": `Condition should have a minimum length of {#limit}.`,
            "string.max": `Condition should have a maximum length of {#limit}.`,
        }),
        sheets: joi.number().positive().required().messages({
            "number.positive": `Sheets for the bus can not be negative value.`,
            "number.base": `Please enter sheets for the Bus.`,
        }),
        driver: joi.string().min(3).max(255).required().messages({
            "string.empty": `Driver is required.`,
            "any.required": `Driver is required.`,
            "string.base": `Driver should be a type of 'text'.`,
            "string.min": `Driver should have a minimum length of {#limit}.`,
            "string.max": `Driver should have a maximum length of {#limit}.`,
        }),
        passcode: joi.string().min(3).max(255).required().messages({
            "string.empty": `Pass Code is required.`,
            "any.required": `Pass Code is required.`,
            "string.base": `Pass Code should be a type of 'text'.`,
            "string.min": `Pass Code should have a minimum length of {#limit}.`,
            "string.max": `Pass Code should have a maximum length of {#limit}.`,
        })
    });

    const result = schema.validate(bus);

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

export default BusValidations;
