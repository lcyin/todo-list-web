/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTodoRequest } from '../models/CreateTodoRequest';
import type { Todo } from '../models/Todo';
import type { TodosResponse } from '../models/TodosResponse';
import type { UpdateTodoRequest } from '../models/UpdateTodoRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TodosService {
    /**
     * Get all todos
     * Retrieve a paginated list of todos with optional filtering
     * @param page Page number for pagination
     * @param limit Number of items per page
     * @param completed Filter by completion status
     * @param search Search in title and description
     * @returns TodosResponse List of todos retrieved successfully
     * @throws ApiError
     */
    public static getApiV1Todos(
        page: number = 1,
        limit: number = 10,
        completed?: boolean,
        search?: string,
    ): CancelablePromise<TodosResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/todos',
            query: {
                'page': page,
                'limit': limit,
                'completed': completed,
                'search': search,
            },
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Create a new todo
     * Create a new todo item with title and optional description
     * @param requestBody
     * @returns Todo Todo created successfully
     * @throws ApiError
     */
    public static postApiV1Todos(
        requestBody: CreateTodoRequest,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/todos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get a todo by ID
     * Retrieve a specific todo by its unique identifier
     * @param id Unique identifier of the todo
     * @returns Todo Todo retrieved successfully
     * @throws ApiError
     */
    public static getApiV1Todos1(
        id: string,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/todos/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Update a todo
     * Update an existing todo with new information
     * @param id Unique identifier of the todo
     * @param requestBody
     * @returns Todo Todo updated successfully
     * @throws ApiError
     */
    public static putApiV1Todos(
        id: string,
        requestBody: UpdateTodoRequest,
    ): CancelablePromise<Todo> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/todos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
    /**
     * Delete a todo
     * Delete a specific todo by its unique identifier
     * @param id Unique identifier of the todo
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Todos(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/todos/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
                500: `Internal server error`,
            },
        });
    }
}
