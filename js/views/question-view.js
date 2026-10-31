/**
 * Renderizado de preguntas y recogida de respuestas del usuario.
 */
window.QuestionView = (() => {

    const PROGRESS_CONTAINER = document.getElementById("progress-bar-container");
    const QUESTION_COUNTER = document.getElementById("question-counter");
    const QUESTION_PROGRESS = document.getElementById("question-progress");
    const SCORE_COUNTER = document.getElementById("score-counter");
    const QUESTION_CONTAINER = document.getElementById("question-container");

    let dragSortInstance = null;

    // Envío de respuesta
    function submitAnswer(answer) {
        const result = QuizService.submitAnswer(answer);

        if (result.isCorrect) {
            Notification.success("✅ ¡Correcto! Respuesta acertada.");
        } else {
            const state = Store.getState();
            const question = state.currentQuestion;
            const correctAnswer = QuestionGenerator.getCorrectAnswer(question);
            let answerFormatted = correctAnswer;

            if (ValidationUtils.isArrayWithItems(correctAnswer)) {
                // Cuando la respuesta sea múltiple, se hará una enumeración con coma y espacio.
                answerFormatted = correctAnswer.join(", ");
            }

            Notification.error("❌ Incorrecto. La respuesta acertada era: " + answerFormatted);
        }

        /**
         * OJO: se bloquea este botón para evitar el bug de continuar haciendo clic
         * en él y que las siguientes preguntas se resuelvan en función de la actual,
         * esto es porque hay este setTimeOut que, mientras no termina, da pie a ello.
         */
        document.getElementById("confirm-answer-btn").disabled = true;

        QuizService.scrollToTop();

        setTimeout(() => {
            if (QuizService.hasNextQuestion()) {
                QuizService.nextQuestion();
                render();
            } else {
                QuizService.finishGame();

                if (window.ResultView) {
                    window.ResultView.show();
                }
            }
        }, 100);
    }

    // Radio buttons para respuestas de selección única
    function bindSingleValueSubmission(groupName) {
        document.getElementById("confirm-answer-btn")?.addEventListener("click", () => {
            const selected = document.querySelector(`input[name="${groupName}"]:checked`);

            if (!selected) {
                Notification.warning("Seleccione una respuesta.");

                return;
            }

            submitAnswer(selected.value);
        });
    }

    // Pregunta binaria: Sí / No
    function renderBinaryQuestion(question) {
        QUESTION_CONTAINER.innerHTML = `
            <div class="question">

                <h2 class="question-or-title">
                    ${question.statement}
                </h2>

                <div class="options">

                    ${question.options
                        .map(
                            (option, index) => `
                                <div class="option">

                                    <input type="radio" id="option-${index}" name="binary-answer" value="${option}">

                                    <label for="option-${index}">
                                        ${option}
                                    </label>

                                </div>
                            `
                        ).join("")
                    }

                </div>

                <div class="question__actions">

                    <button id="confirm-answer-btn" class="btn btn--primary" type="button">
                        Confirmar respuesta
                    </button>

                </div>

            </div>
        `;

        bindSingleValueSubmission("binary-answer");
    }

    // Pregunta de tipo test, con respuesta única.
    function renderSingleChoiceQuestion(question) {
        QUESTION_CONTAINER.innerHTML = `
            <div class="question">

                <h2 class="question-or-title">
                    ${question.statement}
                </h2>

                <div class="options">

                    ${question.options
                        .map(
                            (option, index) => `
                                <div class="option">

                                    <input type="radio" id="option-${index}" name="single-answer" value="${option}">

                                    <label for="option-${index}">
                                        ${option}
                                    </label>

                                </div>
                            `
                        ).join("")
                    }

                </div>

                <div class="question__actions">

                    <button id="confirm-answer-btn" class="btn btn--primary" type="button">
                        Confirmar respuesta
                    </button>

                </div>

            </div>
        `;

        bindSingleValueSubmission("single-answer");
    }

    // Pregunta de tipo test, con respuesta múltiple.
    function renderMultipleChoiceQuestion(question) {
        QUESTION_CONTAINER.innerHTML = `
            <div class="question">

                <h2 class="question-or-title">
                    ${question.statement}
                </h2>

                <div class="options">

                    ${question.options
                        .map(
                            (option, index) => `
                                <div class="option">

                                    <input type="checkbox" id="option-${index}" value="${option}">

                                    <label for="option-${index}">
                                        ${option}
                                    </label>

                                </div>
                            `
                        ).join("")
                    }

                </div>

                <div class="question__actions">

                    <button id="confirm-answer-btn" class="btn btn--primary" type="button">
                        Confirmar respuesta
                    </button>

                </div>

            </div>
        `;

        document.getElementById("confirm-answer-btn")?.addEventListener("click", () => {
            const answer = [...QUESTION_CONTAINER.querySelectorAll('input[type="checkbox"]:checked')].map(
                (checkbox) => checkbox.value
            );

            // OJO: esto puede variar si la respuesta múltiple deja de ser 2.
            if (answer.length !== 2) {
                Notification.warning("Seleccione dos opciones.");

                return;
            }

            submitAnswer(answer);
        });
    }

    // Pregunta para responder escribiendo
    function renderTextQuestion(question) {
        QUESTION_CONTAINER.innerHTML = `
            <div class="question">

                <h2 class="question-or-title">
                    ${question.statement}
                </h2>

                <input id="text-answer" class="answer-input" type="text" placeholder="${question.placeholder}" autocomplete="off">

                <div class="question__actions">

                    <button id="confirm-answer-btn" class="btn btn--primary" type="button">
                        Confirmar respuesta
                    </button>

                </div>

            </div>
        `;

        const input = document.getElementById("text-answer");

        // OJO al focus del input, en mobile no es ideal
        //input?.focus();

        document.getElementById("confirm-answer-btn")?.addEventListener("click", () => {
            const value = input.value.trim();

            if (!value) {
                Notification.warning("Introduzca una respuesta.");

                return;
            }

            submitAnswer(value);
        });
    }

    // Pregunta de ordenación con drag & drop
    function renderOrderingQuestion(question) {
        QUESTION_CONTAINER.innerHTML = `
            <div class="question">

                <h2 class="question-or-title">
                    ${question.statement}
                </h2>

                <div id="ordering-container"></div>

                <div class="question__actions">

                    <button id="confirm-answer-btn" class="btn btn--primary" type="button">
                        Confirmar respuesta
                    </button>

                </div>

            </div>
        `;

        dragSortInstance = DragSort.create({
            container: document.getElementById("ordering-container"),
            items: question.items,
        });

        document.getElementById("confirm-answer-btn")?.addEventListener("click", () => {
            submitAnswer(dragSortInstance.getOrder());
        });
    }

    // Header con el estado de la partida
    function updateHeader(stats) {
        if (!PROGRESS_CONTAINER.querySelector(".progress")) {
            ProgressBar.render(PROGRESS_CONTAINER, stats.progress);
        } else {
            ProgressBar.update(PROGRESS_CONTAINER, stats.progress);
        }

        QUESTION_COUNTER.textContent = `Pregunta nº ${stats.currentQuestion}`;

        QUESTION_PROGRESS.textContent = `Respondidas: ${stats.currentQuestion - 1} de ${stats.totalQuestions} (${stats.progress} %)`;

        SCORE_COUNTER.textContent = `Acertadas: ${stats.correctAnswers}`;
    }

    // Router de preguntas
    function renderQuestion(question) {
        switch (question.type) {
            case "binary":
                renderBinaryQuestion(question);
                break;

            case "single-choice":
                renderSingleChoiceQuestion(question);
                break;

            case "multiple-choice":
                renderMultipleChoiceQuestion(question);
                break;

            case "text":
                renderTextQuestion(question);
                break;

            case "ordering":
                renderOrderingQuestion(question);
                break;
        }
    }

    // Render principal
    function render() {
        const question = QuizService.getCurrentQuestion();

        const stats = QuizService.getGameStats();

        if (!question) {
            return;
        }

        // Si se quiere hacer pruebas, se muestra todo por consola al poner #hacer-trampa al final de la URL
        if (window.location.hash === "#hacer-trampa") {
            console.group("Pregunta nº", stats.currentQuestion, question.statement);
            console.log("Respuesta correcta:", QuestionGenerator.getCorrectAnswer(question));
            console.log("Datos en detalle:", question.metadata);
            console.groupEnd();
        }

        updateHeader(stats);
        renderQuestion(question);
    }

    return {
        render,
    };
})();