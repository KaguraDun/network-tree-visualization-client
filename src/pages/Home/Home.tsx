import './Home.scss';

import React from 'react';

import NodeInfo from '@/components/NodeInfo/NodeInfo';
import TreeViewer from '@/components/TreeViewer/TreeViewer';

function Home() {
  return (
    <div className="row mb-5">
      <div className="col-sm-7 col-md-6 overflow-auto">
        <TreeViewer />
      </div>
      <div className="col-sm-5 col-md-4">
        <NodeInfo />
      </div>
    </div>
  );
}

export default Home;
