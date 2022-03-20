import './TreeNode.scss';

import React, { ReactText, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  addNode,
  getChildNodes,
  removeChildNodes,
  removeNodeFromServer,
  selectNode,
} from '@/features/node';

const TreeNode = ({ data, children }) => {
  const { id, name, ip, port, hasChildren } = data;
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleToggleNode = () => {
    if (!isOpen) {
      dispatch(
        getChildNodes({
          parentID: id,
        })
      );
    } else {
      dispatch(
        removeChildNodes({
          parentID: id,
        })
      );
    }
    setIsOpen((open) => !open);
  };

  const handleNodeAddChild = () => {
    dispatch(
      getChildNodes({
        parentID: id,
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

  const handleNodeSelect = () => {
    dispatch(
      selectNode({
        id,
      })
    );
  };

  return (
    <li key={id}>
      <div className="nodeElement">
        <button onClick={handleToggleNode} type="button">
          ▼
        </button>

        <button onClick={handleNodeAddChild} type="button">
          +
        </button>

        <button onClick={handleNodeSelect} type="button">
          {`${id} ${name}`}
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
