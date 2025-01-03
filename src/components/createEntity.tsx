import React, { useState } from 'react';
import type IEntity from '../types/Entity.type';

interface Props {
    onAddEntity: (entity: IEntity) => void;
}

const CreateEntity: React.FC<Props> = ({ onAddEntity }) => {
    const [className, setClassName] = useState('');
    const [language, setLanguage] = useState<'java' | 'typescript'>('java');
    const [errors, setErrors] = useState<{ className?: string; language?: string }>({});

    const validate = () => {
        const validationErrors: { className?: string; language?: string } = {};

        if (!className.trim()) {
            validationErrors.className = 'Class name is required.';
        } else if (!/^[A-Z][a-zA-Z0-9]*$/.test(className)) {
            validationErrors.className =
                'Class name must start with an uppercase letter and contain only letters and numbers.';
        }

        if (!language) {
            validationErrors.language = 'Language is required.';
        } else if (!['java', 'typescript'].includes(language)) {
            validationErrors.language = 'Language must be "java" or "typescript".';
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const createEntity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }
        const newEntity: IEntity = {
            id: Date.now(),
            className,
            language,
            fields: [],
            lombok: false,
            createdAt: new Date(),
        };

        onAddEntity(newEntity);
        setClassName('');
        setLanguage('java');
        setErrors({});
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
                            className={`w-full border rounded-md shadow-sm focus:outline-none px-2 py-2 ${errors.className ? 'border-red-500 bg-codebg' : 'border-gray-300 bg-codebg'
                                }`}
                        />
                        {errors.className && (
                            <p className="text-red-500 text-sm mt-1">{errors.className}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="language" className="block font-medium mb-1">
                            Language:
                        </label>
                        <input
                            type="text"
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as 'java' | 'typescript')}
                            className={`w-full border rounded-md shadow-sm focus:outline-none px-2 py-2 ${errors.language ? 'border-red-500 bg-codebg' : 'border-gray-300 bg-codebg'
                                }`}
                        />
                        {errors.language && (
                            <p className="text-red-500 text-sm mt-1">{errors.language}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 border-2 border-codebg hover:border-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Create Entity
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEntity;
