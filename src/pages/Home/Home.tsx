import './Home.scss';

import React, { useEffect } from 'react';

import NodeInfo from '@/components/NodeInfo/NodeInfo';
import TreeViewer from '@/components/TreeViewer/TreeViewer';

function Home() {
  return (
    <div>
      Home
      <main className="content">
        <TreeViewer />
        <NodeInfo />
      </main>
    </div>
  );
}

export default Home;
