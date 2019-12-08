import { map, split, trim, reduce, minBy, isEmpty } from 'lodash';
import { Segment } from '@flatten-js/core';

import input from './input.txt';

export const getSegment = (point1, command) => {
    const point2 = [ ...point1 ];
    const direction = command.slice(0, 1);
    const offset = +command.slice(1);

    if (direction === 'U') {
        point2[1] += +offset;
    }

    else if (direction === 'R') {
        point2[0] += +offset;
    }

    else if (direction === 'D') {
        point2[1] -= +offset;
    }

    else if (direction === 'L') {
        point2[0] -= +offset;
    }

    return [
        point1,
        point2,
        new Segment(...point1, ...point2).length
    ];
};

export const getSegments = input => {
    const lines = map(split(trim(input), '\n'), line => split(trim(line), ','));

    return map(lines, line => {
        return reduce(line, (segments, command, index) => {
            const prevSegment = segments[index - 1] || [[0,0], [0,0], 0];
            const segment = getSegment(prevSegment[1], command);

            segments.push(segment);

            return segments;
        }, []);
    });
};

export const getSegmentsIntersection = ([[[x1,y1], [x2,y2]], [[x3,y3], [x4,y4]]]) => {
    const segment1 = new Segment(x1, y1, x2, y2);
    const segment2 = new Segment(x3, y3, x4, y4);
    const intersection = segment1.intersect(segment2);

    return isEmpty(intersection) ?
        null :
        [
            intersection[0].x,
            intersection[0].y,
            [
                new Segment(segment1.pe.x, segment1.pe.y, intersection[0].x, intersection[0].y).length,
                new Segment(segment2.pe.x, segment2.pe.y, intersection[0].x, intersection[0].y).length
            ]
        ];
};

export const getSegmentsIntersections = (segments = [[], [], 0]) => {
    const intersections = [];

    for (let i = 0, wire1 = 0; i < segments[0].length; i++) {
        wire1 += segments[0][i][2];

        for (let j = 0, wire2 = 0; j < segments[1].length; j++) {
            wire2 += segments[1][j][2];

            const intersection = getSegmentsIntersection(
                [
                    segments[0][i],
                    segments[1][j]
                ]
            );

            if (intersection && intersection[0] && intersection[1]) {
                intersections.push([
                    intersection[0],
                    intersection[1],
                    [
                        wire1 - intersection[2][0],
                        wire2 - intersection[2][1]
                    ]
                ]);
            }
        }
    }

    return intersections;
};

export const getDistance = (input, withMinSignalDelay = false) => {
    const intersections = getSegmentsIntersections(getSegments(input));
    const [x, y, [wire1, wire2]] =  minBy(
        intersections,
        ([x, y, [wire1, wire2]]) =>
            withMinSignalDelay ? wire1 + wire2 : Math.abs(x) + Math.abs(y)
    );

    return withMinSignalDelay ? wire1 + wire2 : Math.abs(x) + Math.abs(y);
};

export default {
    day: 3,
    title: 'Crossed Wires',
    input,
    answer1: () => getDistance(input),
    answer2: () => getDistance(input, true),
};