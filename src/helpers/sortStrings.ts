export const stringCompareFunction = (a: string, b: string): number => {
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
}