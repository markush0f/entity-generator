import type EntityField from "./EntityField.type";

export default interface IEntity {
    className: string;
    fields: EntityField[];
    lombok: boolean;
    language: 'java' | 'typescript';
    createdAt: Date;
}
