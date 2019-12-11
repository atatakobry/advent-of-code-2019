import { getArray } from '../day05/day05';
import { getMaxSignal } from './day07';

test('get max signal', () => {
    let input;
    let array;

    input = `
    3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0
    `;
    array = getArray(input);
    expect(getMaxSignal(array)).toStrictEqual({
        sequence: [4,3,2,1,0],
        output: 43210
    });

    input = `
    3,23,3,24,1002,24,10,24,1002,23,-1,23,
    101,5,23,23,1,24,23,23,4,23,99,0,0
    `;
    array = getArray(input);
    expect(getMaxSignal(array)).toStrictEqual({
        sequence: [0,1,2,3,4],
        output: 54321
    });

    input = `
    3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
    1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0
    `;
    array = getArray(input);
    expect(getMaxSignal(array)).toStrictEqual({
        sequence: [1,0,4,3,2],
        output: 65210
    });
});