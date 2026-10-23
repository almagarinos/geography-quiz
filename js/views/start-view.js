/**
 * Vista de inicio.
 *
 * Responsabilidades:
 * - Mostrar pantalla inicial
 * - Solicitar nº de preguntas
 * - Iniciar partida
 * - Abrir leaderboard
 */
window.StartView = (() => {

    const START_SCREEN = document.getElementById("start-screen");
    const GAME_SCREEN = document.getElementById("game-screen");
    const LEADERBOARD_SCREEN = document.getElementById("leaderboard-screen");

    const QUESTION_LIMIT_INPUT = document.getElementById("question-limit");
    const START_BUTTON = document.getElementById("start-game-btn");
    const SHOW_LEADERBOARD_BUTTON = document.getElementById("show-leaderboard-btn");

    // Oculta todas las pantallas
    function hideAllScreens() {
        document.querySelectorAll(".screen").forEach((screen) => {
            screen.classList.remove("screen--active");
        });
    }

    // Muestra la pantalla de inicio
    function show() {
        hideAllScreens();

        START_SCREEN.classList.add("screen--active");

        QUESTION_LIMIT_INPUT.focus();
    }

    // Obtiene el valor introducido
    function getQuestionLimit() {
        return Number(QUESTION_LIMIT_INPUT.value);
    }

    // Limpia el formulario. OJO: de momento no se usa, pero será útil.
    function resetForm() {
        QUESTION_LIMIT_INPUT.value = "";
    }

    // Inicia la partida, donde "ciudades" es el nombre de la constante en datos-ciudades.js
    function handleStartGame() {
        const maxQuestions = getQuestionLimit();

        if (!ValidationUtils.isValidQuestionCount(maxQuestions)) {
            Notification.warning("Introduzca un número válido de preguntas.");

            QUESTION_LIMIT_INPUT.focus();

            return;
        }

        try {
            QuizService.startGame(ciudades || [], maxQuestions);

            hideAllScreens();

            GAME_SCREEN.classList.add("screen--active");

            if (window.QuestionView && typeof window.QuestionView.render === "function") {
                window.QuestionView.render();
            }
        } catch (error) {
            Notification.error(error.message);
        }
    }

    // Abre leaderboard
    function handleOpenLeaderboard() {
        hideAllScreens();

        LEADERBOARD_SCREEN.classList.add("screen--active");

        if (window.LeaderboardView && typeof window.LeaderboardView.render === "function") {
            window.LeaderboardView.render();
        }
    }

    // Enter sobre el input
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleStartGame();
        }
    }

    // Eventos
    function bindEvents() {
        START_BUTTON?.addEventListener("click", handleStartGame);

        SHOW_LEADERBOARD_BUTTON?.addEventListener("click", handleOpenLeaderboard);

        QUESTION_LIMIT_INPUT?.addEventListener("keydown", handleKeyDown);
    }

    // Inicialización
    function init() {
        bindEvents();
    }

    return {
        show,
        resetForm,
        init,
    };
})();