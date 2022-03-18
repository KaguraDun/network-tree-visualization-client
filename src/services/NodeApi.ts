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
}

export default NodeApi;
