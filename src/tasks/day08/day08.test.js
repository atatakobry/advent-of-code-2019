import { getLayers, getImage, getNumberOf, getNecessaryLayer } from './day08';

test('get layers', () => {
    const input = `
    123456789012
    `;
    expect(getLayers(input, 3, 2)).toStrictEqual([
        [[1,2,3], [4,5,6]],
        [[7,8,9], [0,1,2]]
    ]);
});

test('get image', () => {
    const layers = [
        [[1,2,3], [4,5,6]],
        [[7,8,9], [0,1,2]]
    ];
    expect(getImage(layers)).toBe('123456789012');
});

test('get number of', () => {
    expect(getNumberOf([[1,2,3], [0,1,2]], 4)).toBe(0);
    expect(getNumberOf([[1,2,3], [0,1,2]], 3)).toBe(1);
    expect(getNumberOf([[1,2,3], [0,1,2]], 1)).toBe(2);
});

test('get necessary layer', () => {
    const layers = [
        [[1,2,3], [4,5,6]],
        [[7,8,9], [0,1,2]]
    ];
    expect(getNecessaryLayer(layers)).toStrictEqual([[1,2,3], [4,5,6]]);
});