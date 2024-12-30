import type EntityField from "./EntityField.type";

export default interface IEntity {
    id: number;
    className: string;
    fields: EntityField[];
    lombok: boolean;
    language: 'java' | 'typescript';
    createdAt: Date;
}
