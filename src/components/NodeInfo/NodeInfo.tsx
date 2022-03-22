import React, { useEffect, useRef, useState } from 'react';

import {
  addNode,
  changeNodeInfoType,
  getChildNodes,
  updateNodeDataOnServer,
} from '@/features/node';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { NodeElement } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';

function NodeInfo() {
  const defaultNodeDataState = {
    name: '',
    ip: '',
    port: 0,
  };

  const [nodeData, setNodeData] =
    useState<Pick<NodeElement, 'name' | 'ip' | 'port'>>(defaultNodeDataState);

  const dispatch = useAppDispatch();
  const nameInputRef = useRef<null | HTMLInputElement>(null);

  const selectedNodeID = useAppSelector(({ node }) => node.selectedNodeID);
  const selectedNodeData = useAppSelector(({ node }): NodeElement | null => {
    if (selectedNodeID !== null) {
      return node.nodeList[selectedNodeID];
    }
    return null;
  });

  const formType = useAppSelector(({ node }) => node.nodeInfoType);

  useEffect(() => {
    if (selectedNodeData === null) return;

    const { name, ip, port } = selectedNodeData;

    setNodeData({ name, ip, port });
  }, [selectedNodeData]);

  const clearNodeData = () => {
    setNodeData({ name: '', ip: '', port: 0 });
  };

  useEffect(() => {
    if (formType === NodeInfoType.create) {
      clearNodeData();
      nameInputRef.current?.focus();
    }
  }, [formType]);

  const handleEditNodeInfo = (e: React.ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      const { value, name } = e.target;

      setNodeData((oldData) => ({
        ...oldData,
        [name]: value,
      }));
    }
  };

  const handleSubmitChanges = () => {
    if (selectedNodeID === null || nodeData === undefined) return;

    dispatch(updateNodeDataOnServer({ id: selectedNodeID, nodeData }));
  };

  const handleCancelChanges = () => {
    if (selectedNodeData === null) return;

    const { name, ip, port } = selectedNodeData;

    setNodeData({ name, ip, port });
  };

  const handleNodeCreate = () => {
    if (selectedNodeData === undefined) return;

    const { id = null } = selectedNodeData || {};
    if (id !== null) {
      dispatch(getChildNodes(id));
    }

    dispatch(
      addNode({
        parentID: id,
        ...nodeData,
      })
    );

    dispatch(changeNodeInfoType(NodeInfoType.edit));
  };

  const handleCancelNodeCreate = () => {
    dispatch(changeNodeInfoType(NodeInfoType.edit));
    clearNodeData();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="d-flex flex-column bd-highlight justify-content-between vh-50"
      onSubmit={handleFormSubmit}
    >
      <h2> {formType === NodeInfoType.create ? 'Node create' : 'Node'}</h2>
      <div className="mb-3">
        <div className="form-group">
          <label className="w-100">
            Node name:
            <input
              ref={nameInputRef}
              className="form-control"
              name="name"
              onChange={handleEditNodeInfo}
              type="text"
              value={nodeData?.name || ''}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100">
            IP address:
            <input
              className="form-control"
              name="ip"
              onChange={handleEditNodeInfo}
              type="text"
              value={nodeData?.ip || ''}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="w-100">
            Web port:
            <input
              className="form-control"
              name="port"
              onChange={handleEditNodeInfo}
              type="text"
              value={nodeData?.port || ''}
            />
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={
            formType === NodeInfoType.create
              ? handleNodeCreate
              : handleSubmitChanges
          }
          type="button"
        >
          {formType === NodeInfoType.create ? 'Create' : 'Apply'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={
            formType === NodeInfoType.create
              ? handleCancelNodeCreate
              : handleCancelChanges
          }
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NodeInfo;
