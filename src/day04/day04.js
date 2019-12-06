import { map, split, trim } from 'lodash';

import input from './input.txt';

export const areAdjacentDigitsSame = n => {
    const s = '' + n;

    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === s[i+1]) {
            return true;
        }
    }

    return false;
};

export const areDigitsNeverDecrease = n => {
    const s = '' + n;

    for (let i = 0; i < s.length - 1; i++) {
        if (+s[i] > +s[i+1]) {
            return false;
        }
    }

    return true;
};

export const getRange = input => map(split(trim(input), '-'), n => +n);

export const countPasswords = ([min, max]) => {
    let count = 0;

    for (let n = min; n <= max; n++) {
        if (areAdjacentDigitsSame(n) && areDigitsNeverDecrease(n)) {
            count++;
        }
    }

    return count;
};

export default {
    input,
    answer1: () => countPasswords(getRange(input)),
    answer2: () => '-'
};