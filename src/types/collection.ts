import Item from "./item";

export default interface CollectionType {
    name: string;
    complted: boolean;
    items: Item[];
    // editing: boolean;
}
