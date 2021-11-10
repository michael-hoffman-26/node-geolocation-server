import { isFloat } from "../common/functions";

describe("is float function", () => {
    test("isFloat determine weather the input is float or not", () => {

        expect(isFloat(243)).toBe(false);
        expect(isFloat(2.1)).toBe(true);
        expect(isFloat(0.99)).toBe(true);
        expect(isFloat('21r')).toBe(false);
        expect(isFloat('e4.5')).toBe(false);
        expect(isFloat('2.4')).toBe(false);
    })
});
