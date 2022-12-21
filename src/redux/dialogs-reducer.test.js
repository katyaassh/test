import dialogsReducer, {addMessage} from "./dialogs-reducer";


test('messages length should be 6', () => {
    let state = {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'},
        ]
    }
    let action = addMessage('hi')

    let newState = dialogsReducer(state, action)

    expect(newState.messages.length).toBe(6)
});
