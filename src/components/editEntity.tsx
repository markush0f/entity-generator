import { useState } from "react";
import type IEntity from "../types/Entity.type";

const EditEntity: React.FC<{ entity: IEntity; onSave: (updatedEntity: IEntity) => void; onCancel: () => void }> = ({ entity, onSave, onCancel }) => {
    const [className, setClassName] = useState(entity.className);
    const [language, setLanguage] = useState(entity.language);
    const [fields, setFields] = useState(entity.fields);

    const handleSave = () => {
        const updatedEntity = { ...entity, className, language, fields };
        onSave(updatedEntity);
    };

    return (
        <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-bold mb-4">Edit Entity</h2>
            <div className="mb-4">
                <label htmlFor="className" className="block font-medium mb-1">Class Name:</label>
                <input
                    id="className"
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full border border-gray-500 rounded px-2 py-1"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="language" className="block font-medium mb-1">Language:</label>
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'java' | 'typescript')}
                    className="w-full border border-gray-500 rounded px-2 py-1"
                >
                    <option value="java">Java</option>
                    <option value="typescript">TypeScript</option>
                </select>
            </div>
            {/* Aquí podrías añadir más campos para editar las propiedades específicas */}
            <div className="flex justify-end space-x-2">
                <button onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
            </div>
        </div>
    );
};


export default EditEntity;