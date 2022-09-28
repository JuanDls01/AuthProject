export const persistLocalStorage = <T>(key: string, value: string) => {
    // Acá habría que ver que guardamos del usuario, no habría que guardar info sensible.
    // También podemos usar redux persist
    localStorage.setItem(key, value);
}

export const clearLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}