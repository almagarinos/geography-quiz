// Utilidades para manejo y formateo de fechas
window.DateUtils = (() => {

    // Devuelve la fecha actual en formato ISO
    function now() {
        return new Date();
    }

    // Devuelve la fecha actual en ISO string
    function nowIso() {
        return new Date().toISOString();
    }

    // Convierte una fecha a objeto Date
    function parse(date) {
        return new Date(date);
    }

    // Comprueba si una fecha es válida
    function isValid(date) {
        const parsedDate = new Date(date);
        return !Number.isNaN(parsedDate.getTime());
    }

    // Formato dd/mm/yyyy
    function formatDate(date) {
        const value = new Date(date);

        return value.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // Formato dd/mm/yyyy hh:mm
    function formatDateTime(date) {
        const value = new Date(date);

        return value.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // Formato largo legible
    function formatLong(date) {
        const value = new Date(date);

        return value.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    // Diferencia en milisegundos
    function diffMilliseconds(startDate, endDate) {
        return new Date(endDate).getTime() - new Date(startDate).getTime();
    }

    // Diferencia en segundos
    function diffSeconds(startDate, endDate) {
        return Math.floor(diffMilliseconds(startDate, endDate) / 1000);
    }

    // Diferencia en minutos
    function diffMinutes(startDate, endDate) {
        return Math.floor(diffSeconds(startDate, endDate) / 60);
    }

    // Diferencia en horas
    function diffHours(startDate, endDate) {
        return Math.floor(diffMinutes(startDate, endDate) / 60);
    }

    // Convierte segundos a formato HH:MM:SS
    function formatDuration(seconds = 0) {
        const totalSeconds = Math.max(0, Math.floor(seconds));

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        const hh = String(hours).padStart(2, "0");
        const mm = String(minutes).padStart(2, "0");
        const ss = String(remainingSeconds).padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    }

    // Devuelve cuántos días han pasado desde una fecha
    function daysAgo(date) {
        const milliseconds = Date.now() - new Date(date).getTime();

        return Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    }

    // Añade días a una fecha
    function addDays(date, days = 0) {
        const result = new Date(date);

        result.setDate(result.getDate() + days);

        return result;
    }

    // Ordena fechas descendente
    function sortNewestFirst(dates = []) {
        return [...dates].sort((a, b) => new Date(b) - new Date(a));
    }

    // Ordena fechas ascendente
    function sortOldestFirst(dates = []) {
        return [...dates].sort((a, b) => new Date(a) - new Date(b));
    }

    return {
        now,
        nowIso,
        parse,
        isValid,
        formatDate,
        formatDateTime,
        formatLong,
        diffMilliseconds,
        diffSeconds,
        diffMinutes,
        diffHours,
        formatDuration,
        daysAgo,
        addDays,
        sortNewestFirst,
        sortOldestFirst,
    };
})();