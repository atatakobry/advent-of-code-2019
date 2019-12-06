import { map, split, trim } from 'lodash';

import input from './input.txt';

const NUMBER_OF_VALUES = 4;

export const getArray = (input, noun = 12, verb = 2) => {
    const array = map(split(trim(input), ','), element => +element);

    array[1] = noun;
    array[2] = verb;

    return array;
};

export const opcode1 = (array = [], pointer = 0) => {
    array[array[pointer + 3]] = array[array[pointer + 1]] + array[array[pointer + 2]];

    return array;
};

export const opcode2 = (array = [], pointer = 0) => {
    array[array[pointer + 3]] = array[array[pointer + 1]] * array[array[pointer + 2]];

    return array;
};

export const run = (array = []) => {
    for (let pointer = 0; pointer < array.length; pointer++) {
        const opcode = array[pointer];

        if (opcode === 1) {
            opcode1(array, pointer);
            pointer += NUMBER_OF_VALUES - 1;
        }

        else if (opcode === 2) {
            opcode2(array, pointer);
            pointer += NUMBER_OF_VALUES - 1;
        }

        else if (opcode === 99) {
            return array;
        }
    }

    return array;
};

export default {
    input,
    answer1: () => run(getArray(input))[0],
    answer2: () => {
        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {
                if (19690720 === run(getArray(input, noun, verb))[0]) {
                    return 100 * noun + verb;
                }
            }
        }

        return;
    }
};