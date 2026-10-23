/**
 * Estado global de la aplicación. Implementa un patrón Observer único,
 * el propio Store, donde hay componentes que se suscriben y otros que
 * notifican cambios. Todo ello para para evitar dependencias externas.
 */
window.Store = (() => {

    const initialState = {
        gameStatus: "IDLE",

        maxQuestions: 0,

        currentQuestionIndex: 0,

        currentQuestion: null,

        questions: [],

        answers: [],

        correctAnswers: 0,

        incorrectAnswers: 0,

        percentage: 0,

        startedAt: null,

        finishedAt: null,
    };

    let state = structuredClone(initialState);

    const subscribers = [];

    // Notifica los cambios
    function notify() {
        const snapshot = getState();

        subscribers.forEach((callback) => {
            callback(snapshot);
        });
    }

    // Devuelve copia inmutable del estado
    function getState() {
        return structuredClone(state);
    }

    // Sustituye completamente el estado
    function replaceState(newState) {
        state = structuredClone(newState);

        notify();
    }

    // Actualiza parcialmente el estado
    function setState(partialState = {}) {
        state = {
            ...state,
            ...partialState,
        };

        notify();
    }

    // Reinicia la partida
    function resetState() {
        state = structuredClone(initialState);

        notify();
    }

    // Añade una respuesta al histórico
    function addAnswer(answer) {
        state.answers.push(answer);

        notify();
    }

    // Incrementa aciertos
    function incrementCorrectAnswers() {
        state.correctAnswers += 1;

        notify();
    }

    // Incrementa fallos
    function incrementIncorrectAnswers() {
        state.incorrectAnswers += 1;

        notify();
    }

    // Avanza a la siguiente pregunta
    function nextQuestion() {
        state.currentQuestionIndex += 1;

        notify();
    }

    // Establece la pregunta actual
    function setCurrentQuestion(question) {
        state.currentQuestion = question;

        notify();
    }

    // Registra función observadora
    function subscribe(callback) {
        if (typeof callback !== "function") {
            return () => {};
        }

        subscribers.push(callback);

        return () => {
            const index = subscribers.indexOf(callback);

            if (index >= 0) {
                subscribers.splice(index, 1);
            }
        };
    }

    // Indica si la partida está activa
    function isGameRunning() {
        return state.gameStatus === "PLAYING";
    }

    // Indica si la partida ha finalizado
    function isGameFinished() {
        return state.gameStatus === "FINISHED";
    }

    // Obtiene preguntas restantes
    function getRemainingQuestions() {
        return Math.max(0, state.maxQuestions - state.currentQuestionIndex);
    }

    // Estado público
    return {
        getState,
        setState,
        replaceState,
        resetState,
        addAnswer,
        incrementCorrectAnswers,
        incrementIncorrectAnswers,
        nextQuestion,
        setCurrentQuestion,
        subscribe,
        isGameRunning,
        isGameFinished,
        getRemainingQuestions,
    };
})();