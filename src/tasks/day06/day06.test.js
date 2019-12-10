import TreeModel from 'tree-model';

import { getTreeModel, getTotalNumberOfOrbits, getMinNumberOfTransfers } from './day06';

test('get tree model', () => {
    const input = `
    COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L
   `;
    expect(getTreeModel(input)).toStrictEqual({
        id: 'COM',
        children: [
            {
                id: 'B',
                children: [
                    {
                        id: 'C',
                        children: [
                            {
                                id: 'D',
                                children: [
                                    {
                                        id: 'E',
                                        children: [
                                            {
                                                id: 'F'
                                            },
                                            {
                                                id: 'J',
                                                children: [
                                                    {
                                                        id: 'K',
                                                        children: [
                                                            {
                                                                id: 'L'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'I'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'G',
                        children: [
                            {
                                id: 'H'
                            }
                        ]
                    }
                ]
            }
        ]
    });
});

test('get total number of orbits', () => {
    const input = `
    COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L
   `;
    const tree = new TreeModel();
    const root = tree.parse(getTreeModel(input));

    expect(getTotalNumberOfOrbits(root)).toBe(42);
});

test ('get min number of transfers', () => {
    const tree = new TreeModel();
    const root = tree.parse({
        id: 'COM',
        children: [
            {
                id: 'B',
                children: [
                    {
                        id: 'C',
                        children: [
                            {
                                id: 'D',
                                children: [
                                    {
                                        id: 'E',
                                        children: [
                                            {
                                                id: 'F'
                                            },
                                            {
                                                id: 'J',
                                                children: [
                                                    {
                                                        id: 'K',
                                                        children: [
                                                            {
                                                                id: 'YOU'
                                                            },
                                                            {
                                                                id: 'L'
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'I',
                                        children: [{
                                            id: 'SAN'
                                        }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'G',
                        children: [
                            {
                                id: 'H'
                            }
                        ]
                    }
                ]
            }
        ]
    });

    expect(
        getMinNumberOfTransfers(
            root.first(node => node.model.id === 'YOU').parent,
            root.first(node => node.model.id === 'SAN').parent
        )
    ).toBe(4);
});