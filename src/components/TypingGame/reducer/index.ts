import { ActionType, IAction, ICheckWord, IWord } from "../typings"


/**
 *     id: string,
    word: string,
    inputFlag:boolean,  //判断用户是否输入过，默认为false
    correct: boolean,  // 判断用户输入是否正确，默认为false
 * **/
const wordReducer = (state: IWord[] = [], action: IAction): IWord[] => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.CHECK_WORD:
            const { wordItem, word } = payload as ICheckWord;
            wordItem.correct = wordItem.word === word
            return [...state, wordItem];
        default:
            return state
    }
}


export {
    wordReducer
}