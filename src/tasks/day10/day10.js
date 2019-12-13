import { map, split, trim, fill, reject, some, sortBy, every, last, filter, find, isEqual, isEmpty } from 'lodash';
import { Segment, Point } from '@flatten-js/core';

import input from './input.txt';

export const getMatrix = input => map(
    split(trim(input), '\n'),
    row => map(
        split(trim(row), ''),
        element => element === '.' ? 0 : 1
    )
);

export const getAsteroids = matrix => {
    const height = matrix.length;
    const width = matrix[0].length;

    const coordinates = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (matrix[y][x]) {
                coordinates.push([x, y]);
            }
        }
    }

    return coordinates;
};

export const getWeights = matrix => {
    const height = matrix.length;
    const width = matrix[0].length;

    const weights = map(new Array(height), () => fill(new Array(width), 0));

    const asteroids = getAsteroids(matrix);

    for (let i = 0; i < asteroids.length; i++) {
        const [ax, ay] = asteroids[i];
        const otherAsteroids = reject(asteroids, ([x, y]) => x === ax && y === ay);

        for (let j = 0; j < otherAsteroids.length; j++) {
            const [oax, oay] = otherAsteroids[j];
            const segment = new Segment(ax, ay, oax, oay);

            if (
                some(
                    reject(otherAsteroids, ([x, y]) => x === oax && y === oay),
                    ([px, py]) => segment.contains(new Point(px, py))
                )
            ) {
                continue;
            }

            weights[ay][ax]++;
        }
    }

    return weights;
};

export const getBestLocation = weights => {
    const height = weights.length;
    const width = weights[0].length;

    let location = [[0, 0], 0];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (weights[y][x] > location[1]) {
                location = [[x, y], weights[y][x]];
            }
        }
    }

    return location;
};

export const sortAsteroidsByAngle = (asteroids, [x, y]) => map(
    sortBy(
        map(
            reject(asteroids, ([ax, ay]) => x === ax && y === ay),
            ([ax, ay]) => ({
                x: ax,
                y: ay,
                // NOTE: using flatten-js gives wrong pt. 2 answer T_T; let's use common Math
                angle: Math.PI - Math.atan2(ax - x, ay - y), // NOTE: use atan2(x,y) not atan2(y,x) 'cause we have flipped XOY
                distance: Math.sqrt(Math.pow(ay - y, 2) + Math.pow(ax - x, 2)),
            })
        ),
        ['angle', 'distance']
    ),
    ({ x, y, angle, distance }) => [x, y, angle, distance]
);

export const vaporizeAsteroids = (sortedAsteroids, result = []) => {
    if (isEmpty(sortedAsteroids)) {
        return map(result, ([x, y]) => ([x, y]));
    }

    if (every(sortedAsteroids, asteroid => asteroid[2] === sortedAsteroids[0][2])) {
        result.push(...sortedAsteroids);
    } else {
        for (let i = 0; i < sortedAsteroids.length; i++) {
            if (
                !last(result) ||
                last(result)[2] !== sortedAsteroids[i][2]
            ) {
                result.push(sortedAsteroids[i]);
            }
        }
    }

    return vaporizeAsteroids(
        filter(sortedAsteroids, a => !find(result, b => isEqual(a ,b))),
        result
    );
};

export default {
    day: 10,
    input,
    title: 'Monitoring Station',
    answers: [
        () => {
            const [[x, y], n] = getBestLocation(getWeights(getMatrix(input)));

            return `[${x}, ${y}], ${n}`;
        },
        () => {
            const location = [37, 25]; // NOTE: get from pt. 1
            const vaporizedAsteroids = vaporizeAsteroids(sortAsteroidsByAngle(getAsteroids(getMatrix(input)), location));

            return vaporizedAsteroids[199][0] * 100 + vaporizedAsteroids[199][1];
        }
    ]
};