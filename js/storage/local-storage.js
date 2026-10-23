/**
 * Capa de acceso a localStorage. Centraliza las operaciones de lectura
 * y escritura para facilitar futuras migraciones a una API o backend.
 */
window.StorageService = (() => {
    
    const KEYS = {
        LEADERBOARD: "geography_quiz",
    };

    /**
     * Comprueba si localStorage está disponible, porque puede exceder su límite y dar
     * un QuotaExceededError, así que al usar setItem hay que gestionar las expeciones.
     */
    function isAvailable() {
        try {
            const testKeyName = "geography_quiz_test";
            localStorage.setItem(testKeyName, "testing key");
            //console.log("Test:", localStorage.getItem(testKeyName));
            localStorage.removeItem(testKeyName);
            return true;
        } catch {
            return false;
        }
    }

    // Obtiene un valor JSON
    function get(key, defaultValue = null) {
        if (!isAvailable()) {
            return defaultValue;
        }

        try {
            const value = localStorage.getItem(key);

            if (value === null) {
                return defaultValue;
            }

            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    }

    // Guarda un valor JSON
    function set(key, value) {
        if (!isAvailable()) {
            return false;
        }

        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    }

    // Elimina una clave
    function remove(key) {
        if (!isAvailable()) {
            return false;
        }

        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    // Limpia todo el almacenamiento
    function clear() {
        if (!isAvailable()) {
            return false;
        }

        try {
            localStorage.clear();
            return true;
        } catch {
            return false;
        }
    }

    // Obtiene el leaderboard completo
    function getLeaderboard() {
        return get(KEYS.LEADERBOARD, []);
    }

    // Guarda el leaderboard completo
    function saveLeaderboard(entries = []) {
        return set(KEYS.LEADERBOARD, entries);
    }

    // Añade una entrada al leaderboard
    function addLeaderboardEntry(entry) {
        const leaderboard = getLeaderboard();
        leaderboard.push(entry);
        saveLeaderboard(leaderboard);
        return leaderboard;
    }

    // Elimina todos los resultados
    function clearLeaderboard() {
        return remove(KEYS.LEADERBOARD);
    }

    // Devuelve número de registros
    function getLeaderboardCount() {
        return getLeaderboard().length;
    }

    // Exporta todos los datos
    function exportData() {
        return {
            leaderboard: getLeaderboard(),
        };
    }

    // Importa datos previamente exportados
    function importData(data = {}) {
        if (!ValidationUtils.isObject(data)) {
            return false;
        }

        if (Array.isArray(data.leaderboard)) {
            saveLeaderboard(data.leaderboard);
        }

        return true;
    }

    return {
        KEYS,
        isAvailable,
        get,
        set,
        remove,
        clear,
        getLeaderboard,
        saveLeaderboard,
        addLeaderboardEntry,
        clearLeaderboard,
        getLeaderboardCount,
        exportData,
        importData,
    };
})();