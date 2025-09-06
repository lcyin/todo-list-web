/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthResponse } from '../models/HealthResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Get application health status
     * Returns the health status of the application for monitoring and load balancing
     * @returns HealthResponse Application is healthy
     * @throws ApiError
     */
    public static getApiV1Health(): CancelablePromise<HealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health',
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get application readiness status
     * Kubernetes readiness probe endpoint - indicates if the application is ready to serve traffic
     * @returns HealthResponse Application is ready
     * @throws ApiError
     */
    public static getApiV1HealthReadiness(): CancelablePromise<HealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/readiness',
            errors: {
                500: `Internal server error`,
            },
        });
    }
    /**
     * Get application liveness status
     * Kubernetes liveness probe endpoint - indicates if the application is alive
     * @returns HealthResponse Application is alive
     * @throws ApiError
     */
    public static getApiV1HealthLiveness(): CancelablePromise<HealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/liveness',
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
