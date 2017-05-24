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
var Word = (function () {
    function Word(chars) {
        this.chars = chars;
    }
    Word.fromString = function (word) {
        return new Word(word.split('').map(function (c) { return new HiddenChar(c); }));
    };
    Word.prototype.toString = function () {
        return this.chars.map(function (c) { return c.toString(); }).join('');
    };
    Word.prototype.isOpen = function () {
        return !this.chars.some(function (c) { return c.isHidden(); });
    };
    Word.prototype.hasHiddenChar = function (char) {
        return this.chars.some(function (c) { return c.isHidden() && c.isEqualTo(char); });
    };
    Word.prototype.withOpened = function (char) {
        return new Word(this.chars.map(function (c) { return c.isEqualTo(char) ? c.opened() : c; }));
    };
    return Word;
}());
exports.Word = Word;
var Char = (function () {
    function Char(char) {
        this.char = char;
    }
    Char.prototype.opened = function () {
        return new OpenChar(this.char);
    };
    Char.prototype.isEqualTo = function (char) {
        return this.char == char;
    };
    return Char;
}());
var OpenChar = (function (_super) {
    __extends(OpenChar, _super);
    function OpenChar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenChar.prototype.toString = function () {
        return this.char;
    };
    OpenChar.prototype.isHidden = function () {
        return false;
    };
    return OpenChar;
}(Char));
var HiddenChar = (function (_super) {
    __extends(HiddenChar, _super);
    function HiddenChar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenChar.prototype.toString = function () {
        return '?';
    };
    HiddenChar.prototype.isHidden = function () {
        return true;
    };
    return HiddenChar;
}(Char));
