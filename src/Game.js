"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Word_1 = require("./Game/Word");
var Round = (function () {
    function Round(word, mistakesAllowed, mistakesMade) {
        this.word = word;
        this.mistakesAllowed = mistakesAllowed;
        this.mistakesMade = mistakesMade;
        this.prompt = 'Guess a letter:';
    }
    Round.prototype.getWord = function () {
        return this.word.toString();
    };
    Round.prototype.afterProcessingChar = function (s) {
        var char = s.charAt(0);
        if (this.word.hasHiddenChar(char)) {
            return new Round(this.word.withOpened(char), this.mistakesAllowed, this.mistakesMade);
        }
        return new Round(this.word, this.mistakesAllowed, this.mistakesMade + 1);
    };
    Round.prototype.isFinished = function () {
        return this.isWon() || this.isLost();
    };
    Round.prototype.isWon = function () {
        return this.word.isOpen();
    };
    Round.prototype.isLost = function () {
        return this.mistakesMade > this.mistakesAllowed;
    };
    Round.prototype.getMistakesLeft = function () {
        return Math.max(0, this.mistakesAllowed - this.mistakesMade);
    };
    Round.prototype.getUserMessage = function () {
        return "The word: " + this.word.toString();
    };
    ;
    return Round;
}());
var LostRound = (function (_super) {
    __extends(LostRound, _super);
    function LostRound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LostRound.prototype.getUserMessage = function () {
        return [
            "Missed, mistake #" + this.mistakesMade + " out of " + this.mistakesAllowed,
            _super.prototype.getUserMessage.call(this)
        ].join('\n');
    };
    return LostRound;
}(Round));
var WonRound = (function (_super) {
    __extends(WonRound, _super);
    function WonRound() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WonRound.prototype.getUserMessage = function () {
        return [
            'Hit!',
            _super.prototype.getUserMessage.call(this)
        ].join('\n');
    };
    return WonRound;
}(Round));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(word, mistakesAllowed) {
        if (mistakesAllowed === void 0) { mistakesAllowed = 3; }
        return _super.call(this, Word_1.Word.fromString(word), mistakesAllowed, 0) || this;
    }
    Game.prototype.getUserMessage = function () {
        return this.prompt;
    };
    return Game;
}(Round));
exports.Game = Game;
