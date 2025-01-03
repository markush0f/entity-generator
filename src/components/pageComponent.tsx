import React, { useState, useEffect } from 'react';
import type IEntity from '../types/Entity.type';
import Aside from './Aside';
import CreateEntity from './CreateEntity';
import EntityJava from './EntityJava';

const PageComponent = () => {
    const [entities, setEntities] = useState<IEntity[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<IEntity | null>(null);

    useEffect(() => {
        const storedEntities = JSON.parse(localStorage.getItem('entities') || '[]');
        setEntities(storedEntities);

        // Selecciona la primera entidad solo si existe alguna
        if (storedEntities.length > 0) {
            setSelectedEntity(storedEntities[0]);
        }
    }, []);

    const addEntity = (newEntity: IEntity) => {
        const updatedEntities = [...entities, newEntity];
        setEntities(updatedEntities);
        localStorage.setItem('entities', JSON.stringify(updatedEntities));
    };

    const handleSelectEntity = (entity: IEntity) => {
        console.log('Entidad seleccionada:', entity);
        setSelectedEntity(entity);
    };

    const handleRemoveEntity = (entityToRemove: IEntity) => {
        const updatedEntities = entities.filter(
            (entity) => entity.className !== entityToRemove.className
        );
        setEntities(updatedEntities);
        localStorage.setItem('entities', JSON.stringify(updatedEntities));

        // Actualiza la entidad seleccionada si la eliminada estaba seleccionada
        if (selectedEntity?.className === entityToRemove.className) {
            setSelectedEntity(updatedEntities.length > 0 ? updatedEntities[0] : null);
        }
    };

    return (
        <div className="grid grid-cols-5">
            <div className="row-span-5 ml-20 mt-20">
                <Aside
                    entities={entities}
                    onSelectEntity={handleSelectEntity}

                />
            </div>
            <div className="col-span-2 row-span-5 mt-20">
                <CreateEntity onAddEntity={addEntity} />
            </div>
            <div className="col-span-2 row-span-5 col-start-4 mt-20">
                {/* Renderiza EntityJava solo si hay una entidad seleccionada */}
                {selectedEntity ? (
                    <EntityJava entity={selectedEntity} />
                ) : (
                    <p className="text-center text-gray-500">No entity selected</p>
                )}
            </div>
        </div>
    );
};

export default PageComponent;
