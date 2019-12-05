import { getMasses, getFuel, getTotalFuel } from './day01';

test('get masses', () => {
    const input = `
    1
    2
    3
    `;
    expect(getMasses(input)).toStrictEqual([1, 2, 3]);
});

test('get fuel', () => {
    expect(getFuel(12)).toBe(2);
    expect(getFuel(14)).toBe(2);
    expect(getFuel(1969)).toBe(654);
    expect(getFuel(100756)).toBe(33583);
});

test('get total fuel', () => {
    expect(getTotalFuel([12, 14, 1969, 100756])).toBe(2 + 2 + 654 + 33583);
});