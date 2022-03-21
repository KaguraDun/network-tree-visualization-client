import './Tree.scss';

import React from 'react';
import { useDispatch } from 'react-redux';

import TreeNode from '@/components/TreeNode/TreeNode';
import { addNode } from '@/features/node';

const Tree = ({ data }) => {
  const treeElements = data.map((node) => {
    const { id, children } = node || [];

    return (
      <ul key={id.toString()} className="tree">
        {node && (
          <TreeNode data={node}>
            {children && children?.length > 0 ? <Tree data={children} /> : ''}
          </TreeNode>
        )}
      </ul>
    );
  });

  const dispatch = useDispatch();

  const handleAddRootNode = () => {
    dispatch(
      addNode({
        parentID: null,
        name: `root`,
        ip: '123',
        port: '123',
      })
    );
  };

  const isEmpty = treeElements.length === 0;

  if (isEmpty) {
    return (
      <button className="btn" onClick={handleAddRootNode} type="button">
        <i className="bi bi-plus-circle" />
      </button>
    );
  }

  return treeElements;
};

export default Tree;
