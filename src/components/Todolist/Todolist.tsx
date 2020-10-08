import React, {useCallback} from "react";
import {FilterValuesType} from "../../App"
import '../../App.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log("Todolist called")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    /*const addTask = (title: string) => {
        props.addTask(title, props.id)
    }*/
    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, "all")
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, "active")
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, "completed")
    }, [props.changeFilter, props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task task={t}
                              todolistId={props.id}
                              removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}
                              key={t.id}
                        />
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={onAllClickHandler}
                        color={"default"}>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}
                        color={"primary"}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}>Completed
                </Button>
            </div>
        </div>
    )
})

