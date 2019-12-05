import { map, split, trim, reduce, compact, minBy, isEmpty } from 'lodash';
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
    ];
};

export const getSegments = input => {
    const lines = map(split(trim(input), '\n'), line => split(trim(line), ','));

    return map(lines, line => {
        return reduce(line, (segments, command, index) => {
            const prevSegment = segments[index - 1] || [[0,0], [0,0]];
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

    return isEmpty(intersection) ? null : [intersection[0].x, intersection[0].y];
};

export const getSegmentsIntersections = (segments = [[], []]) => {
    const intersections = [];

    for (let i = 0; i < segments[0].length; i++) {
        for (let j = 0; j < segments[1].length; j++) {
            const intersection = getSegmentsIntersection(
                [
                    segments[0][i],
                    segments[1][j]
                ]
            );

            if (!isEmpty(compact(intersection))) {
                intersections.push(intersection);
            }
        }
    }

    return intersections;
};

export const getDistance = input => {
    const intersections = getSegmentsIntersections(getSegments(input));
    const [x, y] = minBy(
        intersections,
        ([x, y]) => Math.abs(x) + Math.abs(y)
    );

    return Math.abs(x) + Math.abs(y);
};

export default {
    answer: () => getDistance(input)
};