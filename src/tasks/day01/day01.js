import { map, split, trim, floor, reduce } from 'lodash';

import input from './input.txt';

export const getMasses = input => map(split(trim(input), '\n'), mass => +mass);

export const getFuel = (mass, withAdditionalFuel = false) => {
    const fuel = floor(mass / 3) - 2;

    if (withAdditionalFuel) {
        if (fuel <= 0) {
            return 0;
        } else {
            return fuel + getFuel(fuel, true);
        }
    } else {
        return fuel;
    }
};

export const getTotalFuel = (masses, withAdditionalFuel = false) =>
    reduce(masses, (totalFuel, mass) => totalFuel + getFuel(mass, withAdditionalFuel), 0);

export default {
    day: 1,
    title: 'The Tyranny of the Rocket Equation',
    input,
    answer1: () => getTotalFuel(getMasses(input)),
    answer2: () => getTotalFuel(getMasses(input), true)
};