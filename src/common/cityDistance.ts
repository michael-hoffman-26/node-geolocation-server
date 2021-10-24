import { CitiesDistance } from "modles/cityDistance";

export const formatCities = (source: string, destination: string): CitiesDistance => {
    const isSourceSmaller = source.localeCompare(destination) === -1;

    const cityDistance = {}
    if (isSourceSmaller) {
        (cityDistance as CitiesDistance).source = source;
        (cityDistance as CitiesDistance).destination = destination;
    } else {
        (cityDistance as CitiesDistance).source = destination;
        (cityDistance as CitiesDistance).destination = source;
    }

    return (cityDistance as CitiesDistance);
}