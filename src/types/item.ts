export default interface Item {
    name: string;
    id: string;
    count: number | null;
    completed: boolean;
    editing: boolean;
}
