import React from 'react';
import { chunk, map, split, trim, filter, flattenDeep, minBy, fill } from 'lodash';

import input from './input.txt';

export const getLayers = (input, width = 25, height = 6) => chunk(
    chunk(
        map(split(trim(input), ''), s => +s),
        width
    ),
    height
);

export const getNumberOf = (layer, n) => filter(flattenDeep(layer), d => d === n).length;

export const getNecessaryLayer = layers => minBy(layers, layer => getNumberOf(layer, 0));

export const mergeLayers = layers => {
    const width = layers[0][0].length;
    const height = layers[0].length;
    const depth = layers.length;

    const mergedLayer = map(new Array(height), () => fill(new Array(width), 2));

    for (let n = 0; n < width; n++) {
        for (let m = 0; m < height; m++) {
            for (let l = 0; l < depth; l++) {
                if (layers[l][m][n] === 0 || layers[l][m][n] === 1) {
                    mergedLayer[m][n] = layers[l][m][n];
                    break;
                }
            }
        }
    }

    return mergedLayer;
};

export default {
    day: 8,
    input,
    title: 'Space Image Format',
    answers: [
        () => {
            const layers = getLayers(input);
            const layer = getNecessaryLayer(layers);

            return getNumberOf(layer, 1) * getNumberOf(layer, 2);
        },
        () => {
            const layers = getLayers(input);
            const mergedLayer = mergeLayers(layers);

            return (
                <span style={{
                    display: 'inline-flex',
                    verticalAlign: 'middle',
                    flexWrap: 'wrap',
                    position: 'relative',
                    top: '-2px',
                    width: '50px',
                    height: '12px'
                }}>
                    {
                        mergedLayer.map((row, m) =>
                            row.map((element, n) =>
                                <span key={`${m},${n}`} style={{
                                    display: 'block',
                                    width: '2px',
                                    height: '2px',
                                    margin: 0,
                                    padding: 0,
                                    backgroundColor: element ? 'white' : 'black'
                                }}/>)
                        )
                    }
                </span>
            );
        }
    ]
}