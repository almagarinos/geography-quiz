// Punto de entrada de la aplicación
(() => {

    // Comprueba dependencias críticas
    function validateDependencies() {
        const requiredModules = [
            "Store",
            "QuizService",
            "QuestionGenerator",
            "LeaderboardService",
            "StartView",
            "QuestionView",
            "ResultView",
            "LeaderboardView",
            "Notification",
        ];

        const missingModules = requiredModules.filter((moduleName) => typeof window[moduleName] === "undefined");

        if (missingModules.length > 0) {
            throw new Error(`Dependencias no encontradas: ${missingModules.join(", ")}`);
        }
    }

    // Obtiene los datos cargados, donde "ciudades" es el nombre de la constante en datos-ciudades.js
    function getCitiesDataset() {
        const candidates = [
            window.CITIES,
            window.cities,
            ciudades,
        ];

        const dataset = candidates.find((value) => Array.isArray(value));

        if (!dataset) {
            throw new Error("No se encontró un dataset de ciudades válido.");
        }

        return dataset;
    }

    // Estadísticas iniciales
    function logStartupInfo(cities) {
        console.group("🌎 Trivial Geográfico 🌍");

        console.info(`Ciudades cargadas: ${cities.length}`);

        console.info("Aplicación inicializada correctamente.");

        console.groupEnd();
    }

    // Inicialización de componentes
    function initializeComponents() {
        StartView.init();

        ResultView.init();

        LeaderboardView.init();
    }

    // Inicialización de vistas
    function initializeViews() {
        StartView.show();
    }

    // Suscripción global al estado, muestra datos por consola al poner #debug al final de la URL.
    function subscribeToStore() {
        Store.subscribe((state) => {
            if (window.location.hash === "#debug") {
                console.log("[STORE]", state);
            }
        });
    }

    // Controlador global de errores
    function bindGlobalErrorHandlers() {
        window.addEventListener("error", (event) => {
            console.error(event.error);

            Notification.error("Se ha producido un error inesperado.");
        });

        window.addEventListener("unhandledrejection", (event) => {
            console.error(event.reason);

            Notification.error("Se ha producido un error inesperado.");
        });
    }

    // Arranque principal
    function bootstrap() {
        try {
            validateDependencies();

            const cities = getCitiesDataset();

            logStartupInfo(cities);

            initializeComponents();

            initializeViews();

            subscribeToStore();

            bindGlobalErrorHandlers();

        } catch (error) {
            console.error(error);

            document.body.innerHTML = `
                <main style="padding: 1rem">
                    <p>
                        Error al iniciar Trivial Geográfico: ${error.message}
                    </p>
                </main>
            `;
        }
    }

    // DOM listo
    document.addEventListener("DOMContentLoaded", bootstrap);
})();