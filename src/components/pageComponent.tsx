// PageComponent.tsx
import React, { useState } from 'react';
import type IEntity from '../types/Entity.type';
import Aside from './aside';
import EntityJava from './entityJava';

const PageComponent = ({ entities }: { entities: IEntity[] }) => {
    // Usa useState para manejar el estado de la entidad seleccionada
    const [selectedEntity, setSelectedEntity] = useState<IEntity>(entities[0]);

    // Define el manejador de selección
    const handleSelectEntity = (entity: IEntity) => {
        setSelectedEntity(entity);
    };
    const other = () => {
        console.log('Entity selected:');
    }

    return (
        <div className="grid grid-cols-5">
            <div className="row-span-5 ml-20 mt-20">
                <Aside entities={entities} onSelectEntity={handleSelectEntity} />
            </div>

            <div className="col-span-2 row-span-5 mt-20">siuiuuu</div>

            <div className="col-span-2 row-span-5 col-start-4 mt-20">
                {/* Solo renderiza el componente EntityJava si hay una entidad seleccionada */}
                {/* {selectedEntity && <EntityJava entity={selectedEntity} />} */}
                <EntityJava entity={selectedEntity} />
            </div>
 
        </div>
    );
};

export default PageComponent;
