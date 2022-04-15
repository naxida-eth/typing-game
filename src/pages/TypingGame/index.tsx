import { createContext, Dispatch, FC, useReducer } from "react"
import Answer from "../../components/TypingGame/Answer";
import Game from "../../components/TypingGame/Game";

import { Row, Col } from 'antd';
import { IAction, IWord } from "../../components/TypingGame/typings";

import { wordReducer } from '../../components/TypingGame/reducer'

const initializerArg: IWord[] = [];

const baseStyle = {
    textAlign: 'center' as 'center',
    color: '#FFFFFF',
}

export interface ITypingContext {
    words: IWord[],
    dispatch: Dispatch<IAction>
}

export const TypingContext = createContext<ITypingContext>({} as ITypingContext);
const { Provider } = TypingContext

const Typing: FC = () => {
    const [state, dispatch] = useReducer(wordReducer, initializerArg);

    return (
        <Provider value={{ words: state, dispatch }}>
            <Row style={{ height: '100vh' }}>
                <Col style={{ ...baseStyle, backgroundColor: '#121113', display: 'flex', justifyContent: 'center', alignItems: 'center' }} flex={2}>
                    <Game></Game>
                </Col>
                <Col style={{ ...baseStyle, backgroundColor: '#26304A', maxWidth: 400 }} flex={1}>
                    <Answer></Answer>
                </Col>
            </Row>
        </Provider>
    )
}

export default Typing