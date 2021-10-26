import { query, body, validationResult, CustomValidator, ValidationChain } from 'express-validator';


export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const isValidSourceAndDistantion: CustomValidator = (value, { req }) => {
    if (value === req.query?.source || value === req.body?.source) {
        throw new Error('Source and destination not allowed to be equals');
    }

    // Indicates the success of this synchronous custom validator
    return true;
};

export const getValidator: ValidationChain[] = [
    query('source').exists().bail().trim().isString().toUpperCase(),
    query('destination').exists().bail().trim().isString().toUpperCase().custom(isValidSourceAndDistantion)
];

export const postValidator: ValidationChain[] = [
    body('source').exists().bail().trim().isString().toUpperCase(),
    body('destination').exists().bail().trim().isString().toUpperCase().custom(isValidSourceAndDistantion),
    body('distance').exists().trim().bail().isFloat().withMessage('distance Most be double')
];