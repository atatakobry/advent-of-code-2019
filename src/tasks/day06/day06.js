import { reduce, values, remove, forEach, map, split, trim} from 'lodash';
import TreeModel from 'tree-model';

import input from './input.txt';

const generateNodes = (children, groupedConnections) => {
    forEach(children, (child, index) => {
        const [nodes] = remove(groupedConnections, ({ id }) => id === child.id);

        if (nodes) {
            children[index] = nodes;
            generateNodes(children[index].children, groupedConnections);
        }
    });
};

export const getTreeModel = input => {
    const connections = map(split(trim(input), '\n'), connection => {
        const [aaa, bbb] = split(trim(connection), ')');

        return {
            id: aaa,
            children: [{ id: bbb }]
        };
    });

    const groupedConnections = values(reduce(connections, (object, connection) => {
        if (object[connection.id]) {
            object[connection.id].children = [ ...object[connection.id].children, ...connection.children];
        } else {
            object[connection.id] = connection;
        }

        return object;
    }, {}));

    const [treeModel] = remove(groupedConnections, ({ id }) => id === 'COM');

    generateNodes(treeModel.children, groupedConnections);

    return treeModel;
};

export default {
    day: 6,
    input,
    title: 'Universal Orbit Map',
    answer1: () => {
        const tree = new TreeModel();
        const root = tree.parse(getTreeModel(input));

        let totalNumber = 0;

        root.walk(node => {
            totalNumber += node.getPath().length - 1;
        });

        return totalNumber;
    },
    answer2: () => '-'
};