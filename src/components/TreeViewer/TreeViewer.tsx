import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tree from '@/components/Tree/Tree';
import { getRootNode } from '@/features/node';
import createTree from '@/helpers/createTree';

const TreeViewer = () => {
  const [tree, setTree] = useState([]);

  const dispatch = useDispatch();
  const NodeList = ({ node }) => node.nodeList;

  const nodeList = useSelector(NodeList);

  useEffect(() => {
    const treeCopy = JSON.parse(JSON.stringify(Object.values(nodeList)));
    const nodeTree = createTree(treeCopy);

    setTree(nodeTree);
  }, [nodeList]);

  useEffect(() => {
    dispatch(getRootNode());
  }, [dispatch]);

  return (
    <>
      <h2>Node hierarchy</h2>
      <Tree data={tree} />
    </>
  );
};

export default TreeViewer;
