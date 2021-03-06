import './TreeNode.scss';

import React from 'react';

import { setShowModal } from '@/features/app';
import {
  changeNodeInfoType,
  getChildNodes,
  removeChildNodes,
  selectNode,
  toggleNodeIsOpen,
} from '@/features/node';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { NodeElementWithChildren } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';

interface TreeNodeProps {
  data: NodeElementWithChildren;
  children: React.ReactNode;
}

const TreeNode = ({ data, children }: TreeNodeProps) => {
  const { id, name, hasChildren, isOpen } = data;

  const dispatch = useAppDispatch();

  const selectedNodeID = useAppSelector(({ node }) => node.selectedNodeID);

  const handleToggleNode = () => {
    if (!hasChildren) return;

    if (!isOpen) {
      dispatch(getChildNodes(id));
    } else {
      dispatch(removeChildNodes(id));
    }

    dispatch(toggleNodeIsOpen(id));
  };

  const handleNodeAddChild = () => {
    dispatch(changeNodeInfoType(NodeInfoType.create));
    dispatch(selectNode(id));
  };

  const handleShowDeleteModal = () => {
    dispatch(selectNode(id));
    dispatch(setShowModal(true));
  };

  const handleNodeSelect = () => {
    dispatch(changeNodeInfoType(NodeInfoType.edit));
    dispatch(selectNode(id));
  };

  const isSelected = id === selectedNodeID;

  return (
    <>
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
                aria-label="Open node"
                className={`bi  ${
                  isOpen ? 'bi-caret-down-fill' : 'bi-caret-right-fill'
                }`}
                role="img"
              />
            </button>
          )}

          <button
            aria-label="Select node"
            className="btn btn p-1 me-2"
            onClick={handleNodeSelect}
            type="button"
          >
            {name}
          </button>

          <button
            aria-label="Add node"
            className="btn-add btn"
            onClick={handleNodeAddChild}
            type="button"
          >
            <i className="bi bi-plus-circle" />
          </button>

          <button
            aria-label="Delete node"
            className="btn-del btn"
            onClick={handleShowDeleteModal}
            type="button"
          >
            <i className="bi bi-dash-circle" />
          </button>
        </div>

        {children}
      </li>
    </>
  );
};

export default TreeNode;
