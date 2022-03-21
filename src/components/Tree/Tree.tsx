import './Tree.scss';

import React from 'react';
import { useDispatch } from 'react-redux';

import TreeNode from '@/components/TreeNode/TreeNode';
import { changeNodeInfoType, selectNode } from '@/features/node';
import { NodeElementWithChildren } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';

interface TreeProps {
  data: NodeElementWithChildren[];
}

const Tree = ({ data }: TreeProps) => {

  const treeElements = data.map((node) => {
    const { id, childrenElements } = node || [];

    return (
      <ul key={id.toString()} className="tree">
        {node && (
          <TreeNode data={node}>
            {childrenElements && childrenElements?.length > 0 ? (
              <Tree data={childrenElements} />
            ) : (
              ''
          </TreeNode>
        )}
      </ul>
    );
  });

  const dispatch = useDispatch();

  const handleAddRootNode = () => {
    dispatch(changeNodeInfoType(NodeInfoType.create));
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
