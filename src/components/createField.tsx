// FieldForm.tsx
import React from 'react';

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const FieldForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
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
          onClick={onCancel}
          type="button"
          className="w-full border-2 border-codebg hover:border-red-600 text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full border-2 border-codebg hover:border-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          Accept
        </button>
      </div>
    </form>
  );
};

export default FieldForm;
