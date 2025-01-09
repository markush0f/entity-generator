import React, { useState, useEffect } from 'react';
import type IEntity from '../types/Entity.type';
import Aside from './aside';
import CreateEntity from './createEntity';
import EntityJava from './entityJava';
import '../styles/styles.css';
interface Props {
    firstEntities: IEntity[];
}

const PageComponent: React.FC<Props> = ({ firstEntities }) => {
    const [entities, setEntities] = useState<IEntity[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<IEntity | null>(null);

    useEffect(() => {
        if (!localStorage.getItem('hasVisited')) {

            localStorage.setItem('entities', JSON.stringify(firstEntities));
            localStorage.setItem('hasVisited', 'true');
        }
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

    return (
        <div className="grid grid-cols-5">
            <div className="row-span-5 ml-20 mt-20">
                <Aside
                    entities={entities}
                    onSelectEntity={handleSelectEntity}
                    setEntities={setEntities}
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
