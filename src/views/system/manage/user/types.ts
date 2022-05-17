export interface OrgTreeItem {
    title: string;
    key: string;
    value: string;
    path?: string[];
    children?: OrgTreeItem[];
}
