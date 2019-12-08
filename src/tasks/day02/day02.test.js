import { getArray, opcode1, opcode2, run } from './day02';

test('get array', () => {
    const input = `
    1,2,3,4
   `;
    expect(getArray(input)).toStrictEqual([1,12,2,4]);
});

test('opcode 1', () => {
    expect(opcode1([1,0,0,0,99])).toStrictEqual([2,0,0,0,99]);
});

test('opcode 2', () => {
    expect(opcode2([2,3,0,3,99])).toStrictEqual([2,3,0,6,99]);
    expect(opcode2([2,4,4,5,99,0])).toStrictEqual([2,4,4,5,99,9801]);
});

test('run', () => {
    expect(run([1,0,0,0,99])).toStrictEqual([2,0,0,0,99]);
    expect(run([2,3,0,3,99])).toStrictEqual([2,3,0,6,99]);
    expect(run([2,4,4,5,99,0])).toStrictEqual([2,4,4,5,99,9801]);
    expect(run([1,1,1,4,99,5,6,0,99])).toStrictEqual([30,1,1,4,2,5,6,0,99]);
});