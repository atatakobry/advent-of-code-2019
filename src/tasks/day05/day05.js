import { map, split, trim, padStart, reverse, last, isEmpty } from 'lodash';

import input from './input.txt';

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
    const p = pointer + 1;

    return [array[array[p]], p];
};

export const opcode5 = (array = [], modes = [0,0], pointer = 0) => {
    const x = modes[0] ? array[pointer + 1] : array[array[pointer + 1]];
    const y = modes[1] ? array[pointer + 2] : array[array[pointer + 2]];

    return x !== 0 ? y - 1 : pointer + 2;
};

export const opcode6 = (array = [], modes = [0,0], pointer = 0) => {
    const x = modes[0] ? array[pointer + 1] : array[array[pointer + 1]];
    const y = modes[1] ? array[pointer + 2] : array[array[pointer + 2]];

    return x === 0 ? y - 1 : pointer + 2;
};

export const opcode7 = (array = [], modes = [0,0], pointer = 0) => {
    const a = [...array];
    const x = modes[0] ? a[pointer + 1] : a[a[pointer + 1]];
    const y = modes[1] ? a[pointer + 2] : a[a[pointer + 2]];
    const p = pointer + 3;

    a[a[p]] = x < y ? 1 : 0;

    return [a, p];
};

export const opcode8 = (array = [], modes = [0,0], pointer = 0) => {
    const a = [...array];
    const x = modes[0] ? a[pointer + 1] : a[a[pointer + 1]];
    const y = modes[1] ? a[pointer + 2] : a[a[pointer + 2]];
    const p = pointer + 3;

    a[a[p]] = x === y ? 1 : 0;

    return [a, p];
};

export const run = (array = [], inputs = []) => {
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
            if (isEmpty(inputs)) {
                console.warn('unfortunately, input\'s stream is empty, program will be closed...');
                break;
            }

            [a, pointer] = opcode3(a, inputs.shift(), pointer);
        }

        else if (opcode === 4) {
            let output;

            [output, pointer] = opcode4(a, pointer);

            outputs.push(output);
        }

        else if (opcode === 5) {
            pointer = opcode5(a, modes, pointer);
        }

        else if (opcode === 6) {
            pointer = opcode6(a, modes, pointer);
        }

        else if (opcode === 7) {
            [a, pointer] = opcode7(a, modes, pointer);
        }

        else if (opcode === 8) {
            [a, pointer] = opcode8(a, modes, pointer);
        }

        else if (opcode === 99) {
            break;
        }
    }

    return [a, outputs];
};

const answer = id => {
    const array = getArray(getArray(input));
    const [, outputs] = run(array, [id]);

    return last(outputs);
};

export default {
    day: 5,
    title: 'Sunny with a Chance of Asteroids',
    input,
    answer1: () => answer(1),
    answer2: () => answer(5)
};