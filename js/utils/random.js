// Utilidades para generación aleatoria.
window.RandomUtils = (() => {
    
    // Número entero aleatorio inclusivo
    function randomInt(min, max) {
        const lower = Math.ceil(min);
        const upper = Math.floor(max);

        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    // Número decimal aleatorio
    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Devuelve true o false aleatoriamente
    function randomBoolean() {
        return Math.random() >= 0.5;
    }

    // Devuelve un porcentaje aleatorio
    function randomPercentage() {
        return randomInt(0, 100);
    }

    // Devuelve -1 o 1
    function randomSign() {
        return randomBoolean() ? 1 : -1;
    }

    // Obtiene un índice válido aleatorio
    function randomIndex(array = []) {
        if (!Array.isArray(array) || array.length === 0) {
            return -1;
        }

        return randomInt(0, array.length - 1);
    }

    // Mezcla un array usando Fisher-Yates
    function shuffle(array = []) {
        const result = [...array];

        for (let i = result.length - 1; i > 0; i--) {
            const j = randomInt(0, i);

            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    // Selecciona un elemento aleatorio
    function pick(array = []) {
        if (!Array.isArray(array) || array.length === 0) {
            return null;
        }

        return array[randomInt(0, array.length - 1)];
    }

    // Selecciona N elementos aleatorios sin repetir
    function pickMany(array = [], count = 1) {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }

        const shuffled = shuffle(array);

        return shuffled.slice(0, Math.min(count, array.length));
    }

    // Devuelve un elemento distinto al proporcionado
    function pickDifferent(array = [], excludedValue) {
        const filtered = array.filter((item) => item !== excludedValue);

        return pick(filtered);
    }

    // Genera un identificador pseudoaleatorio
    function generateId(prefix = "id") {
        return [prefix, Date.now(), Math.random().toString(36).slice(2, 10)].join("-");
    }

    // Lanza una probabilidad. Ejemplo: chance(0.25) → 25 %
    function chance(probability = 0.5) {
        return Math.random() <= probability;
    }

    return {
        randomInt,
        randomFloat,
        randomBoolean,
        randomPercentage,
        randomSign,
        randomIndex,
        shuffle,
        pick,
        pickMany,
        pickDifferent,
        generateId,
        chance,
    };
})();