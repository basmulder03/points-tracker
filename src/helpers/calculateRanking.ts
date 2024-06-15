export const calculateRanking = (arr: number[], points: number): number => {
    arr.sort((a, b) => b - a);
    return arr.findIndex(i => i === points) + 1;
}