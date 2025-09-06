/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Todo } from './Todo';
export type TodosResponse = {
    data?: Array<Todo>;
    pagination?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
};

