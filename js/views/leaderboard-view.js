/**
 * Pantalla de clasificación.
 *
 * Responsabilidades:
 * - Mostrar Top 20
 * - Mostrar estadísticas globales
 * - Volver al inicio
 * - Iniciar nueva partida
 */
window.LeaderboardView = (() => {

    const LEADERBOARD_CONTAINER = document.getElementById("leaderboard-container");
    const BACK_HOME_BUTTON = document.getElementById("back-home-btn");

    // Protección básica de cross-site scripting (XSS) para cuando se guarde el nombre del jugador
    function escapeHtml(value = "") {
        const div = document.createElement("div");

        div.textContent = String(value);

        return div.innerHTML;
    }

    // Estado vacío
    function renderEmptyState() {
        LEADERBOARD_CONTAINER.innerHTML = `
            <p class="leaderboard-empty">
                Todavía no hay resultados. Complete una partida y guarde su puntuación para aparecer aquí.
            </p>
        `;
    }

    // Estadísticas globales
    function renderStatistics(statistics) {
        return `
            <div class="result-grid">

                <div class="result-item">
                    <span class="result-item__label">
                        Partidas
                    </span>

                    <div class="result-item__value">
                        ${statistics.totalGames}
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Participantes
                    </span>

                    <div class="result-item__value">
                        ${statistics.totalPlayers}
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Precisión media
                    </span>

                    <div class="result-item__value">
                        ${statistics.averagePercentage} %
                    </div>
                </div>

                <div class="result-item">
                    <span class="result-item__label">
                        Mejor participante
                    </span>

                    <div class="result-item__value">
                        ${statistics.bestPlayer}
                    </div>
                </div>

            </div>
        `;
    }

    // Render principal
    function render() {
        const leaderboard = LeaderboardService.getTop();

        const statistics = LeaderboardService.getStatistics();

        if (leaderboard.length === 0) {
            renderEmptyState();

            return;
        }

        LEADERBOARD_CONTAINER.innerHTML = `
            <div class="leaderboard">

                ${renderStatistics(statistics)}

                <div class="leaderboard-table-container">

                    <table class="leaderboard-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Participante</th>
                                <th>Aciertos</th>
                                <th>Preguntas</th>
                                <th>Precisión</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${leaderboard
                                .map(
                                    (entry, index) => `
                                        <tr>

                                            <td class="leaderboard-position">
                                                ${index + 1}
                                            </td>

                                            <td>
                                                ${escapeHtml(entry.playerName)}
                                            </td>

                                            <td>
                                                ${entry.correctAnswers}
                                            </td>

                                            <td>
                                                ${entry.totalQuestions}
                                            </td>

                                            <td>
                                                ${entry.percentage} %
                                            </td>

                                            <td>
                                                ${DateUtils.formatDate(entry.playedAt)}
                                            </td>

                                        </tr>
                                    `
                                ).join("")
                            }
                        </tbody>

                    </table>

                </div>

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
        hideAllScreens();

        document.getElementById("leaderboard-screen").classList.add("screen--active");

        render();
    }

    // Volver al inicio
    function handleBackHome() {
        if (window.StartView && typeof window.StartView.show === "function") {
            window.StartView.show();
        }
    }

    // Eventos
    function bindEvents() {
        BACK_HOME_BUTTON?.addEventListener("click", handleBackHome);
        // OJO: en un futuro, estaría bien poder borrar el leaderboard.
    }

    // Inicialización
    function init() {
        bindEvents();
    }

    return {
        render,
        show,
        init,
    };
})();