import './Tree.scss';

import React from 'react';

import TreeNode from '@/components/TreeNode/TreeNode';
import { NodeElementWithChildren } from '@/models/Node';

interface TreeProps {
  data: NodeElementWithChildren[];
}

const Tree = ({ data }: TreeProps) => {
  const treeElements = data.map((node) => {
    const { id, childrenElements } = node || [];

    const isChildrenExist = childrenElements?.length > 0;

    return (
      <ul key={id.toString()} className="tree">
        {node && (
          <TreeNode data={node}>
            {isChildrenExist && <Tree data={childrenElements} />}
          </TreeNode>
        )}
      </ul>
    );
  });

  return <>{treeElements.map((element) => element)}</>;
};

export default Tree;
