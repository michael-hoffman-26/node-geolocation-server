import { formatCities } from "../common/cityDistance";
import { CitiesDistance } from "../models/cityDistance";

const mockDataUnOrdered = {
    biggerCityName: "ramat gan",
    smallerCityName: "bney brak",
};

const mockFormattedCities: CitiesDistance = {
    source: mockDataUnOrdered.smallerCityName,
    destination: mockDataUnOrdered.biggerCityName,
};

describe("Check the formate cities function", () => {
    it("should return CitiesDistance obj, and the source is smaller than the destination alphabetically, when passing bigger source", () => {
        const formattedCities: CitiesDistance = formatCities(
            mockDataUnOrdered.biggerCityName,
            mockDataUnOrdered.smallerCityName
        );

        expect(JSON.stringify(formattedCities)).toBe(
            JSON.stringify(mockFormattedCities)
        );
    }),

        it("should return CitiesDistance obj, and the source is smaller than the destination alphabetically, when passing bigger destination", () => {
            const formattedCities: CitiesDistance = formatCities(
                mockDataUnOrdered.smallerCityName,
                mockDataUnOrdered.biggerCityName
            );

            expect(JSON.stringify(formattedCities)).toBe(
                JSON.stringify(mockFormattedCities)
            );
        })
});
