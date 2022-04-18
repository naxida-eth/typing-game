import { ActionType, IAction, ICheckWord, IWord } from "../typings"

const wordReducer = (state: IWord[] = [], action: IAction): IWord[] => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.CHECK_WORD:
            const { wordItem, word } = payload as ICheckWord;
            wordItem.correct = wordItem.word === word
            return [...state, wordItem];
        case ActionType.CLEAR_WORD:
            return [];
        default:
            return state
    }
}


export {
    wordReducer
}