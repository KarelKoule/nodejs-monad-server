import { ok } from "assert";
import { Failure } from "./util/Failure";

export enum RestStatus {
    OK = 200,
    BAD_REQUEST = 400
}

export interface RestResponse {
    status: RestStatus
    body: string
}

export const okResponse = (bodyValue: string) => { return { status: RestStatus.OK, body: bodyValue } }
export const badRequestResponse = (failure: Failure) => { return { status: RestStatus.BAD_REQUEST, body: failure.message } }


