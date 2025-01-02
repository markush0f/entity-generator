import React, { useState } from 'react';
import type EntityField from '../types/EntityField.type';

const CreateEntity = () => {
    const [fields, setFields] = useState<EntityField[]>([]);
    const [className, setClassName] = useState('');
    const [language, setLanguage] = useState('Java'); // Predeterminado a 'Java'
    const [showAddField, setShowAddField] = useState(false);

    const toggleFields = () => {
        setShowAddField(!showAddField);
    };

    const addFieldForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const fieldName = (e.currentTarget.fieldName as HTMLInputElement).value;
        const fieldType = (e.currentTarget.fieldType as HTMLInputElement).value;
        const setter = (e.currentTarget.setter as HTMLInputElement).checked;
        const getter = (e.currentTarget.getter as HTMLInputElement).checked;

        setFields((prevFields) => [
            ...prevFields,
            { name: fieldName, type: fieldType, setter, getter },
        ]);

        e.currentTarget.reset(); // Resetea el formulario
        toggleFields(); // Cierra el formulario después de agregar un campo
    };

    const createEntity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const entity = {
            className,
            language,
            fields,
        };

        console.log('Entidad creada:', entity);

        setFields([]);
        setClassName('');
        setLanguage('Java');
    };

    return (
        <div className="p-8">
            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">New Entity</h1>

                <form onSubmit={createEntity} className="space-y-4">
                    <div>
                        <label htmlFor="className" className="block font-medium mb-1">
                            Class name:
                        </label>
                        <input
                            type="text"
                            id="className"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-full border border-gray-300 bg-codebg rounded-md shadow-sm focus:outline-none px-2 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block font-medium mb-1">
                            Language:
                        </label>
                        <input
                            type="text"
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full border border-gray-300 bg-codebg rounded-md shadow-sm focus:outline-none px-2 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 border-2 border-codebg  hover:border-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Create Entity
                    </button>
                </form>

                {fields.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold">Fields</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {fields.map((field, index) => (
                                <li key={`${field.name}-${index}`} className="">
                                    <span className="font-medium">{field.name}</span> : {field.type}
                                    {field.getter && ' (Getter)'}
                                    {field.setter && ' (Setter)'}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {showAddField ? (
                    <form onSubmit={addFieldForm} className="space-y-4 mt-4">
                        <p className="text-xl text-gray-500">Adding field...</p>
                        <div>
                            <label htmlFor="fieldName" className="block font-medium mb-1">
                                Field name:
                            </label>
                            <input
                                type="text"
                                id="fieldName"
                                name="fieldName"
                                className="w-full border border-gray-300 bg-codebg rounded-md shadow-sm focus:outline-none px-2 py-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="fieldType" className="block font-medium mb-1">
                                Type:
                            </label>
                            <input
                                type="text"
                                id="fieldType"
                                name="fieldType"
                                className="w-full border border-gray-300 bg-codebg rounded-md shadow-sm focus:outline-none px-2 py-2"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Setter</span>
                                <input
                                    type="checkbox"
                                    id="setter"
                                    name="setter"
                                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                            <label className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Getter</span>
                                <input
                                    type="checkbox"
                                    id="getter"
                                    name="getter"
                                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={toggleFields}
                                type="button"
                                className="w-full border-2 border-codebg  hover:border-red-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full border-2 border-codebg  hover:border-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                            >
                                Accept
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={toggleFields}
                        type="button"
                        className="w-full mt-4 border-2 border-codebg  hover:border-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Add Field
                    </button>
                )}
            </div>
        </div>

    );
};

export default CreateEntity;
