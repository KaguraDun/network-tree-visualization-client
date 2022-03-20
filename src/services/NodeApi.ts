class NodeApi {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3000/api';
  }

  getRootNode = async () => {
    const response = await fetch(`${this.baseURL}/node/`, {
      method: 'GET',
    });
    const rootNode = await response.json();

    return rootNode;
  };

  addNode = async (properties) => {
    const response = await fetch(`${this.baseURL}/node/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(properties),
    });
    const newNode = await response.json();

    return newNode;
  };

  getChildNodes = async ({ parentID }) => {
    const response = await fetch(`${this.baseURL}/node/${parentID}/children`, {
      method: 'GET',
    });
    const childrenNodes = response.json();

    return childrenNodes;
  };

  removeNode = async ({ id }) => {
    const response = await fetch(`${this.baseURL}/node/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  };

  updateNodeData = async ({ id, nodeData }) => {
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
