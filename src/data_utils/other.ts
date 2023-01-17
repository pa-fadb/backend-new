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
 * Returns the value if the value is a blank string or an empty array, otherwise return `undefined`.
 * 
 * @param value The value to check.
 * @returns The {@link value} if {@link value} is not empty, otherwise `undefined`.
 */
export function ensureNotBlank<T>(value: T): T | undefined {
    let isNotBlank =
        value !== undefined &&
        value !== "" &&
        (
            Array.isArray(value) &&
            value.length !== 0 &&
            value.every((innerValue) => (typeof innerValue === "string") && innerValue !== "")
        )

    return isNotBlank ? value : undefined;
}
