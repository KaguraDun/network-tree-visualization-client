import React, { useEffect, useState } from 'react';

import Tree from '@/components/Tree/Tree';
import { setShowModal } from '@/features/app';
import {
  changeNodeInfoType,
  getRootNode,
  removeNodeFromServer,
  selectNode,
} from '@/features/node';
import createTree from '@/helpers/createTree';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { NodeElementWithChildren } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';

import Modal from '../Modal/Modal';

const TreeViewer = () => {
  const [tree, setTree] = useState<NodeElementWithChildren[]>([]);

  const dispatch = useAppDispatch();
  const nodeList = useAppSelector(({ node }) => node.nodeList);
  const selectedNodeID = useAppSelector(({ node }) => node.selectedNodeID);

  useEffect(() => {
    const treeCopy = JSON.parse(JSON.stringify(Object.values(nodeList)));
    const nodeTree = createTree(treeCopy);

    setTree(nodeTree);
  }, [nodeList]);

  useEffect(() => {
    dispatch(getRootNode());
  }, [dispatch]);

  const handleAddRootNode = () => {
    dispatch(changeNodeInfoType(NodeInfoType.create));
    dispatch(selectNode(null));
  };

  const handleNodeDelete = () => {
    if (selectedNodeID === null) return;

    dispatch(removeNodeFromServer(selectedNodeID));
    dispatch(setShowModal(false));
  };

  const handleNodeDeleteCancel = () => {
    dispatch(setShowModal(false));
    dispatch(selectNode(null));
  };

  return (
    <div>
      <h2>Node hierarchy</h2>

      {tree && tree.length > 0 ? (
        <Tree data={tree} />
      ) : (
        <button className="btn" onClick={handleAddRootNode} type="button">
          <i className="bi bi-plus-circle" />
        </button>
      )}

      <Modal
        handleCancel={handleNodeDeleteCancel}
        handleOk={handleNodeDelete}
        title="Delete node"
      >
        Node and all child nodes will be deleted, are you sure?
      </Modal>
    </div>
  );
};

export default TreeViewer;
