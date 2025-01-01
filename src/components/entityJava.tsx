import React from 'react';
import type IEntity from '../types/Entity.type';
import '../styles/styles.css';

interface Props {
  entity: IEntity;
}

const EntityJava: React.FC<Props> = ({ entity }) => {
  const { className, fields } = entity;

  const allFields = fields.map((field) => {
    const { name, type, nullable } = field;
    return `  <span class="text-green-500">private</span> <span class="text-blue-500">${type}</span> ${name}${nullable ? "?" : ""};`;
  });

  const gettersFields = fields.map((field) => {
    const { name, type } = field;
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);

    const OPEN_KEY = `<span class="text-yellow-400">{</span>`;
    const CLOSE_KEY = `<span class="text-yellow-400">}</span>`;
    const PUBLIC = `<span class="text-green-500">public</span>`;
    const TYPE = `<span class="text-yellow-300">${type}</span>`;
    const OPEN_PARENTESIS = `<span class="text-blue-400">(</span>`;
    const CLOSE_PARENTESIS = `<span class="text-blue-400">)</span>`;
    const RETURN = `<span class="text-blue-400">return</span>`;
    return `
    ${PUBLIC} ${TYPE} <span class="text-pink-400">get${nameFormatted}</span>${OPEN_PARENTESIS}${CLOSE_PARENTESIS} ${OPEN_KEY}
      ${RETURN} ${name};
    ${CLOSE_KEY}`;
  });

  const settersFields = fields.map((field) => {
    const { name, type } = field;
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
    const OPEN_KEY = `<span class="text-yellow-400">{</span>`;
    const CLOSE_KEY = `<span class="text-yellow-400">}</span>`;
    const PUBLIC = `<span class="text-green-500">public</span>`;
    const TYPE = `<span class="text-yellow-300">${type}</span>`;
    const TYPE_VARIABLE_FUNCTION = `<span class="text-pink-400">${type}</span>`;
    const OPEN_PARENTESIS = `<span class="text-blue-400">(</span>`;
    const CLOSE_PARENTESIS = `<span class="text-blue-400">)</span>`;
    const THIS = `<span class="text-blue-400">this.</span>`;
    return `
      ${PUBLIC} ${TYPE} <span class="text-blue-400">get${nameFormatted}${OPEN_PARENTESIS}${TYPE_VARIABLE_FUNCTION} <span class="text-white">${name}</span>${CLOSE_PARENTESIS}</span> ${OPEN_KEY}
        ${THIS}<span class="text-pink-400">${name}</span> = ${name};
      ${CLOSE_KEY}`;
  });

  const codeString = [
    `<span class="text-green-500">public class</span> <span class="text-yellow-300">${className}</span> <span class="text-blue-400">{</span>`,
    ...allFields,
    ...gettersFields,
    ...settersFields,
    `<span class="text-blue-400">}</span>`,
  ].join("\n");

  return (
    <div className="mr-20 text-white bg-codebg border border-gray-700 rounded overflow-auto max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] scrollbar">
      <pre className="font-code text-lg">
        {codeString.split("\n").map((line, index) => (
          <div className="flex items-start transition-all duration-300 code-line" key={index}>
            <span className="w-[30px] text-right mr-[10px] text-white/50 select-none">{index + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        ))}
      </pre>
    </div>
  );
};

export default EntityJava;
