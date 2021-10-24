export const isFloat = (n): boolean => {
    return Number(n) === n && n % 1 !== 0;
}