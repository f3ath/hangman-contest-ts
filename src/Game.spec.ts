import { Game } from "./Game";

describe('Word "hello". User wins.', () => {
    let game = new Game('hello', 3);
    it('initially is active, 3 mistakes allowed', () => {
        expect(game.isFinished()).toEqual(false);
        expect(game.getMistakesLeft()).toEqual(3);
    });
    it('shows the word as "?????"', () => {
        expect(game.getWord()).toEqual('?????');
    });
    it('user enters "e", the word becomes "?e???"', () => {
        game = game.afterProcessingChar('e');
        expect(game.getWord()).toEqual('?e???');
    });
    it('user enters "h", the word becomes "he???"', () => {
        game = game.afterProcessingChar('h');
        expect(game.getWord()).toEqual('he???');
    });
    it('user enters "l", the word becomes "hell?"', () => {
        game = game.afterProcessingChar('l');
        expect(game.getWord()).toEqual('hell?');
    });
    it('user enters "a", the word stays "hell?", 2 mistakes left', () => {
        game = game.afterProcessingChar('l');
        expect(game.getWord()).toEqual('hell?');
        expect(game.getMistakesLeft()).toEqual(2);
    });
    it('user enters "o", the word becomes "hello", the game is won', () => {
        game = game.afterProcessingChar('o');
        expect(game.getWord()).toEqual('hello');
        expect(game.isWon()).toEqual(true);
        expect(game.isLost()).toEqual(false);
        expect(game.isFinished()).toEqual(true);
    });
});

describe('Word "world". User loses.', () => {
    let game = new Game('world', 3);
    it('initially is active, 3 mistakes allowed', () => {
        expect(game.isFinished()).toEqual(false);
        expect(game.getMistakesLeft()).toEqual(3);
    });
    it('user enters "a", the word stays "?????", 2 mistakes left', () => {
        game = game.afterProcessingChar('a');
        expect(game.getWord()).toEqual('?????');
        expect(game.getMistakesLeft()).toEqual(2);
    });
    it('user enters "a" again, the word stays "?????", 1 mistake left', () => {
        game = game.afterProcessingChar('a');
        expect(game.getWord()).toEqual('?????');
        expect(game.getMistakesLeft()).toEqual(1);
    });
    it('user enters "b", the word stays "?????", 0 mistake left', () => {
        game = game.afterProcessingChar('b');
        expect(game.getWord()).toEqual('?????');
        expect(game.getMistakesLeft()).toEqual(0);
    });
    it('user enters "d", the word becomes "????d", 0 mistake left', () => {
        game = game.afterProcessingChar('d');
        expect(game.getWord()).toEqual('????d');
        expect(game.getMistakesLeft()).toEqual(0);
    });
    it('user enters "d" again, the word stays "????d", 0 mistake left, the game is lost', () => {
        game = game.afterProcessingChar('d');
        expect(game.getWord()).toEqual('????d');
        expect(game.getMistakesLeft()).toEqual(0);
        expect(game.isFinished()).toEqual(true);
        expect(game.isLost()).toEqual(true);
        expect(game.isWon()).toEqual(false);
    });
});