// Aside.tsx
import React from 'react';
import EntityHistory from './entityHistory';
import type IEntity from '../types/Entity.type';

interface Props {
  entities: IEntity[];
  onSelectEntity: (entity: IEntity) => void; 
}

const Aside: React.FC<Props> = ({ entities, onSelectEntity }) => {
  return (
    <aside className="w-64 bg-coebg text-white flex flex-col max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] overflow-auto border border-gray-700 rounded">
      <h1 className="p-4 text-lg font-bold border-b border-gray-700">Entities created</h1>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          {entities.map((entity) => (
            <EntityHistory
              key={entity.id}
              entity={entity}
              onSelectEntity={onSelectEntity} // Pasa la función a cada item
            />
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
