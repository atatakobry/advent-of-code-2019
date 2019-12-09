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
});