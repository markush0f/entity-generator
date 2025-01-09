// EntityHistory.tsx
import React from 'react';
import type IEntity from '../types/Entity.type';

interface Props {
  entities: IEntity[];
  entity: IEntity;
  onSelectEntity: (entity: IEntity) => void;
  setEntities: (entities: IEntity[]) => void;
}

const EntityHistory: React.FC<Props> = ({ entity, onSelectEntity, setEntities, entities }) => {
  const handleClick = () => {
    console.log('Entity selected:', entity);
    onSelectEntity(entity);
  };


  const removeEntity = (entityToRemove: IEntity) => {
    const updatedEntities = entities.filter(
      (entity) => entity.className !== entityToRemove.className
    );
    setEntities(updatedEntities);
    localStorage.setItem('entities', JSON.stringify(updatedEntities));
  };

  const editEntity = (updatedEntity: IEntity) => {
    const updatedEntities = entities.map((entity) =>
      entity.id === updatedEntity.id ? updatedEntity : entity
    );
    setEntities(updatedEntities);
    localStorage.setItem('entities', JSON.stringify(updatedEntities));
  };

  return (
    <div className="mb-1 p-2 flex items-center justify-between w-full">
      <button className="text-left flex-1 overflow-hidden" onClick={handleClick}>
        <h1
          className="lg:text-xl sm:text-2xl max-w-full overflow-hidden whitespace-nowrap text-ellipsis "
          style={{ display: 'block' }}
        >
          {entity.className}
        </h1>
        <h2 className="text-sm opacity-60">
          {new Date(entity.createdAt).toLocaleDateString()}
        </h2>
      </button>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => removeEntity(entity)}
          className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
        >
          <img
          className='lg:w-6 sm:w-7'
            src="icons/x.svg"
            alt="Delete"
          />
        </button>
        <button
          onClick={() => editEntity(entity)}
          className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform duration-200"
        >
          <img
            className='lg:w-6 sm:w-7'
            src="icons/edit.svg"
            alt="Edit"
          />
        </button>
      </div>
    </div>


  );
};

export default EntityHistory;
