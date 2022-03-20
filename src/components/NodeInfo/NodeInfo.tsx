import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateNodeData, updateNodeDataOnServer } from '@/features/node';
import NodeInfoType from '@/models/NodeInfoType';

function NodeInfo() {
  const [nodeData, setNodeData] = useState({});

  const dispatch = useDispatch();

  const getSelectedNodeID = ({ node }) => node.selectedNodeID;
  const selectedNodeID = useSelector(getSelectedNodeID);

  const getSelectedNodeData = ({ node }) => {
    if (selectedNodeID !== undefined) {
      return node.nodeList[selectedNodeID];
    }
  };

  const selectedNodeData = useSelector(getSelectedNodeData);

  const getFormType = ({ node }) => node.nodeInfoType;
  const formType = useSelector(getFormType);

  useEffect(() => {
    const { name, ip, port } = selectedNodeData || {};
    setNodeData({ name, ip, port });
  }, [selectedNodeData]);

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
    dispatch(updateNodeDataOnServer({ id: selectedNodeID, nodeData }));
  };

  const handleCancelChanges = () => {
    const { name, ip, port } = selectedNodeData || {};
    setNodeData({ name, ip, port });
  };

  const handleNodeCreate = () => {
    console.log('create');
  };

  const handleCancelNodeCreate = () => {
    console.log('cancel create');
  };

  return (
    <div className="d-flex flex-column bd-highlight justify-content-between vh-50">
      <h2>Node</h2>

      <label>
        Node name:
        <input
          name="name"
          onChange={handleEditNodeInfo}
          type="text"
          value={nodeData.name || ''}
        />
      </label>

      <label>
        IP address:
        <input
          name="ip"
          onChange={handleEditNodeInfo}
          type="text"
          value={nodeData.ip || ''}
        />
      </label>

      <label>
        Web port:
        <input
          name="port"
          onChange={handleEditNodeInfo}
          type="text"
          value={nodeData.port || ''}
        />
      </label>

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
          Apply
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
    </div>
  );
}

export default NodeInfo;
