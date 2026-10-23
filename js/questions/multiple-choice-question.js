/**
 * Preguntas tipo test con múltiples respuestas correctas.
 *
 * Formato estándar:
 * {
 *   id,
 *   type: "multiple-choice",
 *   statement,
 *   options,
 *   correctAnswers,
 *   metadata
 * }
 */
window.MultipleChoiceQuestion = (() => {

    // Constructor común
    function buildQuestion(statement, options, correctAnswers, metadata = {}) {
        return {
            id: RandomUtils.generateId("multiple-choice"),

            type: "multiple-choice",

            statement,

            options: RandomUtils.shuffle(options),

            correctAnswers,

            metadata,
        };
    }

    // Cuáles son del hemisferio norte
    function northernCitiesQuestion(cities) {
        const northern = GeoUtils.getNorthernCities(cities);
        const southern = GeoUtils.getSouthernCities(cities);

        const correct = RandomUtils.pickMany(northern, 2);
        const incorrect = RandomUtils.pickMany(southern, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            "¿Qué dos ciudades están en el hemisferio norte?",
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                cities: options,
            }
        );
    }

    // Cuáles son del hemisferio sur
    function southernCitiesQuestion(cities) {
        const southern = GeoUtils.getSouthernCities(cities);
        const northern = GeoUtils.getNorthernCities(cities);

        const correct = RandomUtils.pickMany(southern, 2);
        const incorrect = RandomUtils.pickMany(northern, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            "¿Qué dos ciudades están en el hemisferio sur?",
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                cities: options,
            }
        );
    }

    // Cuáles son del hemisferio este
    function easternCitiesQuestion(cities) {
        const eastern = GeoUtils.getEasternCities(cities);
        const western = GeoUtils.getWesternCities(cities);

        const correct = RandomUtils.pickMany(eastern, 2);
        const incorrect = RandomUtils.pickMany(western, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            "¿Qué dos ciudades están en el hemisferio este?",
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                cities: options,
            }
        );
    }

    // Cuáles son del hemisferio oeste
    function westernCitiesQuestion(cities) {
        const western = GeoUtils.getWesternCities(cities);
        const eastern = GeoUtils.getEasternCities(cities);

        const correct = RandomUtils.pickMany(western, 2);
        const incorrect = RandomUtils.pickMany(eastern, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            "¿Qué dos ciudades están en el hemisferio oeste?",
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                cities: options,
            }
        );
    }

    // OJO: las cuatro funciones anteriores se podrían refactorizar mejor.

    // Cuáles son capitales de su país
    function capitalsQuestion(cities) {
        const capitals = GeoUtils.getCapitals(cities);
        const nonCapitals = cities.filter((city) => !GeoUtils.isCapital(city));

        const correct = RandomUtils.pickMany(capitals, 2);
        const incorrect = RandomUtils.pickMany(nonCapitals, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            "¿Qué dos ciudades son capitales de su país?",
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                cities: options,
            }
        );
    }

    // Cuáles son de un país
    function countryCitiesQuestion(cities) {
        const grouped = GeoUtils.groupByCountry(cities);

        const validCountries = Object.entries(grouped)
            .filter(([, countryCities]) => countryCities.length >= 2)
            .map(([country]) => country);

        const country = RandomUtils.pick(validCountries);

        const countryCities = grouped[country];
        const otherCities = cities.filter((city) => city.pais !== country);

        const correct = RandomUtils.pickMany(countryCities, 2);
        const incorrect = RandomUtils.pickMany(otherCities, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            `¿Qué dos ciudades pertenecen a ${country}?`,
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                country,
                cities: options,
            }
        );
    }

    // Cuáles son de un continente
    function continentCitiesQuestion(cities) {
        const continent = RandomUtils.pick(ArrayUtils.unique(cities.map((city) => city.continente)));

        const continentCities = GeoUtils.getCitiesByContinent(cities, continent);
        const otherCities = cities.filter((city) => city.continente !== continent);

        const correct = RandomUtils.pickMany(continentCities, 2);
        const incorrect = RandomUtils.pickMany(otherCities, 2);
        const options = [...correct, ...incorrect];

        return buildQuestion(
            `¿Qué dos ciudades pertenecen a ${continent}?`,
            options.map((city) => city.nombre),
            correct.map((city) => city.nombre),
            {
                continent,
                cities: options,
            }
        );
    }

    // Generador aleatorio. Si se quiere hacer pruebas, se deja en generators lo que interese.
    function generate(cities) {
        const generators = [
            northernCitiesQuestion,
            southernCitiesQuestion,
            easternCitiesQuestion,
            westernCitiesQuestion,
            capitalsQuestion,
            countryCitiesQuestion,
            continentCitiesQuestion,
        ];

        const generator = RandomUtils.pick(generators);

        return generator(cities);
    }

    return {
        generate,
        northernCitiesQuestion,
        southernCitiesQuestion,
        easternCitiesQuestion,
        westernCitiesQuestion,
        capitalsQuestion,
        countryCitiesQuestion,
        continentCitiesQuestion,
    };
})();