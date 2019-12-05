import { getSegment, getSegments, getSegmentsIntersection, getDistance } from './day03';

test('get segment', () => {
    expect(getSegment([0,0], 'U10')).toStrictEqual([[0,0], [0,10]]);
    expect(getSegment([0,0], 'R10')).toStrictEqual([[0,0], [10,0]]);
    expect(getSegment([0,0], 'D10')).toStrictEqual([[0,0], [0,-10]]);
    expect(getSegment([0,0], 'L10')).toStrictEqual([[0,0], [-10,0]]);
});

test('get segments', () => {
    const input = `
    R8,U5,L5,D3
    U7,R6,D4,L4
    `;
    expect(getSegments(input)).toStrictEqual([
        [
            [[0,0], [8,0]],
            [[8,0], [8,5]],
            [[8,5], [3,5]],
            [[3,5], [3,2]]
        ],
        [
            [[0,0], [0,7]],
            [[0,7], [6,7]],
            [[6,7], [6,3]],
            [[6,3], [2,3]]
        ]
    ]);
});

test('get segments intersection', () => {
    expect(getSegmentsIntersection(
        [
            [[0,0], [20,0]],
            [[10,20], [10,40]]
        ]
    )).toBeNull();
    expect(getSegmentsIntersection(
        [
            [[0,0], [20,0]],
            [[10,-20], [10,20]]
        ]
    )).toStrictEqual([10, 0]);
});

test('get distance', () => {
    let input;

    input = `
    R75,D30,R83,U83,L12,D49,R71,U7,L72
    U62,R66,U55,R34,D71,R55,D58,R83
    `;
    expect(getDistance(input)).toBe(159);

    input = `
    R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
    U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
    `;
    expect(getDistance(input)).toBe(135);
});