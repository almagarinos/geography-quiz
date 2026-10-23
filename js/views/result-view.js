/**
 * Pantalla de resultados.
 *
 * Responsabilidades:
 * - Mostrar estadísticas finales
 * - Guardar resultado
 * - Ir al leaderboard
 */
window.ResultView = (() => {

    const RESULT_SCREEN = document.getElementById("result-screen");
    const RESULT_SUMMARY = document.getElementById("result-summary");
    const PLAYER_NAME_INPUT = document.getElementById("player-name");
    const SAVE_SCORE_BUTTON = document.getElementById("save-score-btn");
    const SKIP_SAVE_BUTTON = document.getElementById("skip-save-btn");

    // Renderiza estadísticas
    function renderSummary(results) {
        RESULT_SUMMARY.innerHTML = `
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-item__label">
                        Preguntas
                    </span>

                    <div class="result-item__value">
                        ${results.totalQuestions}
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Aciertos
                    </span>

                    <div class="result-item__value">
                        ${results.correctAnswers}
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Fallos
                    </span>

                    <div class="result-item__value">
                        ${results.incorrectAnswers}
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Precisión
                    </span>

                    <div class="result-item__value">
                        ${results.percentage} %
                    </div>
                </div>
            </div>

            <div class="result-mark">
                <ul>
                    <li>
                        Calificación: <b>${results.rating}</b> (${results.grade} sobre 10)
                    </li>

                    <li>
                        Duración total: <b>${results.durationFormatted}</b> (horas, minutos, segundos)
                    </li>
                </ul>
            </div>
        `;
    }

    // Oculta todas las pantallas
    function hideAllScreens() {
        document.querySelectorAll(".screen").forEach((screen) => {
            screen.classList.remove("screen--active");
        });
    }

    // Muestra la pantalla
    function show() {
        const results = QuizService.getFinalResults();

        renderSummary(results);

        hideAllScreens();

        RESULT_SCREEN.classList.add("screen--active");

        PLAYER_NAME_INPUT.value = "";
        PLAYER_NAME_INPUT.focus();
    }

    // Navega al leaderboard
    function showLeaderboard() {
        hideAllScreens();

        const leaderboardScreen = document.getElementById("leaderboard-screen");

        leaderboardScreen.classList.add("screen--active");

        if (window.LeaderboardView && typeof window.LeaderboardView.render === "function") {
            window.LeaderboardView.render();
        }
    }

    // Guarda el resultado
    function saveResult() {
        const playerName = PLAYER_NAME_INPUT.value.trim();

        if (!ValidationUtils.isValidPlayerName(playerName)) {
            Notification.warning("Introduzca un nombre válido.");

            PLAYER_NAME_INPUT.focus();

            return;
        }

        try {
            QuizService.saveResult(playerName);

            Notification.success("Resultado guardado correctamente.");

            showLeaderboard();
        } catch (error) {
            Notification.error(error.message);
        }
    }

    // Continúa sin guardar el resultado
    function continueWithoutSaving() {
        if (window.StartView && typeof window.StartView.show === "function") {
            window.StartView.show();
        }
    }

    // Eventos
    function bindEvents() {
        SAVE_SCORE_BUTTON?.addEventListener("click", saveResult);

        SKIP_SAVE_BUTTON?.addEventListener("click", continueWithoutSaving);

        PLAYER_NAME_INPUT?.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                saveResult();
            }
        });
    }

    // Inicialización
    function init() {
        bindEvents();
    }

    return {
        renderSummary,
        show,
        init,
    };
})();