class NodeApi {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3000/api';
  }

  getRootNode = async () => {
    const response = await fetch(`${this.baseURL}/node/`, {
      method: 'GET',
    });
    const rootNode = response.json();

    return rootNode;
  };
}

export default NodeApi;
