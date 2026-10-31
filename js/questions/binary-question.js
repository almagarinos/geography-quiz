/**
 * Generador de preguntas binarias.
 *
 * Formato estándar:
 * {
 *   id,
 *   type: "binary",
 *   statement,
 *   options: ["Sí", "No"],
 *   correctAnswer,
 *   metadata
 * }
 */
window.BinaryQuestion = (() => {

    /**
     * Capital del país. OJO: aquí sólo se contempla si la ciudad nombrada es o no
     * la capital de su país, pero siempre pertenecerá al país nombrado. Es decir,
     * aquí nunca se contempla una pregunta como "¿París es la capital de España?".
     */
    function capitalQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const isCorrect = GeoUtils.isCapital(city);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `¿${city.nombre} es la capital de ${city.pais}?`,
            options: ["Sí", "No"],
            correctAnswer: isCorrect ? "Sí" : "No",
            metadata: {
                city,
            },
        };
    }

    // Pertenencia al continente
    function continentQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const allContinents = ArrayUtils.unique(cities.map((item) => item.continente));

        const shouldBeCorrect = RandomUtils.randomBoolean();

        let continent;

        if (shouldBeCorrect) {
            continent = city.continente;
        } else {
            continent = RandomUtils.pick(allContinents.filter((item) => item !== city.continente));
        }

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `¿${city.nombre} pertenece a ${continent}?`,
            options: ["Sí", "No"],
            correctAnswer: continent === city.continente ? "Sí" : "No",
            metadata: {
                city,
                continent,
            },
        };
    }

    // Pertenencia al país
    function countryQuestion(cities) {
        const city = RandomUtils.pick(cities);

        const countries = ArrayUtils.unique(cities.map((item) => item.pais));

        const shouldBeCorrect = RandomUtils.randomBoolean();

        let country;

        if (shouldBeCorrect) {
            country = city.pais;
        } else {
            country = RandomUtils.pick(countries.filter((item) => item !== city.pais));
        }

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `¿${city.nombre} está en ${country}?`,
            options: ["Sí", "No"],
            correctAnswer: country === city.pais ? "Sí" : "No",
            metadata: {
                city,
                country,
            },
        };
    }

    // Pertenencia al hemisferio norte
    function northernHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${city.nombre} está en el hemisferio norte (al norte del ecuador terrestre).`,
            options: ["Sí", "No"],
            correctAnswer: GeoUtils.isNorthernHemisphere(city.coordenada.latitud) ? "Sí" : "No",
            metadata: {
                city,
            },
        };
    }

    // Pertenencia al hemisferio sur
    function southernHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${city.nombre} está en el hemisferio sur (al sur del ecuador terrestre).`,
            options: ["Sí", "No"],
            correctAnswer: GeoUtils.isSouthernHemisphere(city.coordenada.latitud) ? "Sí" : "No",
            metadata: {
                city,
            },
        };
    }

    // Pertenencia al hemisferio este
    function easternHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${city.nombre} está en el hemisferio este (al este del meridiano de Greenwich).`,
            options: ["Sí", "No"],
            correctAnswer: GeoUtils.isEasternHemisphere(city.coordenada.longitud) ? "Sí" : "No",
            metadata: {
                city,
            },
        };
    }

    // Pertenencia al hemisferio oeste
    function westernHemisphereQuestion(cities) {
        const city = RandomUtils.pick(cities);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${city.nombre} está en el hemisferio oeste (al oeste del meridiano de Greenwich).`,
            options: ["Sí", "No"],
            correctAnswer: GeoUtils.isWesternHemisphere(city.coordenada.longitud) ? "Sí" : "No",
            metadata: {
                city,
            },
        };
    }

    // Comparación norte / sur
    function northOfQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const isNorth = Number(cityA.coordenada.latitud) > Number(cityB.coordenada.latitud);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `¿${cityA.nombre} está más al norte que ${cityB.nombre}?`,
            options: ["Sí", "No"],
            correctAnswer: isNorth ? "Sí" : "No",
            metadata: {
                cityA,
                cityB,
            },
        };
    }

    // Comparación sur / norte
    function southOfQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const isSouth = Number(cityA.coordenada.latitud) < Number(cityB.coordenada.latitud);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `¿${cityA.nombre} está más al sur que ${cityB.nombre}?`,
            options: ["Sí", "No"],
            correctAnswer: isSouth ? "Sí" : "No",
            metadata: {
                cityA,
                cityB,
            },
        };
    }

    // Comparación este / oeste
    function eastOfQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const isEast = Number(cityA.coordenada.longitud) > Number(cityB.coordenada.longitud);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${cityA.nombre} está más al este que ${cityB.nombre} (respecto al meridiano de Greenwich).`,
            options: ["Sí", "No"],
            correctAnswer: isEast ? "Sí" : "No",
            metadata: {
                cityA,
                cityB,
            },
        };
    }

    // Comparación oeste / este
    function westOfQuestion(cities) {
        const selected = RandomUtils.pickMany(cities, 2);

        const cityA = selected[0];
        const cityB = selected[1];

        const isWest = Number(cityA.coordenada.longitud) < Number(cityB.coordenada.longitud);

        return {
            id: RandomUtils.generateId("binary"),
            type: "binary",
            statement: `Indique si ${cityA.nombre} está más al oeste que ${cityB.nombre} (respecto al meridiano de Greenwich).`,
            options: ["Sí", "No"],
            correctAnswer: isWest ? "Sí" : "No",
            metadata: {
                cityA,
                cityB,
            },
        };
    }

    // Generador aleatorio. Si se quiere hacer pruebas, se deja en generators lo que interese.
    function generate(cities) {
        const generators = [
            capitalQuestion,
            continentQuestion,
            countryQuestion,
            northernHemisphereQuestion,
            southernHemisphereQuestion,
            easternHemisphereQuestion,
            westernHemisphereQuestion,
            northOfQuestion,
            southOfQuestion,
            eastOfQuestion,
            westOfQuestion,
        ];

        const generator = RandomUtils.pick(generators);

        return generator(cities);
    }

    return {
        generate,
        capitalQuestion,
        continentQuestion,
        countryQuestion,
        northernHemisphereQuestion,
        southernHemisphereQuestion,
        easternHemisphereQuestion,
        westernHemisphereQuestion,
        northOfQuestion,
        southOfQuestion,
        eastOfQuestion,
        westOfQuestion,
    };
})();