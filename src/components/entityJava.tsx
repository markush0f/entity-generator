import React, { useState } from 'react';
import type IEntity from '../types/Entity.type';
import '../styles/styles.css';
import type EntityField from '../types/EntityField.type';

interface Props {
  entity: IEntity;
}

const EntityJava: React.FC<Props> = ({ entity }) => {
  const [isCopied, setIsCopied] = useState(false);

  const { className, fields } = entity;

  const allFields = fields.map((field) => {
    const { name, type, nullable } = field;
    return `\t<span class="text-green-500">private</span> <span class="text-blue-500">${type}</span> ${name}${nullable ? "?" : ""};`;
  });

  const formatMethod = (field: EntityField, methodType: 'get' | 'set') => {
    const { name, type } = field;
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);

    const OPEN_KEY = `<span class="text-yellow-400">{</span>`;
    const CLOSE_KEY = `<span class="text-yellow-400">}</span>`;
    const PUBLIC = `<span class="text-green-500">public</span>`;
    const TYPE = `<span class="text-yellow-300">${type}</span>`;
    const OPEN_PARENTESIS = `<span class="text-blue-400">(</span>`;
    const CLOSE_PARENTESIS = `<span class="text-blue-400">)</span>`;
    const RETURN = `<span class="text-blue-400">return</span>`;
    const THIS = `<span class="text-blue-400">this.</span>`;

    if (methodType === 'get' && field.getter) {
      return `\t${PUBLIC} ${TYPE} <span class="text-pink-400">get${nameFormatted}</span>${OPEN_PARENTESIS}${CLOSE_PARENTESIS} ${OPEN_KEY}
      \t${RETURN} ${name};
    ${CLOSE_KEY}\n`;
    }

    const TYPE_VARIABLE_FUNCTION = `<span class="text-pink-400">${type}</span>`;
    if (methodType === 'set' && field.setter) {
      return `\t${PUBLIC} ${TYPE} <span class="text-blue-400">set${nameFormatted}${OPEN_PARENTESIS}${TYPE_VARIABLE_FUNCTION} <span class="text-white">${name}</span>${CLOSE_PARENTESIS}</span> ${OPEN_KEY}
      \t${THIS}<span class="text-pink-400">${name}</span> = ${name};
    ${CLOSE_KEY}\n`;
    }
  };

  const gettersFields = fields.map((field) => formatMethod(field, 'get'));
  const settersFields = fields.map((field) => formatMethod(field, 'set'));

  const defaultConstructor = `
\t<span class="text-green-500">public</span> <span class="text-yellow-300">${className}</span><span class="text-blue-400">()</span> <span class="text-yellow-400">{</span>
\t<span class="text-yellow-400">}</span>
  `;


  const allArgsConstructorParams = fields
    .map((field) => `<span class="text-blue-500">${field.type}</span> <span class="text-white">${field.name}</span>`)
    .join(", ");
  const allArgsConstructorBody = fields
    .map((field) => `\t\t<span class="text-blue-400">this.</span><span class="text-white">${field.name}</span> = ${field.name};`)
    .join("\n");

  const allArgsConstructor = `
\t<span class="text-green-500">public</span> <span class="text-yellow-300">${className}</span><span class="text-blue-400">(${allArgsConstructorParams})</span> <span class="text-yellow-400">{</span>
${allArgsConstructorBody}
\t<span class="text-yellow-400">}</span>
  `;

  const codeString = [
    `<span class="text-green-500">public class</span> <span class="text-yellow-300">${className}</span> <span class="text-blue-400">{</span>`,
    ...allFields,
    defaultConstructor,
    allArgsConstructor,
    ...gettersFields,
    ...settersFields,
    `<span class="text-blue-400">}</span>`,
  ].join("\n");

  const handleCopy = () => {
    const plainTextCode = codeString.replace(/<[^>]+>/g, '');
    navigator.clipboard.writeText(plainTextCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch();
  };

  return (
    <div className="relative">
      {/* Contenedor del código */}
      <div className="mr-20 text-white bg-codebg border border-gray-700 rounded overflow-auto max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] scrollbar">
        <pre className="font-code text-lg">
          {codeString.split("\n").map((line, index) => (
            <div
              className="flex items-start transition-all duration-300 code-line"
              key={index}
            >
              <span className="w-[30px] text-right mr-[10px] text-white/50 select-none">
                {index + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </div>
          ))}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className={`absolute top-2 right-24 py-2 px-4 transition-all duration-300 ${isCopied ? "text-green-500" : "text-white"
          }`}
      >
        {isCopied ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
};

export default EntityJava;
