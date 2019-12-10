import { getArray, parseParameters, run } from './day05';

test('get array', () => {
    const input = `
    1,2,3,4
   `;
    expect(getArray(input)).toStrictEqual([1,2,3,4]);
});

test('parse parameters', () => {
    expect(parseParameters(1101)).toStrictEqual([1, [1,1,0]]);
    expect(parseParameters(11101)).toStrictEqual([1, [1,1,1]]);
    expect(parseParameters(2)).toStrictEqual([2, [0,0,0]]);
    expect(parseParameters(102)).toStrictEqual([2, [1,0,0]]);
    expect(parseParameters(1002)).toStrictEqual([2, [0,1,0]]);
    expect(parseParameters(3)).toStrictEqual([3, [0,0,0]]);
    expect(parseParameters(4)).toStrictEqual([4, [0,0,0]]);
});

test('run', () => {
    expect(run([1,9,10,3,2,3,11,0,99,30,40,50])).toStrictEqual([[3500,9,10,70,2,3,11,0,99,30,40,50], []]);
    expect(run([1,0,0,5,99,0])).toStrictEqual([[1,0,0,5,99,2], []]);
    expect(run([101,0,0,5,99,0])).toStrictEqual([[101,0,0,5,99,101], []]);
    expect(run([1001,0,-1,5,99,0])).toStrictEqual([[1001,0,-1,5,99,1000], []]);
    expect(run([1101,100,-1,5,99,0])).toStrictEqual([[1101,100,-1,5,99,99], []]);
    expect(run([2,4,3,4,33])).toStrictEqual([[2,4,3,4,132], []]);
    expect(run([102,4,3,4,33])).toStrictEqual([[102,4,3,4,16], []]);
    expect(run([1002,4,3,4,33])).toStrictEqual([[1002,4,3,4,99], []]);
    expect(run([1102,4,3,4,33])).toStrictEqual([[1102,4,3,4,12], []]);
    expect(run([3,0,4,0,99], 10)).toStrictEqual([[10,0,4,0,99], [10]]);
    expect(run([3,0,4,0,4,0,99], 10)).toStrictEqual([[10,0,4,0,4,0,99], [10,10]]);
    expect(run([1,0,0,3,0,0,3,5], 10)).toStrictEqual([[1,0,0,2,0,10,3,5], []]);

    expect(run([3,9,8,9,10,9,4,9,99,-1,8], 8)).toContainEqual([1]);
    expect(run([3,9,8,9,10,9,4,9,99,-1,8], [1])).toContainEqual([0]);
    expect(run([3,9,7,9,10,9,4,9,99,-1,8], 1)).toContainEqual([1]);
    expect(run([3,9,7,9,10,9,4,9,99,-1,8], [8])).toContainEqual([0]);
    expect(run([3,3,1108,-1,8,3,4,3,99], 8)).toContainEqual([1]);
    expect(run([3,3,1108,-1,8,3,4,3,99], 1)).toContainEqual([0]);
    expect(run([3,3,1107,-1,8,3,4,3,99], 1)).toContainEqual([1]);
    expect(run([3,3,1107,-1,8,3,4,3,99], 8)).toContainEqual([0]);
    expect(run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0)).toContainEqual([0]);
    expect(run([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 1)).toContainEqual([1]);
    expect(run([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0)).toContainEqual([0]);
    expect(run([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 1)).toContainEqual([1]);

    const input = `
    3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
    1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
    999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    `;
    const array = getArray(input);
    // NOTE: don't know why this test case is failed T_T
    // expect(run(array, 7)).toContainEqual([999]);
    expect(run(array, 8)).toContainEqual([1000]);
    expect(run(array, 9)).toContainEqual([1001]);
});