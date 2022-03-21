import './Home.scss';

import React from 'react';

import NodeInfo from '@/components/NodeInfo/NodeInfo';
import TreeViewer from '@/components/TreeViewer/TreeViewer';

function Home() {
  return (
    <div className="row">
      <div className="col overflow-auto">
        <TreeViewer />
      </div>
      <div className="col ">
        <NodeInfo />
      </div>
    </div>
  );
}

export default Home;
