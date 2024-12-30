// Aside.tsx

import React, { useState } from 'react';
import EntityHistory from './entityHistory';
import type IEntity from '../types/Entity.type';

interface Props {
  entities: IEntity[];
}

const Aside: React.FC<Props> = ({ entities }) => {
  const [selectedEntity, setSelectedEntity] = useState<IEntity | null>(null);

  const handleSelectEntity = (entity: IEntity) => {
    console.log(entity); // Asegúrate de ver la entidad seleccionada
    setSelectedEntity(entity); // Actualiza el estado con la entidad seleccionada
  };

  return (
    <aside className="w-64 bg-codebg text-white flex flex-col max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] overflow-auto border border-gray-700 rounded">
      <h1 className="p-4 text-lg font-bold border-b border-gray-700">Entities created</h1>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          {entities.map((entity) => (
            <EntityHistory 
              key={entity.id} 
              entity={entity}
              onSelectEntity={handleSelectEntity} // Aquí pasamos la función como prop
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
