/**
 * Gestión de clasificación.
 * 
 * Sólo conserva el top 20.
 * 
 * Criterios de ordenación:
 * 1º) Más aciertos totales.
 * 2º) Mayor precisión.
 * 3º) Más reciente.
 */
window.LeaderboardService = (() => {

    const MAX_ENTRIES = 20;

    // Ordena el ranking
    function sortLeaderboard(entries = []) {
        return [...entries].sort((a, b) => {
            if (b.correctAnswers !== a.correctAnswers) {
                return b.correctAnswers - a.correctAnswers;
            }

            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }

            return new Date(b.playedAt) - new Date(a.playedAt);
        });
    }

    // Limita el ranking a N registros
    function trimLeaderboard(entries = []) {
        return sortLeaderboard(entries).slice(0, MAX_ENTRIES);
    }

    // Obtiene el ranking completo
    function getLeaderboard() {
        const entries = StorageService.getLeaderboard();

        return trimLeaderboard(entries);
    }

    // Guarda el ranking completo
    function saveLeaderboard(entries = []) {
        const cleanedEntries = trimLeaderboard(entries);

        StorageService.saveLeaderboard(cleanedEntries);

        return cleanedEntries;
    }

    // Añade un resultado
    function addEntry({ playerName, correctAnswers, totalQuestions, playedAt }) {
        const entry = ScoreService.buildLeaderboardEntry({
            playerName,
            correctAnswers,
            totalQuestions,
            playedAt,
        });

        const leaderboard = StorageService.getLeaderboard();

        leaderboard.push(entry);

        return saveLeaderboard(leaderboard);
    }

    // Devuelve el Top N
    function getTop(limit = MAX_ENTRIES) {
        return getLeaderboard().slice(0, Math.max(0, limit));
    }

    // Obtiene una posición concreta
    function getPosition(index) {
        const leaderboard = getLeaderboard();

        return leaderboard[index] || null;
    }

    // Devuelve el mejor resultado
    function getBestResult() {
        const leaderboard = getLeaderboard();

        return leaderboard[0] || null;
    }

    // Indica si existen registros
    function hasEntries() {
        return getLeaderboard().length > 0;
    }

    // Número total de registros
    function getCount() {
        return getLeaderboard().length;
    }

    // Elimina todos los registros
    function clearLeaderboard() {
        StorageService.clearLeaderboard();
    }

    // Busca resultados por nombre
    function findByPlayer(playerName) {
        const normalizedName = ValidationUtils.normalizeText(playerName);

        return getLeaderboard().filter((entry) => ValidationUtils.isSameText(entry.playerName, normalizedName));
    }

    // Obtiene la mejor puntuación de un jugador
    function getBestPlayerResult(playerName) {
        const entries = findByPlayer(playerName);

        if (entries.length === 0) {
            return null;
        }

        return sortLeaderboard(entries)[0];
    }

    // Obtiene estadísticas globales
    function getStatistics() {
        const entries = getLeaderboard();

        if (entries.length === 0) {
            return {
                totalGames: 0,
                totalPlayers: 0,
                averagePercentage: 0,
                bestPlayer: "-",
            };
        }

        const percentages = entries.map((entry) => entry.percentage);

        return {
            totalGames: entries.length,

            totalPlayers: new Set(entries.map((entry) => entry.playerName)).size,

            averagePercentage: Number(ArrayUtils.average(percentages).toFixed(1)),

            bestPlayer: entries[0].playerName,
        };
    }

    return {
        MAX_ENTRIES,
        sortLeaderboard,
        trimLeaderboard,
        getLeaderboard,
        saveLeaderboard,
        addEntry,
        getTop,
        getPosition,
        getBestResult,
        hasEntries,
        getCount,
        clearLeaderboard,
        findByPlayer,
        getBestPlayerResult,
        getStatistics,
    };
})();