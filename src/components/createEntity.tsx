import React, { useState, useEffect } from 'react';
import type EntityField from '../types/EntityField.type';

const CreateEntity = () => {


    const [fields, setFields] = useState<EntityField[]>([]);
    const [showAddField, setShowAddField] = useState(true);
    // const [showFields, setShowFields] = useState(false);

    const toggleFields = () => {
        setShowAddField(!showAddField);
    };

    const addFieldForm = (e: Event) => {
        e.preventDefault();
        if (!e.target) return;
        const fieldName = (e.target as HTMLFormElement).fieldName.value;
        const fieldType = (e.target as HTMLFormElement).fieldType.value;
        const setter = (e.target as HTMLFormElement).setter.checked;
        const getter = (e.target as HTMLFormElement).getter.checked;

        setFields((prevFields) => [
            ...prevFields,
            { name: fieldName, type: fieldType, setter, getter },
        ]);
    }

    return (
        <div className=" p-8">
            <div className=" max-w-xl mx-auto">
                <h1 className="text-2xl font-bold  mb-4 text-center">
                    New entity
                </h1>
                <div className="flex items-center space-x-2">
                    <label htmlFor="className" className="">
                        Class name:
                    </label>
                    <input
                        type="text"
                        id="className"
                        className="border-b border-gray-300 bg-codebg rounded-t-md shadow-sm focus:outline-none px-1"
                    />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <label htmlFor="language" className="">
                        Language:
                    </label>
                    <input
                        type="text"
                        id="language"
                        className="border-b border-gray-300 bg-codebg rounded-t-md shadow-sm focus:outline-none px-1"
                    />
                </div>

                {showAddField ? (
                    <div className="space-y-4">
                        <p className='pt-4 text-xl text-gray-500'>Adding field...</p>
                        <div className="flex items-center space-x-2 mt-4">
                            <label htmlFor="fieldName" className="">
                                Field name:
                            </label>
                            <input
                                type="text"
                                id="fieldName"
                                className="border-b border-gray-300 bg-codebg rounded-t-md shadow-sm focus:outline-none px-1"
                            />
                        </div>
                        <div className="flex items-center space-x-2 mt-4">
                            <label htmlFor="fieldType" className="">
                                Type:
                            </label>
                            <input
                                type="text"
                                id="fieldType"
                                className="border-b border-gray-300 bg-codebg rounded-t-md shadow-sm focus:outline-none px-1"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Setter</span>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                            <label className="flex items-center space-x-2">
                                <span className="text-sm font-medium">Getter</span>
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                                />
                            </label>
                        </div>
                        <div className='flex space-x-4'>
                            <button
                                onClick={toggleFields}
                                type="submit"
                                className="w-full border-2 border-codebg hover:border-red-600 py-2 px-4 rounded-lg focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full border-2 border-codebg hover:border-green-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-2"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={toggleFields}
                        type="submit"
                        className="w-full mt-4 border-2 border-codebg hover:border-blue-600 py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Add field
                    </button>
                )}
            </div>
        </div >
    );
}

export default CreateEntity;
