export as namespace SWQ;

export = SWQ;

declare namespace SWQ {
    type QuestionType =
        | 'choice'
        | 'select-multiple'
        | 'true/false'
        | 'boolean'
        | 'text'
        | 'number';

    type FeedbackMode = 'standard' | 'immediate' | 'retry';

    type CompletionReason = 'completed' | 'time_up';

    interface Question {
        /** Required, must be unique within a quiz. */
        id: string;
        /** Rendered as plain text (never HTML). */
        text: string;
        type: QuestionType;
        /**
         * Correct answer. Accepts strings, native booleans for true/false
         * questions, numbers for number questions, and string arrays for
         * select-multiple questions.
         */
        answer?: string | number | boolean | string[];
        /** Required for choice and select-multiple questions. */
        options?: string[];
    }

    interface QuizResults {
        score: number;
        total: number;
        percentage: number;
        reason: CompletionReason;
    }

    interface QuizSettings {
        feedbackMode?: FeedbackMode;
        allowSkip?: boolean;
        allowBack?: boolean;
        /** Countdown in seconds; 0 disables the timer. */
        timer?: number;
        onStart?: (this: Quiz) => void;
        onQuestionChange?: (this: Quiz, question: Question, index: number) => void;
        onComplete?: (this: Quiz, results: QuizResults) => void;
    }

    interface QuizOptions {
        settings?: QuizSettings;
        questions?: Question[];
    }

    interface QuizState {
        currentIndex: number;
        isFinished: boolean;
        startTime: number | null;
    }

    /** A quiz instance attached to a container element. */
    class Quiz {
        element: HTMLElement;
        config: QuizSettings;
        questions: Question[];
        state: QuizState;
        /** Restart the quiz from the beginning. */
        reset(): void;
        /**
         * Remove listeners, clear the timer, and restore the original
         * container markup. The container can be reinitialized afterwards.
         */
        destroy(): void;
    }
}

declare const SWQ: {
    instances: SWQ.Quiz[];
    /**
     * Initialize quizzes on elements matching `selector`.
     * Returns only newly created instances; already initialized elements are
     * skipped.
     */
    init(selector: string, options?: SWQ.QuizOptions): SWQ.Quiz[];
};

declare global {
    interface HTMLElement {
        swq?: SWQ.Quiz;
    }
}
