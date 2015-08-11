/// <reference path='../_all.ts' />

module JudoShirt {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class TodoStorage {

        STORAGE_ID = 'todos-angularjs-typescript';

        get (): TodoItem[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }
    }
}