import { chunk, map, split, trim, join, filter, flattenDeep, minBy } from 'lodash';

import input from './input.txt';

export const getLayers = (input, width = 25, height = 6) => chunk(
    chunk(
        map(split(trim(input), ''), s => +s),
        width
    ),
    height
);

export const getImage = layers => join(flattenDeep(layers), '');

export const getNumberOf = (layer, n) => filter(flattenDeep(layer), d => d === n).length;

export const getNecessaryLayer = layers => minBy(layers, layer => getNumberOf(layer, 0));

export default {
    day: 8,
    input,
    title: 'Space Image Format',
    answer1: () => {
        const layers = getLayers(input);
        const layer = getNecessaryLayer(layers);

        return getNumberOf(layer, 1) * getNumberOf(layer, 2);
    },
    answer2: () => '-'
}