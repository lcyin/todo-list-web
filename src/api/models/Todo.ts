/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Todo = {
    /**
     * Unique identifier for the todo
     */
    id: string;
    /**
     * Title of the todo
     */
    title: string;
    /**
     * Optional description of the todo
     */
    description?: string | null;
    /**
     * Whether the todo is completed
     */
    completed: boolean;
    /**
     * Creation timestamp
     */
    createdAt: string;
    /**
     * Last update timestamp
     */
    updatedAt: string;
};

