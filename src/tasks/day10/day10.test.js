import { getMatrix, getAsteroids, getWeights, getBestLocation } from './day10';

test('get matrix', () => {
    const input = `
    .#..#
    .....
    #####
    ....#
    ...##
    `;
   expect(getMatrix(input)).toStrictEqual([
       [ 0, 1, 0, 0, 1 ],
       [ 0, 0, 0, 0, 0 ],
       [ 1, 1, 1, 1, 1 ],
       [ 0, 0, 0, 0, 1 ],
       [ 0, 0, 0, 1, 1 ]
   ]);
});

test('get asteroids', () => {
    const matrix = [
        [ 0, 1, 0, 0, 1 ],
        [ 0, 0, 0, 0, 0 ],
        [ 1, 1, 1, 1, 1 ],
        [ 0, 0, 0, 0, 1 ],
        [ 0, 0, 0, 1, 1 ]
    ];
    expect(getAsteroids(matrix)).toStrictEqual([
        [1,0], [4,0], [0,2], [1,2], [2,2], [3,2], [4,2], [4,3], [3,4], [4,4]
    ]);
});

test('get weights', () => {
   const matrix = [
       [ 0, 1, 0, 0, 1 ],
       [ 0, 0, 0, 0, 0 ],
       [ 1, 1, 1, 1, 1 ],
       [ 0, 0, 0, 0, 1 ],
       [ 0, 0, 0, 1, 1 ]
   ];
   expect(getWeights(matrix)).toStrictEqual([
       [ 0, 7, 0, 0, 7 ],
       [ 0, 0, 0, 0, 0 ],
       [ 6, 7, 7, 7, 5 ],
       [ 0, 0, 0, 0, 7 ],
       [ 0, 0, 0, 8, 7 ]
   ]);
});

test('get best location', () => {
    let input;
    let matrix;
    let wights;

    input = `
    .#..#
    .....
    #####
    ....#
    ...##
    `;
    matrix = getMatrix(input);
    wights = getWeights(matrix);
    expect(getBestLocation(wights)).toStrictEqual([[3,4], 8]);

    input = `
    ......#.#.
    #..#.#....
    ..#######.
    .#.#.###..
    .#..#.....
    ..#....#.#
    #..#....#.
    .##.#..###
    ##...#..#.
    .#....####
    `;
    matrix = getMatrix(input);
    wights = getWeights(matrix);
    expect(getBestLocation(wights)).toStrictEqual([[5,8], 33]);

    input = `
    #.#...#.#.
    .###....#.
    .#....#...
    ##.#.#.#.#
    ....#.#.#.
    .##..###.#
    ..#...##..
    ..##....##
    ......#...
    .####.###.
    `;
    matrix = getMatrix(input);
    wights = getWeights(matrix);
    expect(getBestLocation(wights)).toStrictEqual([[1,2], 35]);

    input = `
    .#..#..###
    ####.###.#
    ....###.#.
    ..###.##.#
    ##.##.#.#.
    ....###..#
    ..#.#..#.#
    #..#.#.###
    .##...##.#
    .....#.#..
    `;
    matrix = getMatrix(input);
    wights = getWeights(matrix);
    expect(getBestLocation(wights)).toStrictEqual([[6,3], 41]);

    input = `
    .#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##
    `;
    matrix = getMatrix(input);
    wights = getWeights(matrix);
    expect(getBestLocation(wights)).toStrictEqual([[11,13], 210]);
});