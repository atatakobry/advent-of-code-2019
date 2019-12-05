import { map, split, trim, floor, reduce } from 'lodash';

import input from './input.txt';

export const getMasses = input => map(split(trim(input), '\n'), mass => +mass);

export const getFuel = mass => (floor(mass / 3) - 2);

export const getTotalFuel = masses => reduce(masses, (totalFuel, mass) => totalFuel + getFuel(mass), 0);

export default {
    answer: () => getTotalFuel(getMasses(input))
}