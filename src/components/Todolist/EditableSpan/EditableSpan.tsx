import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export function EditableSpan(props: PropsType) {
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
        ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}