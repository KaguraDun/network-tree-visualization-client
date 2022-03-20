import './TreeNode.scss';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  changeNodeInfoType,
  getChildNodes,
  removeChildNodes,
  removeNodeFromServer,
  selectNode,
} from '@/features/node';
import NodeInfoType from '@/models/NodeInfoType';

const TreeNode = ({ data, children }) => {
  const { id, name, hasChildren } = data;
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
    dispatch(changeNodeInfoType(NodeInfoType.create));
    dispatch(
      selectNode({
        id,
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
    dispatch(changeNodeInfoType(NodeInfoType.edit));
    dispatch(
      selectNode({
        id,
      })
    );
  };

  return (
    <li key={id.toString()} className="d-flex flex-column align-items-baseline">
      <div className="nodeElement">
        <button onClick={handleToggleNode} type="button">
          ▼
        </button>

        <button onClick={handleNodeSelect} type="button">
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
