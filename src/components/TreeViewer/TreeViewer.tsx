import React, { useEffect, useState } from 'react';

import Tree from '@/components/Tree/Tree';
import { changeNodeInfoType, getRootNode, selectNode } from '@/features/node';
import createTree from '@/helpers/createTree';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { NodeElementWithChildren } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';

const TreeViewer = () => {
  const [tree, setTree] = useState<NodeElementWithChildren[]>([]);

  const dispatch = useAppDispatch();
  const nodeList = useAppSelector(({ node }) => node.nodeList);

  useEffect(() => {
    const treeCopy = JSON.parse(JSON.stringify(Object.values(nodeList)));
    const nodeTree = createTree(treeCopy);
    console.log(nodeTree);
    setTree(nodeTree);
  }, [nodeList]);

  useEffect(() => {
    dispatch(getRootNode());
  }, [dispatch]);

  const handleAddRootNode = () => {
    dispatch(changeNodeInfoType(NodeInfoType.create));
    dispatch(selectNode(null));
  };

  return (
    <div>
      <h2>Node hierarchy</h2>
      {tree && tree.length > 0 ? (
        <Tree data={tree} />
      ) : (
        <button className="btn" onClick={handleAddRootNode} type="button">
          <i className="bi bi-plus-circle" />
        </button>
      )}
    </div>
  );
};

export default TreeViewer;
