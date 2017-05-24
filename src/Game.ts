import {Word} from "./Game/Word";

class Round {
    protected readonly prompt = 'Guess a letter:';

    constructor(protected readonly word: Word,
                protected readonly mistakesAllowed: number,
                protected readonly mistakesMade: number) {
    }

    getWord(): string {
        return this.word.toString();
    }

    afterProcessingChar(s: string): Game {
        const char = s.charAt(0);
        if (this.word.hasHiddenChar(char)) {
            return new Round(this.word.withOpened(char), this.mistakesAllowed, this.mistakesMade);
        }
        return new Round(this.word, this.mistakesAllowed, this.mistakesMade + 1);
    }

    isFinished(): boolean {
        return this.isWon() || this.isLost();
    }

    isWon(): boolean {
        return this.word.isOpen();
    }

    isLost(): boolean {
        return this.mistakesMade > this.mistakesAllowed;
    }

    getMistakesLeft(): number {
        return Math.max(0, this.mistakesAllowed - this.mistakesMade);
    }

    getUserMessage(): string {
        return `The word: ${this.word.toString()}`;
    };
}

class LostRound extends Round {
    getUserMessage(): string {
        return [
            `Missed, mistake #${this.mistakesMade} out of ${this.mistakesAllowed}`,
            super.getUserMessage()
        ].join('\n');
    }
}

class WonRound extends Round {
    getUserMessage(): string {
        return [
            'Hit!',
            super.getUserMessage()
        ].join('\n');
    }
}

export class Game extends Round {
    constructor(word: string, mistakesAllowed: number = 3) {
        super(Word.fromString(word), mistakesAllowed, 0);
    }

    getUserMessage(): string {
        return this.prompt;
    }
}
