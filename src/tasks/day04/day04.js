import { map, split, trim, some } from 'lodash';

import input from './input.txt';

export const areAdjacentDigitsSame = (n, hasMoreStrictCondition = false) => {
    const s = '' + n;

    let parts = [];

    for (let i = 0; i < s.length - 1; i++) {
        if (!hasMoreStrictCondition) {
            if (+s[i] === +s[i+1]) {
                return true;
            }
        } else {
            let part = s[i];

            for (let j = i + 1; j < s.length; j++) {
                if (+s[i] === +s[j]) {
                    part += s[i];
                    i++;
                } else {
                    break;
                }
            }

            if (part.length > 1) {
                parts.push(part);
            }
        }
    }

    return hasMoreStrictCondition && some(parts, part => part.length === 2);
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

export const countPasswords = ([min, max], hasMoreStrictCondition) => {
    let count = 0;

    for (let n = min; n <= max; n++) {
        if (areAdjacentDigitsSame(n, hasMoreStrictCondition) && areDigitsNeverDecrease(n)) {
            count++;
        }
    }

    return count;
};

export default {
    day: 4,
    title: 'Secure Container',
    input,
    answer1: () => countPasswords(getRange(input)),
    answer2: () => countPasswords(getRange(input), true)
};