import { NodeData, NodeElement, UpdateNodeData } from '@/models/Node';

enum Mode {
  development = 'development',
  production = 'production',
}

const serverURL = {
  development: 'http://localhost:3000/api',
  production: '',
};

class NodeApi {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = serverURL[Mode.development];
  }

  getRootNode = async () => {
    const response = await fetch(`${this.baseURL}/node/`, {
      method: 'GET',
    });
    const rootNode = await response.json();

    return rootNode;
  };

  addNode = async (nodeData: NodeData) => {
    const response = await fetch(`${this.baseURL}/node/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodeData),
    });
    const newNode = await response.json();

    return newNode;
  };

  getChildNodes = async (parentID: NodeElement['id']) => {
    const response = await fetch(`${this.baseURL}/node/${parentID}/children`, {
      method: 'GET',
    });
    const childrenNodes = response.json();

    return childrenNodes;
  };

  removeNode = async (id: NodeElement['id']) => {
    const response = await fetch(`${this.baseURL}/node/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  };

  updateNodeData = async ({ id, nodeData }: UpdateNodeData) => {
    const response = await fetch(`${this.baseURL}/node/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodeData),
    });

    return response.json();
  };
}

export default NodeApi;
