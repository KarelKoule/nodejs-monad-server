import { expect } from 'chai'
import { Result } from "../../src/util/Result"
import { Failure, Severity } from "../../src/util/Failure"
import { describe, it } from 'mocha'

describe('Result', () => {

    it('should recover value when ok ', () => {
        const res = Result.of("value")
        expect(res.recover(f => "wrong")).to.equal("value")
    })

    it('should recover new value from failure', () => {
        const res = Result.error({ severity: Severity.Error, message: "failure message" })
        expect(res.recover(f => "new value")).to.equal("new value")
    })

})