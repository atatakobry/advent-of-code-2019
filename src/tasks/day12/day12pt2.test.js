import { getNumberOfLoopSteps } from './day12';

test('how many steps does it take to reach the first state that exactly matches a previous state?', () => {
    let pos;
    let vel;

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
    expect(getNumberOfLoopSteps(pos, vel)).toBe(2772);

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
    expect(getNumberOfLoopSteps(pos, vel)).toBe(4686774924);
});
