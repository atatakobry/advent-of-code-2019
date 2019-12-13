import { map, split, padStart, some, uniq, last, maxBy } from 'lodash';

import { getArray, run } from '../day05/day05';

import input from './input.txt';

const NUMBER_OF_AMPLIFIERS = 5;
const MAX = 43210;

export const getMaxSignal = (array = [], input) => {
    const options = [];
    const results = [];

    results[0] = input;

    for (let d = 0; d <= MAX; d++) {
        const sequence = map(split(padStart('' + d, NUMBER_OF_AMPLIFIERS, '0'), ''), s => +s);

        if (some(sequence, digit => digit > NUMBER_OF_AMPLIFIERS - 1) || uniq(sequence).length !== NUMBER_OF_AMPLIFIERS) {
            continue;
        }

        for (let i = 0; i < NUMBER_OF_AMPLIFIERS; i++) {
            const [, [input]] = run(array, [sequence[i], results[i]]);

            results[i + 1] = input;
        }

        options.push({ sequence, output: last(results) });
    }

    return maxBy(options, ({ output }) => output);
};

export default {
    day: 7,
    title: 'Amplification Circuit',
    input,
    answers: [
        () => {
            const array = getArray(input);
            const { output } = getMaxSignal(array, 0);

            return output;
        }
    ]
};