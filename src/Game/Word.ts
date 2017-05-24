export class Word {
    constructor(private readonly chars: Char[]) {
    }

    static fromString(word: string): Word {
        return new Word(word.split('').map((c) => new HiddenChar(c)));
    }

    toString(): string {
        return this.chars.map((c) => c.toString()).join('');
    }

    isOpen(): boolean {
        return !this.chars.some((c) => c.isHidden());
    }

    hasHiddenChar(char: string): boolean {
        return this.chars.some((c) => c.isHidden() && c.isEqualTo(char));
    }

    withOpened(char: string): Word {
        return new Word(this.chars.map((c) => c.isEqualTo(char) ? c.opened() : c));
    }
}

abstract class Char {
    constructor(protected readonly char: string) {
    }

    abstract toString(): string;

    abstract isHidden(): boolean;

    opened(): Char {
        return new OpenChar(this.char);
    }

    isEqualTo(char: string) {
        return this.char == char;
    }
}

class OpenChar extends Char {
    toString(): string {
        return this.char;
    }

    isHidden(): boolean {
        return false;
    }
}

class HiddenChar extends Char {
    public toString(): string {
        return '?';
    }

    isHidden(): boolean {
        return true;
    }
}
