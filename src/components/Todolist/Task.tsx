import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDone, props.todolistId)
    }
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, props.todolistId, title)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])
    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox color="primary" onChange={onChangeHandler} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})