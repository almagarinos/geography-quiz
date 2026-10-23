/**
 * Generador central de preguntas.
 *
 * Orquesta todos los tipos:
 * - BinaryQuestion
 * - SingleChoiceQuestion
 * - MultipleChoiceQuestion
 * - TextQuestion
 * - OrderingQuestion
 */
window.QuestionGenerator = (() => {
    const QUESTION_TYPES = {
        BINARY: "binary",
        SINGLE_CHOICE: "single-choice",
        MULTIPLE_CHOICE: "multiple-choice",
        TEXT: "text",
        ORDERING: "ordering",
    };

    /**
     * Obtiene todos los generadores disponibles. Si se quiere hacer pruebas con
     * las preguntas de un sólo tipo, déjese sólo la QUESTION_TYPE que interese.
     */
    function getGenerators() {
        return [
            {
                type: QUESTION_TYPES.BINARY,
                generate: BinaryQuestion.generate,
            },
            {
                type: QUESTION_TYPES.SINGLE_CHOICE,
                generate: SingleChoiceQuestion.generate,
            },
            {
                type: QUESTION_TYPES.MULTIPLE_CHOICE,
                generate: MultipleChoiceQuestion.generate,
            },
            {
                type: QUESTION_TYPES.TEXT,
                generate: TextQuestion.generate,
            },
            {
                type: QUESTION_TYPES.ORDERING,
                generate: OrderingQuestion.generate,
            },
        ];
    }

    // Genera una pregunta aleatoria
    function generateQuestion(cities) {
        const generators = getGenerators();

        const generator = RandomUtils.pick(generators);

        return generator.generate(cities);
    }

    // Genera una pregunta de un tipo concreto
    function generateByType(type, cities) {
        const generator = getGenerators().find((item) => item.type === type);

        if (!generator) {
            throw new Error(`Tipo de pregunta no soportado: ${type}`);
        }

        return generator.generate(cities);
    }

    // Genera varias preguntas
    function generateQuestions(cities, amount) {
        const questions = [];

        const total = Math.max(1, Number(amount) || 1);

        for (let i = 0; i < total; i++) {
            questions.push(generateQuestion(cities));
        }

        return questions;
    }

    // Genera varias preguntas con una distribución homogénea repartiendo los tipos
    function generateBalancedQuestions(cities, amount) {
        const generators = getGenerators();

        const questions = [];

        const total = Math.max(1, Number(amount) || 1);

        let index = 0;

        while (questions.length < total) {
            const generator = generators[index % generators.length];

            questions.push(generator.generate(cities));

            index++;
        }

        return RandomUtils.shuffle(questions);
    }

    // Comprueba si una respuesta es correcta
    function validateAnswer(question, userAnswer) {
        if (!question) {
            return false;
        }

        switch (question.type) {
            case QUESTION_TYPES.TEXT:
                return TextQuestion.validateAnswer(userAnswer, question.correctAnswer);

            case QUESTION_TYPES.ORDERING:
                return OrderingQuestion.validateAnswer(userAnswer, question.correctOrder);

            case QUESTION_TYPES.MULTIPLE_CHOICE:
                return ArrayUtils.haveSameValues(userAnswer || [], question.correctAnswers || []);

            case QUESTION_TYPES.BINARY:

            case QUESTION_TYPES.SINGLE_CHOICE:
                return userAnswer === question.correctAnswer;

            default:
                return false;
        }
    }

    // Obtiene la respuesta correcta de una pregunta
    function getCorrectAnswer(question) {
        if (!question) {
            return null;
        }

        switch (question.type) {
            case QUESTION_TYPES.ORDERING:
                return question.correctOrder;

            case QUESTION_TYPES.MULTIPLE_CHOICE:
                return question.correctAnswers;

            default:
                return question.correctAnswer;
        }
    }

    // Comprueba si existe suficiente información para generar preguntas
    function hasEnoughData(cities) {
        return Array.isArray(cities) && cities.length >= 4;
    }

    // Obtiene estadísticas sobre una colección de preguntas generadas
    function getTypeDistribution(questions = []) {
        const distribution = {};

        questions.forEach((question) => {
            distribution[question.type] ??= 0;

            distribution[question.type]++;
        });

        return distribution;
    }

    // Devuelve todos los tipos disponibles
    function getAvailableTypes() {
        return Object.values(QUESTION_TYPES);
    }

    return {
        QUESTION_TYPES,
        getGenerators,
        generateQuestion,
        generateByType,
        generateQuestions,
        generateBalancedQuestions,
        validateAnswer,
        getCorrectAnswer,
        hasEnoughData,
        getTypeDistribution,
        getAvailableTypes,
    };
})();