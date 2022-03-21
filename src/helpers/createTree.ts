import { NodeElement, NodeElementWithChildren } from '@/models/Node';

type ChildrenTable = Record<number, NodeElementWithChildren>;

const createTree = (nodeList: NodeElement[]): NodeElementWithChildren[] => {
  const tree: NodeElementWithChildren[] = [];
  const childrenTable: ChildrenTable = {};

  nodeList.forEach((node) => {
    childrenTable[node.id] = Object.assign(node, { childrenElements: [] });
  });

  nodeList.forEach((node) => {
    if (node.parentID !== null) {
      childrenTable[node.parentID].childrenElements.push(node);
    } else {
      tree.push(Object.assign(node, { childrenElements: [] }));
    }
  });

  return tree;
};

export default createTree;
