const createTree = (nodeList) => {
  const tree = [];
  const childrenTable = {};

  nodeList.forEach((node) => {
    console.log(node);
    childrenTable[node.id] = node;
    childrenTable[node.id].children = [];
  });

  nodeList.forEach((node) => {
    if (node.parentID !== null) {
      childrenTable[node.parentID].children.push(node);
    } else {
      tree.push(node);
    }
  });
  return tree;
};

export default createTree;
