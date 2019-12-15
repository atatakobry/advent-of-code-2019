import { map, split, trim, cloneDeep, sumBy, isEqual } from 'lodash';
import { lcm } from 'mathjs';

import input from './input.txt';

const NUMBER_OF_MOONS = 4;
const NUMBER_OF_DIMENSIONS = 3;

export const getInitPositions = input => map(
    split(trim(input), '\n'),
    row => row.match(/-?\d+/g).map(s => +s)
);

export const applyGravity = (pos, vel, numberOfDimensions = NUMBER_OF_DIMENSIONS) => {
    const newVel = cloneDeep(vel);

    for (let d = 0; d < numberOfDimensions; d++) {
        for (let i = 0; i < NUMBER_OF_MOONS; i++) {
            for ( let j = i; j < NUMBER_OF_MOONS; j++) {
                if (pos[i][d] < pos[j][d]) {
                    newVel[i][d] += 1;
                    newVel[j][d] -= 1;
                }
                else if (pos[i][d] > pos[j][d]) {
                    newVel[i][d] -= 1;
                    newVel[j][d] += 1;
                }
            }
        }
    }

    return newVel;
};

export const applyVelocity = (pos, vel, numberOfDimensions = NUMBER_OF_DIMENSIONS) => {
    const newPos = cloneDeep(pos);

    for (let d = 0; d < numberOfDimensions; d++) {
        for (let i = 0; i < NUMBER_OF_MOONS; i++) {
            newPos[i][d] += vel[i][d];
        }
    }

    return newPos;
};

export const simulateMotion = (pos, vel, numberOfSteps) => {
    const steps = [];

    let newPos = cloneDeep(pos);
    let newVel = cloneDeep(vel);

    for (let n = 0; n < numberOfSteps; n++) {
        newVel = applyGravity(newPos, newVel);
        newPos = applyVelocity(newPos, newVel);

        steps.push({ pos: newPos, vel: newVel });
    }

    return steps;
};

const getEnergy = array => sumBy(array, element => Math.abs(element));

export const getTotalEnergy = step => {
    let totalEnergy = 0;

    for (let i = 0; i < NUMBER_OF_MOONS; i++) {
        totalEnergy += getEnergy(step.pos[i]) * getEnergy(step.vel[i]);
    }

    return totalEnergy;
};

export const getNumberOfLoopSteps = (pos, vel) => {
    const steps = [];

    for (let d = 0; d < NUMBER_OF_DIMENSIONS; d++) {
        let pos1D = map(pos, p => [p[d]]);
        let vel1D = map(vel, v => [v[d]]);

        let newPos1D = [ ...pos1D ];
        let newVel1D = [ ...vel1D ];

        for (let n = 0; ; n++) {
            newVel1D = applyGravity(newPos1D, newVel1D, 1);
            newPos1D = applyVelocity(newPos1D, newVel1D, 1);

            if (isEqual(pos1D, newPos1D) && isEqual(vel1D, newVel1D)) {
                steps.push(n + 1);
                break;
            }
        }
    }

    return lcm(...steps);
};

export default {
    day: 12,
    input,
    title: 'The N-Body Problem',
    answers: [
        () => {
            const pos = getInitPositions(input);
            const vel = [
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ]
            ];
            const steps = simulateMotion(pos, vel, 1000);

            return getTotalEnergy(steps[999]);
        },
        () => {
            const pos = getInitPositions(input);
            const vel = [
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ]
            ];

            return getNumberOfLoopSteps(pos, vel);
        }
    ]
};