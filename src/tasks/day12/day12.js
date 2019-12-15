import { map, split, trim, cloneDeep, sumBy } from 'lodash';
import input from './input.txt';

const NUMBER_OF_MOONS = 4;
const NUMBER_OF_DIMENSIONS = 3;

export const getInitPositions = input => map(
    split(trim(input), '\n'),
    row => row.match(/-?\d+/g).map(s => +s)
);

export const applyGravity = (pos, vel) => {
    const newVel = cloneDeep(vel);

    for (let d = 0; d < NUMBER_OF_DIMENSIONS; d++) {
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

export const applyVelocity = (pos, vel) => {
    const newPos = cloneDeep(pos);

    for (let d = 0; d < NUMBER_OF_DIMENSIONS; d++) {
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
        }
    ]
};