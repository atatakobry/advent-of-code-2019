import { map, split, padStart, some, uniq, last, maxBy } from 'lodash';

import { getArray, run } from '../day05/day05';

import input from './input.txt';

const NUMBER_OF_AMPLIFIERS = 5;

export const getMaxSignal = (array = []) => {
    const options = [];
    const results = [];

    const [ from, to ] = [1234, 43210];
    const wrongRangePredicate = digit => digit < 0 || digit > 4;
    const areDigitsUniq = sequence => uniq(sequence).length !== NUMBER_OF_AMPLIFIERS;

    for (let n = from; n <= to; n++) {
        const inputs = [[0], [], [], [], []];
        const sequence = map(split(padStart('' + n, NUMBER_OF_AMPLIFIERS, '0'), ''), s => +s);

        if (some(sequence, wrongRangePredicate) || areDigitsUniq(sequence)) {
            continue;
        }

        for (let i = 0; i < NUMBER_OF_AMPLIFIERS; i++) {
            inputs[i] = [sequence[i], ...inputs[i]];

            const [, [output]] = run(array, inputs[i]);

            if (i !== NUMBER_OF_AMPLIFIERS - 1) {
                inputs[i + 1].push(output);
            }

            results[i] = output;
        }

        options.push({ sequence, output: last(results) });
    }

    return maxBy(options, ({ output }) => output) || {};
};

export default {
    day: 7,
    title: 'Amplification Circuit',
    input,
    answer1: () => {
        const array = getArray(input);
        const { output } = getMaxSignal(array);

        return output;
    },
    answer2: () => '-'
};