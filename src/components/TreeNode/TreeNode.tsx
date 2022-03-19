import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  addNode,
  getChildNodes,
  removeChildNodes,
  removeNodeFromServer,
} from '@/features/node';

import s from './TreeNode.scss';

const TreeNode = ({ data, children }) => {
  const { id, name, ip, port, hasChildren, level } = data;
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleToggleNode = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(
        getChildNodes({
          parentid: id,
        })
      );
    } else {
      dispatch(
        removeChildNodes({
          parentid: id,
          level,
        })
      );
    }
  }, [dispatch, id, isOpen, level]);

  const handleNodeAddChild = () => {
    dispatch(
      getChildNodes({
        parentid: id,
      })
    );

    dispatch(
      addNode({
        parentID: id,
        name: `${name} child`,
        ip,
        port,
      })
    );
  };

  const handleNodeDelete = () => {
    dispatch(
      removeNodeFromServer({
        id,
      })
    );
  };

  return (
    <li key={id}>
      <div className={s.nodeElement}>
        <button onClick={handleToggleNode} type="button">
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
