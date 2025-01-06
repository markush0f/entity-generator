// EntityHistory.tsx
import React from 'react';
import type IEntity from '../types/Entity.type';

interface Props {
  entity: IEntity;
  onSelectEntity: (entity: IEntity) => void;
}

const EntityHistory: React.FC<Props> = ({ entity, onSelectEntity }) => {
  const handleClick = () => {
    console.log('Entity selected:', entity);
    onSelectEntity(entity);
  };

  return (
    <button className="mb-1 p-2 text-left w-full" onClick={handleClick}>
      <h1 className="text-xl">{entity.className}</h1>
      <h2 className="text-sm opacity-60">{new Date(entity.createdAt).toLocaleDateString()}</h2>
    </button>
  );
};

export default EntityHistory;
