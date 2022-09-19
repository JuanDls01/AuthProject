export const persistLocalStorage = <T>(key: string, value: T) => {
    // Acá habría que ver que guardamos del usuario, no habría que guardar info sensible.
    // También podemos usar redux persist
    localStorage.setItem(key, JSON.stringify({ ...value }));
}

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}