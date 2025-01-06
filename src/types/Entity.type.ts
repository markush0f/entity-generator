import type EntityField from "./EntityField.type";

export default interface IEntity {
    id: number;
    className: string;
    fields: EntityField[];
    // constructorFields: boolean,
    voidConstructor: boolean,
    lombok: boolean;
    language: 'java' | 'typescript';
    createdAt: Date;
}

export default interface IFieldsConstructor {

}
