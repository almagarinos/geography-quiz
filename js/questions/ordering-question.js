/**
 * Preguntas de ordenación mediante drag & drop. Se añade la pista del país.
 *
 * Formato estándar:
 * {
 *   id,
 *   type: "ordering",
 *   statement,
 *   items,
 *   correctOrder,
 *   metadata
 * }
 */
window.OrderingQuestion = (() => {

    // Constructor común
    function buildQuestion(statement, items, correctOrder, metadata = {}) {
        return {
            id: RandomUtils.generateId("ordering"),

            type: "ordering",

            statement,

            items: RandomUtils.shuffle(items),

            correctOrder,

            metadata,
        };
    }

    // Orden norte → sur
    function northToSouthQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 4);

        const correctOrder = GeoUtils.sortNorthToSouth(selected).map(
            (city) => city.nombre + " (" + city.pais + ")"
        );

        return buildQuestion(
            "Ordene las siguientes ciudades de norte a sur (mantenga pulsado y arrastre):",
            selected.map(
                (city) => city.nombre + " (" + city.pais + ")"
            ),
            correctOrder,
            {
                direction: "NORTH_TO_SOUTH",
                cities: selected,
            }
        );
    }

    // Orden sur → norte
    function southToNorthQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 4);

        const correctOrder = GeoUtils.sortSouthToNorth(selected).map(
            (city) => city.nombre + " (" + city.pais + ")"
        );

        return buildQuestion(
            "Ordene las siguientes ciudades de sur a norte (mantenga pulsado y arrastre):",
            selected.map(
                (city) => city.nombre + " (" + city.pais + ")"
            ),
            correctOrder,
            {
                direction: "SOUTH_TO_NORTH",
                cities: selected,
            }
        );
    }

    // Orden oeste → este
    function westToEastQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 4);

        const correctOrder = GeoUtils.sortWestToEast(selected).map(
            (city) => city.nombre + " (" + city.pais + ")"
        );

        return buildQuestion(
            "Ordene las siguientes ciudades de oeste a este (mantenga pulsado y arrastre):",
            selected.map(
                (city) => city.nombre + " (" + city.pais + ")"
            ),
            correctOrder,
            {
                direction: "WEST_TO_EAST",
                cities: selected,
            }
        );
    }

    // Orden este → oeste
    function eastToWestQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 4);

        const correctOrder = GeoUtils.sortEastToWest(selected).map(
            (city) => city.nombre + " (" + city.pais + ")"
        );

        return buildQuestion(
            "Ordene las siguientes ciudades de este a oeste (mantenga pulsado y arrastre):",
            selected.map(
                (city) => city.nombre + " (" + city.pais + ")"
            ),
            correctOrder,
            {
                direction: "EAST_TO_WEST",
                cities: selected,
            }
        );
    }

    // Valida una ordenación
    function validateAnswer(userOrder = [], correctOrder = []) {
        return ArrayUtils.areEqual(userOrder, correctOrder);
    }

    // Generador aleatorio. Si se quiere hacer pruebas, se deja en generators lo que interese.
    function generate(cities) {
        const generators = [northToSouthQuestion, southToNorthQuestion, westToEastQuestion, eastToWestQuestion];

        const generator = RandomUtils.pick(generators);

        return generator(cities);
    }

    return {
        generate,
        validateAnswer,
        northToSouthQuestion,
        southToNorthQuestion,
        westToEastQuestion,
        eastToWestQuestion,
    };
})();