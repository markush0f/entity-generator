import React from 'react';
import type IEntity from '../types/Entity.type';
import EntityHistory from './entityHistory';

interface Props {
  entities: IEntity[];
  onSelectEntity: (entity: IEntity) => void;
  setEntities: (entities: IEntity[]) => void;
}

const Aside: React.FC<Props> = ({ entities, onSelectEntity, setEntities }) => {

  return (
    <aside className="w-full sm:w-64 bg-coebg text-white flex flex-col max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)] overflow-auto border border-gray-700 rounded aside-scrollbar">
      <h1 className="p-4 text-lg font-bold border-b border-gray-700">Entities created</h1>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          {entities.length > 0 ? (
            entities.map((entity) => (
              <li key={entity.id} className="flex items-center justify-between mb-2 hover:text-gray-300">
                <EntityHistory
                  entities={entities}
                  setEntities={setEntities}
                  entity={entity}
                  onSelectEntity={onSelectEntity}
                />
              </li>
            ))
          ) : (
            <li className="text-gray-500">No entities available</li>
          )}
        </ul>
      </nav>
    </aside>


  );
};

export default Aside;
