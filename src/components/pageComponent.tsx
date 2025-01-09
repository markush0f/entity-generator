import React, { useState, useEffect } from 'react';
import type IEntity from '../types/Entity.type';
import Aside from './aside';
import CreateEntity from './createEntity';
import EntityJava from './entityJava';
import '../styles/styles.css';
import { motion } from "framer-motion";


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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 p-4">
            {/* Aside - Ocupa toda la fila en móviles, pero una columna específica en pantallas más grandes */}
            <div className="row-span-5 sm:col-span-1 lg:ml-20 lg:mt-20">
                <Aside
                    entities={entities}
                    onSelectEntity={handleSelectEntity}
                    setEntities={setEntities}
                />
            </div>

            {/* CreateEntity - Ocupa toda la fila en móviles, ajusta su tamaño en pantallas medianas y grandes */}
            <div className="sm:col-span-1 lg:col-span-2 lg:row-span-5 lg:mt-20">
                <CreateEntity onAddEntity={addEntity} />
            </div>

            {/* EntityJava o mensaje alternativo */}
            <div className="sm:col-span-2 lg:col-span-2 lg:col-start-4 lg:row-span-5 lg:mt-20 lg:mr-20">
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
