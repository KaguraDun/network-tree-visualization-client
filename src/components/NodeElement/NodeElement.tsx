import React from 'react';
import { useDispatch } from 'react-redux';

import s from './NodeElement.scss';

interface NodeElementProps {
  name: string;
}

const NodeElement = ({ name }: NodeElementProps) => {
  const dispatch = useDispatch();

  const handleNodeOpen = () => {};
  const handleNodeAddChild = () => {};
  const handleNodeDelete = () => {};

  return (
    <div className={s.nodeElement}>
      <button onClick={handleNodeOpen} type="button">
        {name}
      </button>
      <button onClick={handleNodeAddChild} type="button">
        add
      </button>
      <button onClick={handleNodeDelete} type="button">
        del
      </button>
    </div>
  );
};

export default NodeElement;
