import { NodeElement } from '@/models/Node';

type NodeElementWithoutChildren = Omit<NodeElement, 'children'>;
type NodeElementWithChildrenElements = NodeElementWithoutChildren & {
  children: NodeElementWithoutChildren[];
};

type ChildrenTable = Record<number, NodeElementWithChildrenElements>;

const createTree = (nodeList: NodeElement[]) => {
  const tree: NodeElement[] = [];
  const childrenTable: ChildrenTable = {};

  nodeList.forEach((node) => {
    const { children, ...rest } = node;
    const withoutChildren: NodeElementWithChildrenElements = {
      ...rest,
      children: [],
    };

    childrenTable[node.id] = withoutChildren;
  });

  nodeList.forEach((node: NodeElement) => {
    if (node.parentID !== null) {
      childrenTable[node.parentID].children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};

export default createTree;
