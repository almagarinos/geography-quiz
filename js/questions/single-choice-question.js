/**
 * Preguntas de tipo test con una única respuesta correcta.
 *
 * Formato estándar:
 * {
 *   id,
 *   type: "single-choice",
 *   statement,
 *   options,
 *   correctAnswer,
 *   metadata
 * }
 */
window.SingleChoiceQuestion = (() => {
    
    // Mezcla opciones y construye la pregunta final
    function buildQuestion(statement, options, correctAnswer, metadata = {}) {
        return {
            id: RandomUtils.generateId("single-choice"),

            type: "single-choice",

            statement,

            options: RandomUtils.shuffle(options),

            correctAnswer,

            metadata,
        };
    }

    /**
     * ¿Cuál es la capital de X? OJO: aquí sólo se muestran ciudades que
     * son capitales, pero sería interesante mostrar ciudades del mismo
     * país, si al menos tiene 4, y preguntar cuál de ellas es la capital.
     * También se podrían mostrar 2 de ese país y 2 de otro país cercano.
     */
    function capitalOfCountryQuestion(cities) {
        const capitals = GeoUtils.getCapitals(cities);

        const capital = RandomUtils.pick(capitals);

        const distractors = RandomUtils.pickMany(
            capitals.filter((city) => city.nombre !== capital.nombre),
            3
        );

        return buildQuestion(
            `¿Cuál es la capital de ${capital.pais}?`,
            [capital.nombre, ...distractors.map((city) => city.nombre)],
            capital.nombre,
            {
                city: capital,
            }
        );
    }

    // ¿En qué país está una ciudad?
    function countryOfCityQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const countries = ArrayUtils.unique(cities.map((item) => item.pais));

        const distractors = RandomUtils.pickMany(
            countries.filter((country) => country !== city.pais),
            3
        );

        return buildQuestion(`¿En qué país está ${city.nombre}?`, [city.pais, ...distractors], city.pais, {
            city,
        });
    }

    // ¿A qué continente pertenece?
    function continentOfCityQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const continents = ArrayUtils.unique(cities.map((item) => item.continente));

        const distractors = RandomUtils.pickMany(
            continents.filter((continent) => continent !== city.continente),
            3
        );

        return buildQuestion(
            `¿A qué continente pertenece ${city.nombre}?`,
            [city.continente, ...distractors],
            city.continente,
            {
                city,
            }
        );
    }

    // ¿Qué ciudad pertenece a un país?
    function cityOfCountryQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const distractors = RandomUtils.pickMany(
            cities.filter((item) => item.pais !== city.pais),
            3
        );

        return buildQuestion(
            `¿Cuál de estas ciudades pertenece a ${city.pais}?`,
            [city.nombre, ...distractors.map((item) => item.nombre)],
            city.nombre,
            {
                city,
            }
        );
    }

    // Ciudad más al norte
    function northernmostCityQuestion(cities) {
        const options = RandomUtils.pickMany(cities, 4);

        const correctCity = options.reduce((north, current) =>
            Number(current.coordenada.latitud) > Number(north.coordenada.latitud) ? current : north
        );

        return buildQuestion(
            "¿Cuál de estas ciudades está más al norte?",
            options.map((city) => city.nombre),
            correctCity.nombre,
            {
                cities: options,
            }
        );
    }

    // Ciudad más al sur
    function southernmostCityQuestion(cities) {
        const options = RandomUtils.pickMany(cities, 4);

        const correctCity = options.reduce((south, current) =>
            Number(current.coordenada.latitud) < Number(south.coordenada.latitud) ? current : south
        );

        return buildQuestion(
            "¿Cuál de estas ciudades está más al sur?",
            options.map((city) => city.nombre),
            correctCity.nombre,
            {
                cities: options,
            }
        );
    }

    // Ciudad más al este
    function easternmostCityQuestion(cities) {
        const options = RandomUtils.pickMany(cities, 4);

        const correctCity = options.reduce((east, current) =>
            Number(current.coordenada.longitud) > Number(east.coordenada.longitud) ? current : east
        );

        return buildQuestion(
            "¿Cuál de estas ciudades está más al este?",
            options.map((city) => city.nombre),
            correctCity.nombre,
            {
                cities: options,
            }
        );
    }

    // Ciudad más al oeste
    function westernmostCityQuestion(cities) {
        const options = RandomUtils.pickMany(cities, 4);

        const correctCity = options.reduce((west, current) =>
            Number(current.coordenada.longitud) < Number(west.coordenada.longitud) ? current : west
        );

        return buildQuestion(
            "¿Cuál de estas ciudades está más al oeste?",
            options.map((city) => city.nombre),
            correctCity.nombre,
            {
                cities: options,
            }
        );
    }

    // Generador aleatorio. Si se quiere hacer pruebas, se deja en generators lo que interese.
    function generate(cities) {
        const generators = [
            capitalOfCountryQuestion,
            countryOfCityQuestion,
            continentOfCityQuestion,
            cityOfCountryQuestion,
            northernmostCityQuestion,
            southernmostCityQuestion,
            easternmostCityQuestion,
            westernmostCityQuestion,
        ];

        const generator = RandomUtils.pick(generators);

        return generator(cities);
    }

    return {
        generate,
        capitalOfCountryQuestion,
        countryOfCityQuestion,
        continentOfCityQuestion,
        cityOfCountryQuestion,
        northernmostCityQuestion,
        southernmostCityQuestion,
        easternmostCityQuestion,
        westernmostCityQuestion,
    };
})();