// Utilidades para manipulación de arrays
window.ArrayUtils = (() => {

    // Elimina elementos duplicados
    function unique(array = []) {
        return [...new Set(array)];
    }

    // Devuelve una copia del array
    function clone(array = []) {
        return [...array];
    }

    // Divide un array en bloques
    function chunk(array = [], size = 1) {
        if (size <= 0) {
            return [];
        }

        const result = [];

        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }

        return result;
    }

    // Devuelve un array sin elementos falsy
    function compact(array = []) {
        return array.filter(Boolean);
    }

    // Obtiene la diferencia entre arrays
    function difference(source = [], excluded = []) {
        return source.filter((item) => !excluded.includes(item));
    }

    // Obtiene la intersección entre arrays
    function intersection(first = [], second = []) {
        return first.filter((item) => second.includes(item));
    }

    // Comprueba si dos arrays contienen exactamente los mismos valores
    function areEqual(first = [], second = []) {
        if (first.length !== second.length) {
            return false;
        }

        return first.every((value, index) => value === second[index]);
    }

    // Compara arrays ignorando el orden
    function haveSameValues(first = [], second = []) {
        if (first.length !== second.length) {
            return false;
        }

        const sortedFirst = [...first].sort();
        const sortedSecond = [...second].sort();

        return areEqual(sortedFirst, sortedSecond);
    }

    // Agrupa elementos por clave
    function groupBy(array = [], keySelector) {
        return array.reduce((groups, item) => {
            const key = keySelector(item);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(item);

            return groups;
        }, {});
    }

    // Ordena de forma ascendente por una propiedad
    function sortAsc(array = [], property) {
        return [...array].sort((a, b) => a[property] - b[property]);
    }

    // Ordena de forma descendente por una propiedad
    function sortDesc(array = [], property) {
        return [...array].sort((a, b) => b[property] - a[property]);
    }

    // Obtiene el valor máximo de una propiedad
    function maxBy(array = [], property) {
        if (array.length === 0) {
            return null;
        }

        return array.reduce((max, current) => (current[property] > max[property] ? current : max));
    }

    // Obtiene el valor mínimo de una propiedad
    function minBy(array = [], property) {
        if (array.length === 0) {
            return null;
        }

        return array.reduce((min, current) => (current[property] < min[property] ? current : min));
    }

    // Obtiene un rango de elementos
    function take(array = [], count = 0) {
        return array.slice(0, count);
    }

    // Omite los primeros elementos
    function drop(array = [], count = 0) {
        return array.slice(count);
    }

    // Inserta un elemento en una posición
    function insertAt(array = [], index, value) {
        const result = [...array];

        result.splice(index, 0, value);

        return result;
    }

    // Mueve un elemento de posición
    function moveItem(array = [], fromIndex, toIndex) {
        const result = [...array];

        const [movedItem] = result.splice(fromIndex, 1);

        result.splice(toIndex, 0, movedItem);

        return result;
    }

    // Suma valores numéricos
    function sum(array = []) {
        return array.reduce((total, value) => total + value, 0);
    }

    // Media aritmética
    function average(array = []) {
        if (array.length === 0) {
            return 0;
        }

        return sum(array) / array.length;
    }

    return {
        unique,
        clone,
        chunk,
        compact,
        difference,
        intersection,
        areEqual,
        haveSameValues,
        groupBy,
        sortAsc,
        sortDesc,
        maxBy,
        minBy,
        take,
        drop,
        insertAt,
        moveItem,
        sum,
        average,
    };
})();