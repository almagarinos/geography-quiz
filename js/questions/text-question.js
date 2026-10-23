/**
 * Preguntas con respuesta escrita.
 *
 * Formato estándar:
 * {
 *   id,
 *   type: "text",
 *   statement,
 *   placeholder,
 *   correctAnswer,
 *   metadata
 * }
 */
window.TextQuestion = (() => {

    // Constructor común
    function buildQuestion(statement, placeholder, correctAnswer, metadata = {}) {
        return {
            id: RandomUtils.generateId("text"),

            type: "text",

            statement,

            placeholder,

            correctAnswer,

            metadata,
        };
    }

    // ¿Cuál es la capital de un país?
    function capitalQuestion(cities) {
        const capitals = GeoUtils.getCapitals(cities);

        const city = RandomUtils.pick(capitals);

        return buildQuestion(`¿Cuál es la capital de ${city.pais}?`, "Escriba el nombre de la ciudad", city.nombre, {
            city,
        });
    }

    // ¿De qué país es una ciudad?
    function countryQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return buildQuestion(`¿De qué país es ${city.nombre}?`, "Escriba el nombre del país", city.pais, {
            city,
        });
    }

    // ¿A qué continente pertenece una ciudad?
    function continentQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return buildQuestion(
            `¿A qué continente pertenece ${city.nombre}?`,
            "Escriba el nombre del continente",
            city.continente,
            {
                city,
            }
        );
    }

    // OJO: también se podría preguntar "¿A qué continente pertenece un país?".

    // ¿Qué ciudad es la capital de un país?
    function cityCapitalQuestion(cities) {
        const capitals = GeoUtils.getCapitals(cities);

        const city = RandomUtils.pick(capitals);

        return buildQuestion(
            `¿Qué ciudad es la capital de ${city.pais}?`,
            "Escriba el nombre de la ciudad",
            city.nombre,
            {
                city,
            }
        );
    }

    // Hemisferio norte / sur
    function latitudeHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const correctAnswer = GeoUtils.getLatitudeHemisphere(city.coordenada.latitud);

        return buildQuestion(
            `¿En qué hemisferio se encuentra ${city.nombre} según su latitud?`,
            "Escriba norte o sur",
            correctAnswer,
            {
                city,
            }
        );
    }

    // Hemisferio este / oeste
    function longitudeHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const correctAnswer = GeoUtils.getLongitudeHemisphere(city.coordenada.longitud);

        return buildQuestion(
            `¿En qué hemisferio se encuentra ${city.nombre} según su longitud?`,
            "Escriba este u oeste",
            correctAnswer,
            {
                city,
            }
        );
    }

    // Ciudad más al norte entre dos
    function northernCityQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const correctAnswer =
            Number(cityA.coordenada.latitud) > Number(cityB.coordenada.latitud) ? cityA.nombre : cityB.nombre;

        return buildQuestion(
            `¿Qué ciudad está más al norte: ${cityA.nombre} o ${cityB.nombre}?`,
            "Escriba el nombre de la ciudad",
            correctAnswer,
            {
                cityA,
                cityB,
            }
        );
    }

    // Ciudad más al este entre dos
    function easternCityQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const correctAnswer =
            Number(cityA.coordenada.longitud) > Number(cityB.coordenada.longitud) ? cityA.nombre : cityB.nombre;

        return buildQuestion(
            `¿Qué ciudad está más al este: ${cityA.nombre} o ${cityB.nombre}?`,
            "Escriba el nombre de la ciudad",
            correctAnswer,
            {
                cityA,
                cityB,
            }
        );
    }

    // Valida respuesta escrita
    function validateAnswer(userAnswer, correctAnswer) {
        return ValidationUtils.isSameText(userAnswer, correctAnswer);
    }

    // Generador aleatorio. Si se quiere hacer pruebas, se deja en generators lo que interese.
    function generate(cities) {
        const generators = [
            capitalQuestion,
            countryQuestion,
            continentQuestion,
            cityCapitalQuestion,
            latitudeHemisphereQuestion,
            longitudeHemisphereQuestion,
            northernCityQuestion,
            easternCityQuestion,
        ];

        const generator = RandomUtils.pick(generators);

        return generator(cities);
    }

    return {
        generate,
        validateAnswer,
        capitalQuestion,
        countryQuestion,
        continentQuestion,
        cityCapitalQuestion,
        latitudeHemisphereQuestion,
        longitudeHemisphereQuestion,
        northernCityQuestion,
        easternCityQuestion,
    };
})();