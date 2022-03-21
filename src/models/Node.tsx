interface NodeElement {
  id: number;
  parentID: number | null;
  name: string;
  ip: string;
  port: number;
  hasChildren: boolean;
  children: number[];
  isOpen: boolean;
}

interface NodeElementFromServer {
  id: number;
  parent_id: number | null;
  name: string;
  ip: string;
  port: number;
  hasChildren: boolean;
  children: number[];
  isOpen: boolean;
}

interface UpdateNodeData {
  id: NodeElement['id'];
  nodeData: Pick<NodeElement, 'name' | 'ip' | 'port'>;
}

type NodeData = Pick<NodeElement, 'name' | 'ip' | 'port' | 'parentID'>;

type NodeList = Record<number, NodeElement>;

export type {
  NodeData,
  NodeElement,
  NodeElementFromServer,
  NodeList,
  UpdateNodeData,
};
