import { getMatrix, getAsteroids, getWeights, getBestLocation, sortAsteroidsByAngle, vaporizeAsteroids } from './day10';

test('vaporize asteroids', () => {
    let input;
    let matrix;
    let asteroids;
    let weights;
    let location;
    let sortedAsteroids;
    let vaporizedAsteroids;

    asteroids = [
        [1,0], [4,0], [0,2], [1,2], [2,2], [3,2], [4,2], [4,3], [3,4], [4,4], [0,4]
    ];
    location = [3,4];
    sortedAsteroids = sortAsteroidsByAngle(asteroids, location);
    expect(vaporizeAsteroids(sortedAsteroids)).toStrictEqual([
        [3,2], [4,0], [4,2], [4,3], [4,4], [0,4], [0,2], [1,2], [2,2], [1,0]
    ]);

    input = `
    .#....#####...#..
    ##...##.#####..##
    ##...#...#.#####.
    ..#.....X...###..
    ..#.#.....#....##
    `;
    matrix = getMatrix(input);
    asteroids = getAsteroids(matrix);
    weights = getWeights(matrix);
    [location] = getBestLocation(weights);
    sortedAsteroids = sortAsteroidsByAngle(asteroids, location);
    vaporizedAsteroids = vaporizeAsteroids(sortedAsteroids);
    expect(vaporizedAsteroids[0]).toStrictEqual([8,1]);
    expect(vaporizedAsteroids[1]).toStrictEqual([9,0]);
    expect(vaporizedAsteroids[8]).toStrictEqual([15,1]);

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
    asteroids = getAsteroids(matrix);
    location = [11,13];
    sortedAsteroids = sortAsteroidsByAngle(asteroids, location);
    vaporizedAsteroids = vaporizeAsteroids(sortedAsteroids);
    expect(vaporizedAsteroids[0]).toStrictEqual([11,12]);
    expect(vaporizedAsteroids[1]).toStrictEqual([12,1]);
    expect(vaporizedAsteroids[2]).toStrictEqual([12,2]);
    expect(vaporizedAsteroids[9]).toStrictEqual([12,8]);
    expect(vaporizedAsteroids[19]).toStrictEqual([16,0]);
    expect(vaporizedAsteroids[49]).toStrictEqual([16,9]);
    expect(vaporizedAsteroids[99]).toStrictEqual([10,16]);
    expect(vaporizedAsteroids[198]).toStrictEqual([9,6]);
    expect(vaporizedAsteroids[199]).toStrictEqual([8,2]);
    expect(vaporizedAsteroids[200]).toStrictEqual([10,9]);
    expect(vaporizedAsteroids[298]).toStrictEqual([11,1]);
    expect(vaporizedAsteroids.length).toBe(299);
});
