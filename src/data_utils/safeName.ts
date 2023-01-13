export function toSafeName(name: string) {
    return name.trim().replaceAll(" ", "_").toLowerCase();
}