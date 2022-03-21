import './TreeNode.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeNodeInfoType,
  getChildNodes,
  removeChildNodes,
  removeNodeFromServer,
  selectNode,
  toggleNodeIsOpen,
} from '@/features/node';
import NodeInfoType from '@/models/NodeInfoType';

const TreeNode = ({ data, children }) => {
  const { id, name, hasChildren, isOpen } = data;

  const getSelectedNodeID = ({ node }) => node.selectedNodeID;
  const selectedNodeID = useSelector(getSelectedNodeID);

  const dispatch = useDispatch();

  const handleToggleNode = () => {
    if (!hasChildren) return;

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

    dispatch(toggleNodeIsOpen({ id }));
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

  const isSelected = id === selectedNodeID;

  return (
    <li
      key={id.toString()}
      className={`d-flex flex-column align-items-baseline ${
        !hasChildren && 'tree-node'
      }`}
    >
      <div
        className={`tree-node-element d-flex w100 ${
          isSelected && 'tree-node-element-selected '
        }`}
      >
        {hasChildren && (
          <button className="btn" onClick={handleToggleNode} type="button">
            <i
              aria-label="Open node icon"
              className={`bi  ${
                isOpen ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
              }`}
              role="img"
            />
          </button>
        )}

        <button
          className="btn btn p-1 me-2"
          onClick={handleNodeSelect}
          type="button"
        >
          {`${id} ${name}`}
        </button>

        <button
          className="btn-add btn"
          onClick={handleNodeAddChild}
          type="button"
        >
          <i className="bi bi-plus-circle" />
        </button>

        <button
          className="btn-del btn"
          onClick={handleNodeDelete}
          type="button"
        >
          <i className="bi bi-dash-circle" />
        </button>
      </div>

      {children}
    </li>
  );
};

export default TreeNode;
