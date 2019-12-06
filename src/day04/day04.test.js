import { areAdjacentDigitsSame, areDigitsNeverDecrease, getRange } from './day04';

test('are adjacent digits same', () => {
    expect(areAdjacentDigitsSame(123456)).toBeFalsy();
    expect(areAdjacentDigitsSame(123123)).toBeFalsy();
    expect(areAdjacentDigitsSame(123789)).toBeFalsy();
    expect(areAdjacentDigitsSame(111111)).toBeTruthy();
    expect(areAdjacentDigitsSame(112233)).toBeTruthy();
    expect(areAdjacentDigitsSame(122345)).toBeTruthy();
    expect(areAdjacentDigitsSame(123455)).toBeTruthy();
});

test('are digits never decrease', () => {
    expect(areDigitsNeverDecrease(654321)).toBeFalsy();
    expect(areDigitsNeverDecrease(223450)).toBeFalsy();
    expect(areDigitsNeverDecrease(123454)).toBeFalsy();
    expect(areDigitsNeverDecrease(111111)).toBeTruthy();
    expect(areDigitsNeverDecrease(111123)).toBeTruthy();
    expect(areDigitsNeverDecrease(112233)).toBeTruthy();
    expect(areDigitsNeverDecrease(135679)).toBeTruthy();
});

test('get range', () => {
    const input = `
    123-456
    `;
    expect(getRange(input)).toStrictEqual([123, 456]);
});