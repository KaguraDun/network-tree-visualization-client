import React from 'react';

import TreeNode from '@/components/TreeNode/TreeNode';

const Tree = ({ data }) => {
  const treeElements = data.map((node) => {
    const { children } = node || [];

    return (
      <ul>
        {node && (
          <TreeNode data={node}>
            {children && children?.length > 0 ? <Tree data={children} /> : ''}
          </TreeNode>
        )}
      </ul>
    );
  });

  return treeElements;
};

export default Tree;
