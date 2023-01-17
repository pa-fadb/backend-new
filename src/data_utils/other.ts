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
 * Returns the value if the value is "truthful", otherwise return `undefined`.
 * `value ? value : undefined`
 * 
 * @param value The value to check.
 * @returns The {@link value} if {@link value} is "truthful", otherwise `undefined`.
 */
export function ensureNotBlank(value: any) {
    return value ? value : undefined;
}
