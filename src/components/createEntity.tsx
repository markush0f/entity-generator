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
  const [showAddField, setShowAddField] = useState(false);

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
      className,
      language: "java",
      fields,
      voidConstructor,
      lombok: false,
      createdAt: new Date(),
    };

    onAddEntity(newEntity);
    setFields([]);
    setClassName('');
    setVoidConstructor(false);
  };
  const cancelField = (fieldName: string) => {
    const fieldsUpdated = fields.filter((field) => field.name !== fieldName);
    setFields(fieldsUpdated);
  }

  return (
    <div className="p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Entity</h1>

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
            {classNameError && (
              <p className="text-red-500 text-sm mt-1">{classNameError}</p>
            )}
          </div>
          <div>
            <div>
              <label className="flex items-center space-x-2">
                <span className="text-sm font-medium">Constructor</span>
                <input
                  type="checkbox"
                  id="constructor"
                  name="constructor"
                  className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 border-2 border-codebg hover:border-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
          >
            Create Entity
          </button>
        </form>

        {fields.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Fields</h2>
            <ul className="list-disc list-inside space-y-2">
              {fields.map((field, index) => (
                <li key={`${field.name}-${index}`}>
                  <span className="font-medium">{field.name}</span> : {field.type}
                  <button onClick={() => cancelField(field.name)} className='ml-4'> <img src="/icons/delete.svg" alt="delete" width={40}/></button>
                  {field.getter && ' (Getter)'}
                  {field.setter && ' (Setter)'}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showAddField ? (
          <CreateField addFieldForm={addFieldForm} onCancel={toggleFields} />
        ) : (
          <button
            onClick={toggleFields}
            type="button"
            className="w-full mt-4 border-2 border-codebg hover:border-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
          >
            Add Field
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEntity;
