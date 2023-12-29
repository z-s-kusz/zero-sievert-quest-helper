import Item from "./item";

export default interface CollectionType {
    name: string;
    id: string;
    items: Item[];
    editing: boolean;
}
