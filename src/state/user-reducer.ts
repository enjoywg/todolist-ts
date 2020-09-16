type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state} // делаем копию
            newState.age = state.age + 1; // у копии имеем право менять св-ва
            return newState; //возвращаем копию
        case 'INCREMENT-CHILDREN-COUNT':
            // а можно без создания переменных промежуточных
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            let newState2 = {...state} // делаем копию
            newState2.name = action.newName; // у копии имеем право менять св-ва
            return newState2; //возвращаем копию
        default:
            throw new Error("I don't understand this type")
    }
}