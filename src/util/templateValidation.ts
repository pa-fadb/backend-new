/**
 * Returns a name that is safe for stuff such as links.
 * 
 * 1. Remove extra whitespace around the name
 * 2. Replace all spaces with underscores ("`_`")
 * 3. Converts to lowercase.
 * 
 * @param name The name to convert.
 * @returns The safe name.
 */
export function toSafeName(name: string) {
    return name.trim().replaceAll(" ", "_").toLowerCase();
}

/**
 * Like {@link toSafeName}, but returns `undefined` if {@link name} is `undefined`.
 * 
 * @param name The name to convert.
 * @returns The safe name if {@link name} is a string, otherwise `undefined`.
 */
export function toSafeNameSafe(name: string | undefined) {
    return name !== undefined ? toSafeName(name) : undefined
}


/**
 * Returns `true` if the string is not `undefined` and not `""`, otherwise `false`.
 * 
 * @param value The value to check.
 * @returns The result of the check.
 */
export function isBlankString(value: string | undefined): boolean {
    return value === undefined || value === ""
}

/**
 * Returns the trimmed string if the value is not `undefined` or an empty string, otherwise returns `undefined`.
 * 
 * @param value The value to check.
 * @returns The trimmed {@link value} if {@link value} is not empty, otherwise `undefined`.
 */
export function ensureNotBlankString(value: string | undefined): string | undefined {
    return (value !== undefined && !isBlankString(value)) ? value.trim() : undefined;
}


/**
 * Returns `true` if the array is not `undefined` and the length is not 0, otherwise `false`.
 * 
 * @param value The value to check.
 * @returns The result of the check.
 */
export function isBlankArray(array: any[] | undefined): boolean {
    return array === undefined || array.length === 0
}

/**
 * Returns the array if it's not `undefined` and the length is not 0, otherwise `undefined`.
 * 
 * @param array The array to check.
 * @returns The cleaned {@link array} if {@link array} is not empty, otherwise `undefined`.
 */
export function ensureNotBlankArray<T extends any[]>(array: T | undefined): T | undefined {
    return !isBlankArray(array) ? array : undefined;
}


/**
 * Returns `true` if the cleaned array (no empty strings) is `undefined` or the length is not 0, otherwise `false`.
 * 
 * @param value The value to check.
 * @returns The result of the check.
 */
export function isBlankStringArray(array: string[] | undefined): boolean {
    return array === undefined || array.every((item) => isBlankString(item))
}

/**
 * Returns the cleaned array (no empty strings) if the cleaned array is not `undefined` or the length is 0, otherwise `undefined`.
 * 
 * @param array The array to check.
 * @returns The cleaned {@link array} if {@link array} is not empty, otherwise `undefined`.
 */
export function ensureNotBlankStringArray(array: string[] | undefined): string[] | undefined {
    if (array === undefined) return undefined;

    let newArray: string[] = [];
    array.forEach((item) => {
        let itemEnsured = ensureNotBlankString(item);
        if (itemEnsured !== undefined) newArray.push(itemEnsured);
    });

    if (newArray.length === 0) return undefined;
    else return newArray;
}
