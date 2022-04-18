export interface IWord {
    id: number,
    word: string,
    correct: boolean,  // 判断用户输入是否正确，默认为false
}

export enum ActionType {
    CHECK_WORD='checkWord',
    CLEAR_WORD='clearWord'
}

export interface ICheckWord{
    wordItem:IWord,
    word:string,
}

export interface IAction {
    type: ActionType
    payload?: IWord | ICheckWord
}
