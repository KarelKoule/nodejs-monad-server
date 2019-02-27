"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Result(value);
    }
    static error(failure) {
        return new Result(failure);
    }
    map(f) {
        if (isFailure(this.value)) {
            return Result.error(this.value);
        }
        return Result.of(f(this.value));
    }
    flatMap(f) {
        if (isFailure(this.value)) {
            return Result.error(this.value);
        }
        return f(this.value);
    }
    recover(f) {
        if (isFailure(this.value)) {
            return f(this.value);
        }
        return this.value;
    }
}
exports.Result = Result;
function isFailure(arg) {
    return arg !== undefined;
}
//# sourceMappingURL=Result.js.map