import React, {useReducer, useState} from 'react';
import {TaskType, TodoList} from "./components/Todolist/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    function changeTaskTitle(taskId: string, todolistId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(taskId, todolistId, newTitle))
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks
                        if (tl.filter === "active") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}><TodoList key={tl.id}
                                             id={tl.id}
                                             title={tl.title}
                                             tasks={tasksForTodolist}
                                             removeTask={removeTask}
                                             changeFilter={changeFilter}
                                             addTask={addTask}
                                             changeTaskStatus={changeStatus}
                                             filter={tl.filter}
                                             removeTodolist={removeTodolist}
                                             changeTaskTitle={changeTaskTitle}
                                             changeTodolistTitle={changeTodolistTitle}
                            /></Paper>
                        </Grid>
                    })}</Grid></Container>
        </div>
    );
}

export default AppWithRedux;
