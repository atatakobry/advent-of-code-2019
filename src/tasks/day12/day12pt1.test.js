import { getInitPositions, applyGravity, applyVelocity, simulateMotion, getTotalEnergy } from './day12';

test('get init positions', () => {
    let input;

    input = `
    <x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>
    `;
    expect(getInitPositions(input)).toStrictEqual([
        [ -1, 0, 2 ],
        [ 2, -10, -7 ],
        [ 4, -8, 8 ],
        [ 3, 5, -1 ]
    ]);

    input = `
    <x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>
    `;
    expect(getInitPositions(input)).toStrictEqual([
        [ -8, -10, 0 ],
        [ 5, 5, 10 ],
        [ 2, -7, 3 ],
        [ 9, -8, -3 ]
    ]);
});

test('apply gravity', () => {
    const pos = [
        [ -1, 0, 2 ],
        [ 2, -10, -7 ],
        [ 4, -8, 8 ],
        [ 3, 5, -1 ]
    ];
    const vel = [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ]
    ];
    expect(applyGravity(pos, vel)).toStrictEqual([
        [ 3, -1, -1 ],
        [ 1, 3, 3 ],
        [ -3, 1, -3 ],
        [ -1, -3, 1 ]
    ]);
});

test('apply velocity', () => {
    const pos = [
        [ -1, 0, 2 ],
        [ 2, -10, -7 ],
        [ 4, -8, 8 ],
        [ 3, 5, -1 ]
    ];
    const vel = [
        [ 3, -1, -1 ],
        [ 1, 3, 3 ],
        [ -3, 1, -3 ],
        [ -1, -3, 1 ]
    ];
    expect(applyVelocity(pos, vel)).toStrictEqual([
        [ 2, -1, 1 ],
        [ 3, -7, -4 ],
        [ 1, -7, 5 ],
        [ 2, 2, 0 ]
    ]);
});

test('simulate motion', () => {
    const pos = [
        [ -1, 0, 2 ],
        [ 2, -10, -7 ],
        [ 4, -8, 8 ],
        [ 3, 5, -1 ]
    ];
    const vel = [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ]
    ];
    const steps = simulateMotion(pos, vel, 10);
    expect(steps[0]).toStrictEqual({
        pos: [[ 2, -1, 1 ], [ 3, -7, -4 ], [ 1, -7, 5 ], [ 2, 2, 0 ]],
        vel: [[ 3, -1, -1 ], [ 1, 3, 3 ], [ -3, 1, -3 ], [ -1, -3, 1 ]]
    });
    expect(steps[1]).toStrictEqual({
        pos: [[ 5, -3, -1 ], [ 1, -2, 2 ], [ 1, -4, -1 ], [ 1, -4, 2 ]],
        vel: [[ 3, -2, -2 ], [ -2, 5, 6 ], [ 0, 3, -6 ], [ -1, -6, 2 ]]
    });
    expect(steps[2]).toStrictEqual({
        pos: [[ 5, -6, -1 ], [ 0, 0, 6 ], [ 2, 1, -5 ], [ 1, -8, 2 ]],
        vel: [[ 0, -3, 0 ], [ -1, 2, 4 ], [ 1, 5, -4 ], [ 0, -4, 0 ]],
    });
    expect(steps[3]).toStrictEqual({
        pos: [[ 2, -8, 0 ], [ 2, 1, 7 ], [ 2, 3, -6 ], [ 2, -9, 1 ]],
        vel: [[ -3, -2, 1 ], [ 2, 1, 1 ], [ 0, 2, -1 ], [ 1, -1, -1 ]],
    });
});

test('get total energy', () => {
    let pos;
    let vel;
    let steps;

    pos = [
        [ -1, 0, 2 ],
        [ 2, -10, -7 ],
        [ 4, -8, 8 ],
        [ 3, 5, -1 ]
    ];
    vel = [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ]
    ];
    steps = simulateMotion(pos, vel, 10);
    expect(getTotalEnergy(steps[9])).toBe(179);

    pos = [
        [ -8, -10, 0 ],
        [ 5, 5, 10 ],
        [ 2, -7, 3 ],
        [ 9, -8, -3 ]
    ];
    vel = [
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ]
    ];
    steps = simulateMotion(pos, vel, 100);
    expect(steps[99]).toStrictEqual({
        pos: [[ 8, -12, -9 ], [ 13, 16, -3 ], [ -29, -11, -1 ], [ 16, -13, 23 ]],
        vel: [[ -7, 3, 0], [ 3, -11, -5], [ -3, 7, 4 ], [ 7, 1, 1 ]]
    });
    expect(getTotalEnergy(steps[99])).toBe(1940);
});