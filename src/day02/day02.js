import { map, split, trim } from 'lodash';

import input from './input.txt';

export const getArray = input => {
    const array = map(split(trim(input), ','), element => +element);

    array[1] = 12;
    array[2] = 2;

    return array;
};

export const opcode1 = (array = [], offset = 0) => {
    array[array[3 + offset]] = array[array[1 + offset]] + array[array[2 + offset]];

    return array;
};

export const opcode2 = (array = [], offset = 0) => {
    array[array[3 + offset]] = array[array[1 + offset]] * array[array[2 + offset]];

    return array;
};

export const run = (array = []) => {
    for(let i = 0; i < array.length; i++) {
        if (array[i] === 1) {
            opcode1(array, i);
            i += 3;
        }

        else if (array[i] === 2) {
            opcode2(array, i);
            i += 3;
        }

        else if (array[i] === 99) {
            return array;
        }
    }

    return array;
};

export default {
    answer: () => run(getArray(input))[0]
}