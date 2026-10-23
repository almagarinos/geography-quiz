// Utilidades geográficas para trabajar con ciudades, países, continentes y coordenadas.
window.GeoUtils = (() => {

    // Comprueba si una latitud pertenece al hemisferio norte
    function isNorthernHemisphere(latitude) {
        return Number(latitude) > 0;
    }

    // Comprueba si una latitud pertenece al hemisferio sur
    function isSouthernHemisphere(latitude) {
        return Number(latitude) < 0;
    }

    // Comprueba si una longitud pertenece al hemisferio este
    function isEasternHemisphere(longitude) {
        return Number(longitude) > 0;
    }

    // Comprueba si una longitud pertenece al hemisferio oeste
    function isWesternHemisphere(longitude) {
        return Number(longitude) < 0;
    }

    // Devuelve el nombre del hemisferio según la latitud
    function getLatitudeHemisphere(latitude) {
        const value = Number(latitude);

        if (value > 0) {
            return "norte";
        }

        if (value < 0) {
            return "sur";
        }

        return "ecuador";
    }

    // Devuelve el nombre del hemisferio según la longitud
    function getLongitudeHemisphere(longitude) {
        const value = Number(longitude);

        if (value > 0) {
            return "este";
        }

        if (value < 0) {
            return "oeste";
        }

        return "meridiano de Greenwich";
    }

    // Determina si una ciudad es capital de su país
    function isCapital(city) {
        return Boolean(city?.esCapitalDePais === true);
    }

    /**
     * Compara dos ciudades por latitud.
     *
     * Devuelve:
     * -1 => A más al sur
     *  0 => Igual
     *  1 => A más al norte
     */
    function compareLatitude(cityA, cityB) {
        const latA = Number(cityA.coordenada.latitud);
        const latB = Number(cityB.coordenada.latitud);

        if (latA > latB) {
            return 1;
        }

        if (latA < latB) {
            return -1;
        }

        return 0;
    }

    /**
     * Compara dos ciudades por longitud.
     *
     * Devuelve:
     * -1 => A más al oeste
     *  0 => Igual
     *  1 => A más al este
     */
    function compareLongitude(cityA, cityB) {
        const lonA = Number(cityA.coordenada.longitud);
        const lonB = Number(cityB.coordenada.longitud);

        if (lonA > lonB) {
            return 1;
        }

        if (lonA < lonB) {
            return -1;
        }

        return 0;
    }

    // Orden norte → sur
    function sortNorthToSouth(cities = []) {
        return [...cities].sort((a, b) => Number(b.coordenada.latitud) - Number(a.coordenada.latitud));
    }

    // Orden sur → norte
    function sortSouthToNorth(cities = []) {
        return [...cities].sort((a, b) => Number(a.coordenada.latitud) - Number(b.coordenada.latitud));
    }

    // Orden oeste → este
    function sortWestToEast(cities = []) {
        return [...cities].sort((a, b) => Number(a.coordenada.longitud) - Number(b.coordenada.longitud));
    }

    // Orden este → oeste
    function sortEastToWest(cities = []) {
        return [...cities].sort((a, b) => Number(b.coordenada.longitud) - Number(a.coordenada.longitud));
    }

    // Agrupa ciudades por continente
    function groupByContinent(cities = []) {
        return ArrayUtils.groupBy(cities, (city) => city.continente);
    }

    // Agrupa ciudades por país
    function groupByCountry(cities = []) {
        return ArrayUtils.groupBy(cities, (city) => city.pais);
    }

    // Obtiene las capitales
    function getCapitals(cities = []) {
        return cities.filter(isCapital);
    }

    // Obtiene ciudades de un continente
    function getCitiesByContinent(cities = [], continent) {
        return cities.filter((city) => city.continente === continent);
    }

    // Obtiene ciudades de un país
    function getCitiesByCountry(cities = [], country) {
        return cities.filter((city) => city.pais === country);
    }

    // Devuelve ciudades situadas en el hemisferio norte
    function getNorthernCities(cities = []) {
        return cities.filter((city) => isNorthernHemisphere(city.coordenada.latitud));
    }

    // Devuelve ciudades situadas en el hemisferio sur
    function getSouthernCities(cities = []) {
        return cities.filter((city) => isSouthernHemisphere(city.coordenada.latitud));
    }

    // Devuelve ciudades situadas en el hemisferio este
    function getEasternCities(cities = []) {
        return cities.filter((city) => isEasternHemisphere(city.coordenada.longitud));
    }

    // Devuelve ciudades situadas en el hemisferio oeste
    function getWesternCities(cities = []) {
        return cities.filter((city) => isWesternHemisphere(city.coordenada.longitud));
    }

    // Coordenadas válidas
    function hasValidCoordinates(city) {
        return (
            // OJO: se pone ? como operador de encadenamiento opcional por si acaso city es null o undefined.
            Number.isFinite(Number(city?.coordenada.latitud)) && Number.isFinite(Number(city?.coordenada.longitud))
        );
    }

    // Convierte valor a coordenada numérica
    function parseCoordinate(value) {
        return Number(value);
    }

    return {
        isNorthernHemisphere,
        isSouthernHemisphere,
        isEasternHemisphere,
        isWesternHemisphere,
        getLatitudeHemisphere,
        getLongitudeHemisphere,
        isCapital,
        compareLatitude,
        compareLongitude,
        sortNorthToSouth,
        sortSouthToNorth,
        sortWestToEast,
        sortEastToWest,
        groupByContinent,
        groupByCountry,
        getCapitals,
        getCitiesByContinent,
        getCitiesByCountry,
        getNorthernCities,
        getSouthernCities,
        getEasternCities,
        getWesternCities,
        hasValidCoordinates,
        parseCoordinate,
    };
})();