// PageComponent.tsx
import React, { useState, useEffect } from 'react';
import type IEntity from '../types/Entity.type';
import Aside from './aside';
import EntityJava from './entityJava';
import CreateEntity from './createEntity';

const PageComponent = ({ entities }: { entities: IEntity[] }) => {
    // ADD IN VOID ARRAY ENTITIES   
    useEffect(() => {
        localStorage.setItem("entities", JSON.stringify(entities));
        console.log("Entidades guardadas en LocalStorage");
    }, []);

    const [selectedEntity, setSelectedEntity] = useState<IEntity>(entities[0]);

    const handleSelectEntity = (entity: IEntity) => {
        setSelectedEntity(entity);
    };

    return (
        <div className="grid grid-cols-5">
            <div className="row-span-5 ml-20 mt-20">
                <Aside entities={entities} onSelectEntity={handleSelectEntity} />
            </div>

            <div className="col-span-2 row-span-5 mt-20">
                <CreateEntity />
            </div>

            <div className="col-span-2 row-span-5 col-start-4 mt-20">
                {/* Solo renderiza el componente EntityJava si hay una entidad seleccionada */}
                {/* {selectedEntity && <EntityJava entity={selectedEntity} />} */}
                <EntityJava entity={selectedEntity} />
            </div>

        </div>
    );
};

export default PageComponent;
