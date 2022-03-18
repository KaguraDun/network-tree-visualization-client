import React from 'react';
import { useDispatch } from 'react-redux';

import { addNode } from '@/features/node';

import s from './TreeNode.scss';

const TreeNode = ({ data, children }) => {
  const { id, name, ip, port, hasChildren } = data;

  const dispatch = useDispatch();

  const handleNodeOpen = () => {};

  const handleNodeAddChild = () => {
    dispatch(
      addNode({
        parentID: id,
        name: `${name} child`,
        ip,
        port,
      })
    );
  };

  const handleNodeDelete = () => {};

  return (
    <li key={id}>
      <div className={s.nodeElement}>
        <button onClick={handleNodeOpen} type="button">
          {hasChildren && '▼'}
          {`${id} ${name}`}
        </button>

        <button onClick={handleNodeAddChild} type="button">
          +
        </button>

        <button onClick={handleNodeDelete} type="button">
          -
        </button>
      </div>

      {children}
    </li>
  );
};

export default TreeNode;
