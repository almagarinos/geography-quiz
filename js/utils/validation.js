// Utilidades de validación y normalización.
window.ValidationUtils = (() => {

    // Comprueba si un valor existe
    function isDefined(value) {
        return value !== undefined && value !== null;
    }

    // Comprueba si una cadena tiene contenido
    function isNotEmpty(value) {
        return typeof value === "string" && value.trim().length > 0;
    }

    // Comprueba si un valor es numérico
    function isNumber(value) {
        return Number.isFinite(Number(value));
    }

    // Comprueba si un número es entero
    function isInteger(value) {
        return Number.isInteger(Number(value));
    }

    // Comprueba si un número está dentro de un rango específico
    function isInRange(value, min, max) {
        if (!isNumber(value)) {
            return false;
        }

        const number = Number(value);

        return number >= min && number <= max;
    }

    /**
     * Normaliza texto para que sea más fácil buscarlo o compararlo.
     * Quita los espacios sobrantes, pasa todo a minúsculas y elimina
     * los acentos (tildes) o diéresis. Incluso normaliza las eñes, de
     * modo que "Espana" con un teclado inglés también sería válido.
     */
    function normalizeText(text = "") {
        return String(text)
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // Compara textos ignorando mayúsculas, tildes, diéresis, eñes y espacios extremos
    function isSameText(firstText = "", secondText = "") {
        return normalizeText(firstText) === normalizeText(secondText);
    }

    // Valida el nombre del jugador
    function isValidPlayerName(value, maxLength = 30) {
        if (!isNotEmpty(value)) {
            return false;
        }

        return value.trim().length <= maxLength;
    }

    // Valida el número máximo de preguntas
    function isValidQuestionCount(value) {
        return isInteger(value) && Number(value) >= 1 && Number(value) <= 100;
    }

    // Comprueba si es un array y tiene elementos
    function isArrayWithItems(array) {
        return Array.isArray(array) && array.length > 0;
    }

    // Comprueba si el valor es función
    function isFunction(value) {
        return typeof value === "function";
    }

    // Comprueba si el valor es objeto
    function isObject(value) {
        return value !== null && typeof value === "object" && !Array.isArray(value);
    }

    // Comprueba si una coordenada de latitud es válida
    function isValidLatitude(value) {
        return isInRange(value, -90, 90);
    }

    // Comprueba si una coordenada de longitud es válida
    function isValidLongitude(value) {
        return isInRange(value, -180, 180);
    }

    // Comprueba si una ciudad tiene la información mínima necesaria
    function isValidCity(city) {
        if (!isObject(city)) {
            return false;
        }

        return isDefined(city.nombre) && isDefined(city.pais) && isDefined(city.continente);
    }

    // Limita un número entre dos valores
    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    return {
        isDefined,
        isNotEmpty,
        isNumber,
        isInteger,
        isInRange,
        normalizeText,
        isSameText,
        isValidPlayerName,
        isValidQuestionCount,
        isArrayWithItems,
        isFunction,
        isObject,
        isValidLatitude,
        isValidLongitude,
        isValidCity,
        clamp,
    };
})();