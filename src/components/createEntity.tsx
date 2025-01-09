import React, { useState } from 'react';
import type IEntity from '../types/Entity.type';
import type EntityField from '../types/EntityField.type';
import CreateField from './createField';

interface Props {
  onAddEntity: (entity: IEntity) => void;
}

const CreateEntity: React.FC<Props> = ({ onAddEntity }) => {
  const [fields, setFields] = useState<EntityField[]>([]);
  const [className, setClassName] = useState('');
  const [voidConstructor, setVoidConstructor] = useState(false);
  const [allArgsConstructor, setAllArgsConstructor] = useState(false);
  const [showAddField, setShowAddField] = useState(false);
  const [lombok, setLombok] = useState(false);
  const [idClass, setIdClass] = useState(false);

  const [classNameError, setClassNameError] = useState<string | null>(null);

  const toggleFields = () => {
    setShowAddField(!showAddField);
    setClassNameError(null);
  };

  const addFieldForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldName = (e.currentTarget.fieldName as HTMLInputElement).value.trim();
    const fieldType = (e.currentTarget.fieldType as HTMLInputElement).value.trim();
    const setter = (e.currentTarget.setter as HTMLInputElement).checked;
    const getter = (e.currentTarget.getter as HTMLInputElement).checked;

    console.log(getter, setter)
    if (!fieldName || !fieldType) {
      return;
    }

    setFields((prevFields) => [
      ...prevFields,
      { name: fieldName, type: fieldType, setter, getter },
    ]);

    e.currentTarget.reset();
    toggleFields();
  };

  const validateFields = () => {
    let isValid = true;

    if (className.trim().length < 3) {
      setClassNameError('Class name must be at least 3 characters long.');
      isValid = false;
    } else {
      setClassNameError(null);
    }
    return isValid;
  };

  const createEntity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const newEntity: IEntity = {
      id: Math.random(),
      idClass,
      className,
      language: "java",
      fields,
      voidConstructor,
      lombok: lombok,
      createdAt: new Date(),
      allArgsConstructor: allArgsConstructor
    };

    onAddEntity(newEntity);
    setFields([]);
    setClassName('');
    setVoidConstructor(false);
    setLombok(false);
    setIdClass(false)
  };
  const cancelField = (fieldName: string) => {
    const fieldsUpdated = fields.filter((field) => field.name !== fieldName);
    setFields(fieldsUpdated);
  }

  return (
    <div className="p-4 sm:p-8 max-w-full sm:max-w-xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Add Entity</h1>

      <form onSubmit={createEntity} className="space-y-4">
        <div>
          <label htmlFor="className" className="block font-medium mb-1">Class name:</label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full border border-gray-300 bg-codebg rounded-md shadow-sm focus:outline-none px-2 py-2"
          />
          {classNameError && <p className="text-red-500 text-sm mt-1">{classNameError}</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium">Void Constructor</span>
            <input
              type="checkbox"
              checked={voidConstructor}
              onChange={(e) => setVoidConstructor(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium">Constructor</span>
            <input
              type="checkbox"
              checked={allArgsConstructor}
              onChange={(e) => setAllArgsConstructor(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium">Lombok</span>
            <input
              type="checkbox"
              checked={lombok}
              onChange={(e) => setLombok(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
          </label>
          <label className="flex items-center space-x-2">
            <span className="text-sm font-medium">id(auto)</span>
            <input
              type="checkbox"
              checked={idClass}
              onChange={(e) => setIdClass(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-4 border-2 border-codebg hover:border-green-600 text-white py-2 px-4 rounded-lg"
        >
          Create Entity
        </button>
      </form>

      {fields.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-center sm:text-left">Fields</h2>
          <ul className="list-disc list-inside space-y-2 max-h-52 overflow-auto scrollbar">
            {fields.map((field, index) => (
              <li key={index} className="text-center sm:text-left">
                <span className="font-medium">{field.name}</span> : {field.type}
                {field.getter && ' (Getter)'}
                {field.setter && ' (Setter)'}
                <button onClick={() => cancelField(field.name)} className="ml-4 text-red-500">X</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        {showAddField ? (
          <CreateField addFieldForm={addFieldForm} onCancel={toggleFields} />
        ) : (
          <button
            onClick={toggleFields}
            type="button"
            className="w-full border-2 border-codebg hover:border-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Add Field
          </button>
        )}
      </div>
    </div>

  );

};

export default CreateEntity;
