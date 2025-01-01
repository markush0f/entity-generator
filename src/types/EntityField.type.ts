
export default interface EntityField {
    name: string;
    type: string;
    nullable?: boolean;
    getter: boolean;
    setter: boolean;
}