import { map, split, trim, padStart, reverse, last } from 'lodash';

import puzzleInput from './input.txt';

export const getArray = input => map(split(trim(input), ','), element => +element);

export const parseParameters = parameters => {
    const s = padStart(parameters, 5, '0');

    return [
        +s.slice(-2),
        map(reverse(s.slice(0, -2).split('')), element => +element)
    ];
};

export const opcode1 = (array = [], modes = [0,0], pointer = 0) => {
    const a = [...array];
    const x = modes[0] ? a[pointer + 1] : a[a[pointer + 1]];
    const y = modes[1] ? a[pointer + 2] : a[a[pointer + 2]];
    const p = pointer + 3;

    a[a[p]] = x + y;

    return [a, p];
};

export const opcode2 = (array = [], modes = [0,0], pointer = 0) => {
    const a = [...array];
    const x = modes[0] ? a[pointer + 1] : a[a[pointer + 1]];
    const y = modes[1] ? a[pointer + 2] : a[a[pointer + 2]];
    const p = pointer + 3;

    a[a[p]] = x * y;

    return [a, p];
};

export const opcode3 = (array = [], input, pointer = 0) => {
    const a = [...array];
    const p = pointer + 1;

    a[a[p]] = input;

    return [a, p];
};

export const opcode4 = (array = [], pointer = 0) => {
    const a = [...array];
    const p = pointer + 1;
    const output = a[a[p]];

    return [output, p];
};

export const run = (array = [], input) => {
    let a = [...array];
    let pointer = 0;
    let outputs = [];

    for (; pointer < a.length; pointer++) {
        const [ opcode, modes ] = parseParameters(a[pointer]);

        if (opcode === 1) {
            [a, pointer] = opcode1(a, modes, pointer);
        }

        else if (opcode === 2) {
            [a, pointer] = opcode2(a, modes, pointer);
        }

        else if (opcode === 3) {
            [a, pointer] = opcode3(a, input, pointer);
        }

        else if (opcode === 4) {
            let output;
            [output, pointer] = opcode4(a, pointer);
            outputs.push(output);
        }

        else if (opcode === 99) {
            break;
        }
    }

    return [a, outputs];
};

export default {
    day: 5,
    title: 'Sunny with a Chance of Asteroids',
    input: puzzleInput,
    answer1: () => {
        const array = getArray(getArray(puzzleInput));
        const input = 1;

        const [a, outputs] = run(array, input);

        console.log('ID of the system to test: ', input);
        console.log('tests outputs: ', outputs);

        console.log('original program\'s array', array);
        console.log('program\'s array after execution: ', a);

        return last(outputs);
    },
    answer2: () => '-'
};