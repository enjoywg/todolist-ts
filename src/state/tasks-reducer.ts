import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType
    | AddTodolistActionType | RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    todolistId: string
    newTitle: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string
    todolistId: string
    isDone: boolean
}

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].filter(t => t.id !== action.taskId)]
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, title: action.newTitle}
                : t)
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks.map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t)
            return {...state}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskTitleAC = (taskId: string, todolistId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, todolistId, newTitle}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
