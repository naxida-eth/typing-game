import { FC, useEffect, useState, useRef, RefObject, useCallback, useContext, useDeferredValue } from "react"
import axios from "axios";
import { Card, Input, InputProps, Space, Button, InputRef } from 'antd';
import Timer from "./Timer";

import { TypingContext } from "../../pages/TypingGame";
import { ActionType, ICheckWord } from "./typings";

const constTitle = 'Typing Game'

const constSecond = 30

let timer: NodeJS.Timeout;

interface IProps {
}

const Game: FC<IProps> = ({
}) => {
    const [title, setTitle] = useState<string>(constTitle);
    const [second, setSecond] = useState<number>(constSecond);
    const [start, setStart] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [word, setWord] = useState<string>('');

    const deferredStart = useDeferredValue(start);
    const deferredSecond = useDeferredValue(second);

    const inputRef = useRef() as RefObject<InputRef>;

    const { words, dispatch } = useContext(TypingContext);


    const onEnter: InputProps['onPressEnter'] = () => {
        const payload: ICheckWord = {
            wordItem: {
                id: words.length + 1,
                word: title,
                correct: false,
            },
            word: word.trim(),
        }
        dispatch({ type: ActionType.CHECK_WORD, payload })
        setWord('')
        getTitle();
    }

    const gameStart = useCallback(() => {
        if (!deferredStart) {
            getTitle();
        };
        setStart(!deferredStart)
    }, [deferredStart])

    const getTitle = useCallback(async () => {
        const { data } = await axios.get('/titles');
        setTitle(data);
    }, [])

    useEffect(() => {
        if (deferredSecond <= constSecond && deferredStart && deferredSecond !== 0) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setSecond(deferredSecond - 1)
                console.log(deferredSecond)
            }, 1000)
        } else if (deferredSecond <= 0) {
            setSecond(constSecond);
            setStart(false)
        } else if (!deferredStart) {
            setTitle(constTitle)
            setSecond(constSecond);
        }
    }, [deferredSecond, deferredStart])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    useEffect(() => {
        console.log(deferredStart)
        if (deferredStart) {
            inputRef.current!.focus({
                cursor: 'start',
            });
        } else {
            clearTimeout(timer);
            dispatch({ type: ActionType.CLEAR_WORD })
        }
    }, [deferredStart])

    return (
        <>
            <Card
                title={title}
                headStyle={{ backgroundColor: '#101628', color: '#FFFFFF', borderWidth: 0 }}
                style={{ width: 400, color: '#FFFFFF', borderWidth: 0 }}
                bodyStyle={{ backgroundColor: '#26304A' }}
                loading={loading}>
                <Space direction="vertical" size="middle" style={{ padding: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Timer second={deferredSecond}></Timer>
                    <Input
                        ref={inputRef}
                        style={{ width: '100%' }}
                        disabled={!deferredStart}
                        value={word}
                        onChange={e => setWord(e.target.value)}
                        onPressEnter={onEnter}
                    />
                    <Button type='primary' onClick={gameStart}>{!deferredStart ? 'Start' : 'Restart'}</Button>
                </Space>
            </Card>
        </>
    )
}

export default Game