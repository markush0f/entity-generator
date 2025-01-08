import type EntityField from "./EntityField.type";

export default interface IEntity {
    id: number;
    idClass: boolean;
    className: string;
    fields: EntityField[];
    allArgsConstructor: boolean,
    voidConstructor: boolean,
    lombok: boolean;
    language: 'java' | 'typescript';
    createdAt: Date;
}
