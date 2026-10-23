/**
 * Servicio principal de la partida.
 *
 * Responsabilidades:
 * - Crear partidas
 * - Gestionar progreso
 * - Registrar respuestas
 * - Calcular resultados
 * - Finalizar partidas
 */
window.QuizService = (() => {
    
    // Inicia una nueva partida
    function startGame(cities, maxQuestions) {
        if (!QuestionGenerator.hasEnoughData(cities)) {
            throw new Error("No hay suficientes datos para generar preguntas.");
        }

        const questions = QuestionGenerator.generateBalancedQuestions(cities, maxQuestions);

        Store.resetState();

        Store.setState({
            gameStatus: "PLAYING",
            maxQuestions,
            questions,
            currentQuestionIndex: 0,
            currentQuestion: questions[0] || null,
            startedAt: DateUtils.nowIso(),
        });

        return Store.getState();
    }

    // Obtiene la pregunta actual
    function getCurrentQuestion() {
        const state = Store.getState();

        return state.currentQuestion;
    }

    // Obtiene todas las preguntas
    function getQuestions() {
        return Store.getState().questions;
    }

    // Obtiene la posición actual
    function getCurrentQuestionNumber() {
        const state = Store.getState();

        return state.currentQuestionIndex + 1;
    }

    // Registra una respuesta
    function submitAnswer(userAnswer) {
        const state = Store.getState();

        const question = state.currentQuestion;

        if (!question) {
            throw new Error("No existe una pregunta activa.");
        }

        const isCorrect = QuestionGenerator.validateAnswer(question, userAnswer);

        const answerRecord = {
            questionId: question.id,
            questionType: question.type,
            userAnswer,
            correctAnswer: QuestionGenerator.getCorrectAnswer(question),
            isCorrect,
        };

        Store.addAnswer(answerRecord);

        if (isCorrect) {
            Store.incrementCorrectAnswers();
        } else {
            Store.incrementIncorrectAnswers();
        }

        return {
            isCorrect,
            answerRecord,
        };
    }

    // Comprueba si existen más preguntas
    function hasNextQuestion() {
        const state = Store.getState();

        return state.currentQuestionIndex < state.questions.length - 1;
    }

    // Obtiene resultados finales
    function getFinalResults() {
        const state = Store.getState();

        const durationSeconds =
            state.startedAt && state.finishedAt ? DateUtils.diffSeconds(state.startedAt, state.finishedAt) : 0;

        return {
            totalQuestions: state.maxQuestions,
            correctAnswers: state.correctAnswers,
            incorrectAnswers: state.incorrectAnswers,
            percentage: state.percentage,
            grade: ScoreService.calculateGrade(state.percentage),
            rating: ScoreService.getRating(state.percentage),
            durationSeconds,
            durationFormatted: DateUtils.formatDuration(durationSeconds),
        };
    }

    // Finaliza la partida
    function finishGame() {
        const state = Store.getState();

        const summary = ScoreService.calculateFromAnswers(state.answers);

        Store.setState({
            gameStatus: "FINISHED",
            finishedAt: DateUtils.nowIso(),
            correctAnswers: summary.correctAnswers,
            incorrectAnswers: summary.incorrectAnswers,
            percentage: summary.percentage,
        });

        return getFinalResults();
    }

    // Avanza a la siguiente pregunta
    function nextQuestion() {
        const state = Store.getState();

        if (!hasNextQuestion()) {
            finishGame();

            return null;
        }

        const nextIndex = state.currentQuestionIndex + 1;

        const nextQuestion = state.questions[nextIndex];

        Store.setState({
            currentQuestionIndex: nextIndex,
            currentQuestion: nextQuestion,
        });

        return nextQuestion;
    }

    // Comprueba si la partida ha terminado
    function isGameFinished() {
        const state = Store.getState();

        return state.answers.length >= state.maxQuestions;
    }

    // Guarda el resultado en el leaderboard
    function saveResult(playerName) {
        const state = Store.getState();

        return LeaderboardService.addEntry({
            playerName: playerName.trim(),
            correctAnswers: state.correctAnswers,
            totalQuestions: state.maxQuestions,
            playedAt: state.finishedAt || DateUtils.nowIso(),
        });
    }

    // Obtiene progreso actual
    function getProgress() {
        const state = Store.getState();

        if (state.maxQuestions === 0) {
            return 0;
        }

        return Math.round((state.answers.length / state.maxQuestions) * 100);
    }

    // Obtiene estadísticas de partida
    function getGameStats() {
        const state = Store.getState();

        return {
            currentQuestion: state.currentQuestionIndex + 1,

            totalQuestions: state.maxQuestions,

            answered: state.answers.length,

            correctAnswers: state.correctAnswers,

            incorrectAnswers: state.incorrectAnswers,

            percentage: ScoreService.calculatePercentage(state.correctAnswers, Math.max(1, state.answers.length)),

            progress: getProgress(),
        };
    }

    // Obtiene historial de respuestas
    function getAnswers() {
        return Store.getState().answers;
    }

    return {
        startGame,
        getCurrentQuestion,
        getQuestions,
        getCurrentQuestionNumber,
        submitAnswer,
        hasNextQuestion,
        getFinalResults,
        finishGame,
        nextQuestion,
        isGameFinished,
        saveResult,
        getProgress,
        getGameStats,
        getAnswers,
    };
})();