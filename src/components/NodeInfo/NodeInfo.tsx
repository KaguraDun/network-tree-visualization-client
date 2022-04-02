import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  addNode,
  changeNodeInfoType,
  getChildNodes,
  selectNode,
  updateNodeDataOnServer,
} from '@/features/node';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { NodeElement } from '@/models/Node';
import NodeInfoType from '@/models/NodeInfoType';
import regexList from '@/models/regexList';

type NodeDataState = Pick<NodeElement, 'name' | 'ip'> & { port: string };
interface FormErrors {
  name: boolean;
  ip: boolean;
  port: boolean;
}

const defaultNodeDataState = {
  name: '',
  ip: '',
  port: '',
};

const defaultFormErrorsState = {
  name: false,
  ip: false,
  port: false,
};

function NodeInfo() {
  const [nodeData, setNodeData] = useState<NodeDataState>(defaultNodeDataState);
  const [formErrors, setFormErrors] = useState<FormErrors>(
    defaultFormErrorsState
  );

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

  const clearNodeData = useCallback(() => {
    setNodeData(defaultNodeDataState);
  }, []);

  useEffect(() => {
    if (selectedNodeData === null) {
      clearNodeData();
      return;
    }

    const { name, ip, port } = selectedNodeData || {};

    setNodeData({ name, ip, port: String(port) });
  }, [clearNodeData, selectedNodeData]);

  useEffect(() => {
    if (formType === NodeInfoType.create) {
      clearNodeData();
      nameInputRef.current?.focus();
    }
  }, [clearNodeData, formType]);

  const resetFormErrors = () => {
    setFormErrors(defaultFormErrorsState);
  };

  const validateInputData = () => {
    const { name, ip, port } = nodeData;

    let hasErrors = false;
    resetFormErrors();

    if (name.length === 0) {
      setFormErrors((oldState) => ({ ...oldState, ...{ name: true } }));
      hasErrors = true;
    }

    const ipRegex = new RegExp(regexList.ip);

    if (!ipRegex.test(ip)) {
      setFormErrors((oldState) => ({ ...oldState, ...{ ip: true } }));
      hasErrors = true;
    }

    const portRegex = new RegExp(regexList.port);

    if (!portRegex.test(port) || port === '') {
      setFormErrors((oldState) => ({ ...oldState, ...{ port: true } }));
      hasErrors = true;
    }

    return hasErrors;
  };

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
    if (selectedNodeID === null) return;

    const { name, ip, port } = nodeData;
    const data = { name: name.trim(), ip, port: Number(port) };

    dispatch(updateNodeDataOnServer({ id: selectedNodeID, nodeData: data }));
  };

  const handleCancelChanges = () => {
    dispatch(changeNodeInfoType(NodeInfoType.await));
    dispatch(selectNode(null));
    resetFormErrors();

    if (selectedNodeData === null) return;

    const { name, ip, port } = selectedNodeData;

    setNodeData({ name, ip, port: String(port) });
  };

  const handleNodeCreate = () => {
    if (selectedNodeData === undefined) return;

    const { id = null } = selectedNodeData || {};

    if (id !== null) {
      dispatch(getChildNodes(id));
    }

    const { name, ip, port } = nodeData;
    const data = { name: name.trim(), ip, port: Number(port) };

    dispatch(
      addNode({
        parentID: id,
        ...data,
      })
    );

    dispatch(changeNodeInfoType(NodeInfoType.edit));
  };

  const handleCancelNodeCreate = () => {
    dispatch(changeNodeInfoType(NodeInfoType.await));
    dispatch(selectNode(null));

    clearNodeData();
    resetFormErrors();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formType === NodeInfoType.await) return;

    const hasErrors = validateInputData();

    if (hasErrors) return;

    if (formType === NodeInfoType.create) handleNodeCreate();
    if (formType === NodeInfoType.edit) handleSubmitChanges();

    resetFormErrors();
  };

  const isCreateMode = formType === NodeInfoType.create;

  const dangerAlertCN = 'alert alert-danger pb-1 pt-1 mb-1';

  return (
    <form
      className="d-flex flex-column bd-highlight justify-content-between vh-50"
      onSubmit={handleFormSubmit}
    >
      <h2> {isCreateMode ? 'Node create' : 'Node'}</h2>

      <div className="mb-3">
        <div className="form-group">
          <label className="w-100">
            Node name:
            <input
              ref={nameInputRef}
              className="form-control mb-1"
              name="name"
              onChange={handleEditNodeInfo}
              placeholder={isCreateMode ? 'шлюз портала' : ''}
              type="text"
              value={nodeData?.name || ''}
            />
            <div
              className={formErrors.name ? dangerAlertCN : 'invisible'}
              role="alert"
            >
              Please enter node name!
            </div>
          </label>
        </div>

        <div className="form-group">
          <label className="w-100">
            IP address:
            <input
              className="form-control mb-1"
              name="ip"
              onChange={handleEditNodeInfo}
              placeholder={isCreateMode ? '192.168.0.57' : ''}
              type="text"
              value={nodeData?.ip || ''}
            />
            <div
              className={formErrors.ip ? dangerAlertCN : 'invisible'}
              role="alert"
            >
              The IP address is invalid!
            </div>
          </label>
        </div>

        <div className="form-group">
          <label className="w-100">
            Web port:
            <input
              className="form-control mb-1"
              name="port"
              onChange={handleEditNodeInfo}
              placeholder={isCreateMode ? '8081' : ''}
              type="text"
              value={nodeData?.port || ''}
            />
            <div
              className={formErrors.port ? dangerAlertCN : 'invisible'}
              role="alert"
            >
              The port is invalid!
            </div>
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" type="submit">
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
