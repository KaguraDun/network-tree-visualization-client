import React, { useEffect } from 'react';

import TreeViewer from '@/components/TreeViewer/TreeViewer';

import s from './Home.scss';

function Home() {
  return (
    <div>
      Home
      <main className={s.content}>
        <TreeViewer />
      </main>
    </div>
  );
}

export default Home;
