import { Failure } from "./Failure";

export class Result<T> {
    private constructor(private value: T | Failure) { }

    static of<T>(value: T) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Result(value);
    }

    static error<T>(failure: Failure) {
        return new Result<T>(failure);
    }

    map<R>(f: (val: T) => R): Result<R> {
        if (isFailure(this.value)) {
            return Result.error(this.value)
        }

        return Result.of(f(this.value))
    }


    flatMap<R>(f: (val: T) => Result<R>): Result<R> {
        if (isFailure(this.value)) {
            return Result.error(this.value)
        }

        return f(this.value)
    }

    recover(f: (failure: Failure) => T): T {
        if (isFailure(this.value)) {
            return f(this.value)
        }
        return this.value
    }

}

function isFailure(arg: any): arg is Failure {
    return arg.severity !== undefined
}