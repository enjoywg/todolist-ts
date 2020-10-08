import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = React.memo ((props: PropsType) => {
    console.log("EditableSpan called")
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return (
        editMode
        ? <TextField variant="outlined" value={title} onChange={onChangeHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})