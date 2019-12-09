import { getTreeModel } from './day06';

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

