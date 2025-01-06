import React from 'react';
import type IEntity from '../types/Entity.type';
import EntityHistory from './entityHistory';


interface Props {
  entities: IEntity[];
  onSelectEntity: (entity: IEntity) => void;
  setEntities: (entities: IEntity[]) => void;
}

const Aside: React.FC<Props> = ({ entities, onSelectEntity, setEntities }) => {
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
    <aside className="w-full sm:w-64 bg-coebg text-white flex flex-col max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] overflow-auto border border-gray-700 rounded">
      <h1 className="p-4 text-lg font-bold border-b border-gray-700">Entities created</h1>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          {entities.map((entity) => (
            <li key={entity.id} className="flex items-center justify-between mb-2 hover:text-gray-300">
              <EntityHistory
                entity={entity}
                onSelectEntity={onSelectEntity}
              />
              <button
                onClick={() => removeEntity(entity)}
                className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  width="20px"
                  src="icons/x.svg"
                  alt="Delete"
                />
              </button>
              <button
                onClick={() => editEntity(entity)}
                className="ml-2 text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform duration-200"
              >
                <img
                  width="20px"
                  src="icons/edit.svg"
                  alt="Edit"
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600">
          Create new entity
        </button>
      </div>
    </aside>


  );
};

export default Aside;
