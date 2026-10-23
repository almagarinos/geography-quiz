// Servicios relacionados con cálculo de puntuación, porcentajes y estadísticas de partida
window.ScoreService = (() => {
    
    // Calcula el porcentaje de aciertos
    function calculatePercentage(correctAnswers = 0, totalQuestions = 0) {
        if (totalQuestions === 0) {
            return 0;
        }

        return Math.round((correctAnswers / totalQuestions) * 100);
    }

    // Calcula el número de fallos
    function calculateIncorrectAnswers(correctAnswers = 0, totalQuestions = 0) {
        return Math.max(0, totalQuestions - correctAnswers);
    }

    // Genera un resumen completo a partir de los resultados
    function buildSummary({ correctAnswers = 0, totalQuestions = 0 } = {}) {
        const incorrectAnswers = calculateIncorrectAnswers(correctAnswers, totalQuestions);

        const percentage = calculatePercentage(correctAnswers, totalQuestions);

        return {
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            percentage,
        };
    }

    // Devuelve si una respuesta fue correcta
    function isCorrect(userAnswer, correctAnswer) {
        return userAnswer === correctAnswer;
    }

    /**
     * Calcula estadísticas a partir de un array de respuestas. Cada respuesta debe contener:
     * {
     *   isCorrect: true|false
     * }
     */
    function calculateFromAnswers(answers = []) {
        const totalQuestions = answers.length;

        const correctAnswers = answers.filter((answer) => answer.isCorrect).length;

        return buildSummary({
            correctAnswers,
            totalQuestions,
        });
    }

    // Calcula resultados utilizando el estado global de la partida
    function calculateFromState(state = {}) {
        return buildSummary({
            correctAnswers: state.correctAnswers || 0,

            totalQuestions: state.maxQuestions || 0,
        });
    }

    // Devuelve la nota sobre 10
    function calculateGrade(percentage = 0) {
        return Number(((percentage / 100) * 10).toFixed(1));
    }

    // Devuelve una valoración textual
    function getRating(percentage = 0) {
        if (percentage == 100) {
            return "Matrícula de honor";
        }

        if (percentage >= 90) {
            return "Sobresaliente";
        }

        if (percentage >= 80) {
            return "Notable alto";
        }

        if (percentage >= 70) {
            return "Notable";
        }

        if (percentage >= 60) {
            return "Bien";
        }

        if (percentage > 50) {
            return "Aprobado";
        }

        if (percentage == 50) {
            return "Aprobado raspado";
        }

        return "Necesita mejorar";
    }

    // Construye el objeto final que irá al leaderboard
    function buildLeaderboardEntry({ playerName = "", correctAnswers = 0, totalQuestions = 0, playedAt = null } = {}) {
        const percentage = calculatePercentage(correctAnswers, totalQuestions);

        return {
            playerName,
            correctAnswers,
            totalQuestions,
            percentage,
            playedAt,
        };
    }

    return {
        calculatePercentage,
        calculateIncorrectAnswers,
        buildSummary,
        isCorrect,
        calculateFromAnswers,
        calculateFromState,
        calculateGrade,
        getRating,
        buildLeaderboardEntry,
    };
})();