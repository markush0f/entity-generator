import React, { useState } from 'react';
import type IEntity from '../types/Entity.type';
import type EntityField from '../types/EntityField.type';
import { motion } from "framer-motion";

interface Props {
  entity: IEntity;
}

const EntityJava: React.FC<Props> = ({ entity }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { className, fields, lombok } = entity; // Añadido lombok
  const [isDownload, setIsDownload] = useState(false);

  const allFields = fields.map((field) => {
    const { name, type, nullable } = field;
    return `  <span class="text-green-500">private</span> <span class="text-blue-500">${type}</span> ${name}${nullable ? "?" : ""};`;
  });

  const OPEN_KEY = `<span class="text-yellow-400">{</span>`;
  const CLOSE_KEY = `<span class="text-yellow-400">}</span>`;
  const PUBLIC = `<span class="text-green-500">public</span>`;
  const OPEN_PARENTESIS = `<span class="text-blue-400">(</span>`;
  const CLOSE_PARENTESIS = `<span class="text-blue-400">)</span>`;
  const RETURN = `<span class="text-blue-400">return</span>`;
  const THIS = `<span class="text-blue-400">this.</span>`;

  const formatMethod = (field: EntityField, methodType: 'get' | 'set') => {
    if (lombok) return null;
    const { name, type } = field;
    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
    const TYPE = `<span class="text-yellow-300">${type}</span>`;

    if (methodType === 'get' && field.getter) {
      return `  ${PUBLIC} ${TYPE} <span class="text-pink-400">get${nameFormatted}</span>${OPEN_PARENTESIS}${CLOSE_PARENTESIS} ${OPEN_KEY}
    ${RETURN} ${name};
  ${CLOSE_KEY}\n`;
    }
    const TYPE_VARIABLE_FUNCTION = `<span class="text-pink-400">${type}</span>`;

    if (methodType === 'set' && field.setter) {
      return `  ${PUBLIC} ${TYPE} <span class="text-blue-400">set${nameFormatted}${OPEN_PARENTESIS}${TYPE_VARIABLE_FUNCTION} <span class="text-white">${name}</span>${CLOSE_PARENTESIS}</span> ${OPEN_KEY}
    ${THIS}<span class="text-pink-400">${name}</span> = ${name};
  ${CLOSE_KEY}\n`;
    }
  };

  const allArgsConstructorParams = fields
    .map((field) => `<span class="text-pink-400">${field.type}</span> ${field.name}`)
    .join(", ");
  const allArgsConstructorBody = fields
    .map((field) => `    ${THIS}<span class="text-pink-400">${field.name}</span> = ${field.name};`)
    .join("\n");

  const allArgsConstructor = entity.allArgsConstructor && !lombok
    ? `  <span class="text-green-500">public</span> <span class="text-yellow-300">${className}</span>${OPEN_PARENTESIS}${allArgsConstructorParams}${CLOSE_PARENTESIS} ${OPEN_KEY}
${allArgsConstructorBody}
  ${CLOSE_KEY}\n`
    : null;

  const noArgsConstructor = entity.voidConstructor && !lombok
    ? `\n  <span class="text-green-500">public</span> <span class="text-yellow-300">${className}</span>${OPEN_PARENTESIS}${CLOSE_PARENTESIS} ${OPEN_KEY}${CLOSE_KEY}\n`
    : null;

  const lombokAnnotations = lombok
    ? `<span class="text-purple-500">@Getter</span>\n<span class="text-purple-500">@Setter</span>\n<span class="text-purple-500">@NoArgsConstructor</span>\n<span class="text-purple-500">@AllArgsConstructor</span>`
    : null;

  const gettersFields = fields.map((field) => formatMethod(field, 'get'));
  const settersFields = fields.map((field) => formatMethod(field, 'set'));
  const idClass = `  <span class="text-purple-500">@Id</span>\n  <span class="text-purple-500">@GeneratedValue(strategy=GenerationType.AUTO)</span>\n  <span class="text-green-500">private</span> <span class="text-blue-500">Long</span> id;`;;
  const codeString = [
    lombokAnnotations,
    `<span class="text-purple-500">@Entity</span>`,
    `<span class="text-green-500" >public class</span> <span class="text-yellow-300">${className}</span> <span class="text-blue-400">{</span>\n`,
    "",
    idClass,
    ...allFields,
    "",
    noArgsConstructor,
    "",
    allArgsConstructor,
    "",
    ...gettersFields,
    ...settersFields,
    `<span class="text-blue-400" >}</span> `,
  ].filter(Boolean)
    .join("\n")
    ;

  const plainTextCode = codeString.replace(/<[^>]+>/g, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  const handleDownload = () => {
    const blob = new Blob([plainTextCode], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${className}.java`;
    link.click();
    setIsDownload(true);
    setTimeout(() => setIsDownload(false), 2000);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="relative aside-scrollbar">
      <div className=" text-white bg-codebg border border-gray-700 rounded overflow-auto max-h-[calc(100vh-10rem)] max-w-full h-[calc(100vh-10rem)] ">
        <pre className="font-code lg:text-lg sm:text-xl">
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
      <div className="absolute top-0.5 right-8 mt-4 opacity-55">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleCopy}
          className={`mr-2 py-1 px-4 border-2 rounded-full lg:text-sm ${isCopied ? "text-green-500 border-green-500" : "text-white"} `}
        >
          {isCopied ? "Copied!" : "Copy"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          className={`py-1 ml-2 px-4  border-2 rounded-full lg:text-sm ${isDownload ? "text-blue-500 border-blue-500" : "text-white"} `}
          onClick={handleDownload}
        >
          {isDownload ? "Downloaded" : "Download"}
        </motion.button>
      </div>
    </div >
  );
};

export default EntityJava;
