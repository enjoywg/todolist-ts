import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import '../../App.module.css';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem()
        }
    }

    return (
        <div>
            <div>
                <TextField variant="outlined"
                           value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={!!error}
                           label="Title"
                           helperText={error}/>
                <IconButton color="primary" onClick={addItem}><AddBox /></IconButton>
            </div>
        </div>
    )
}