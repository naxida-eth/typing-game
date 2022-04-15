import { FC, useEffect, useState, useRef, RefObject, useCallback, useContext } from "react"
import axios from "axios";
import { Card, Input, InputProps, Space, Button, InputRef } from 'antd';
import Timer from "./Timer";

import { TypingContext } from "../../pages/TypingGame";
import { ActionType, ICheckWord } from "./typings";

const constTitle = 'Typing Game'

const constSecond = 30

interface IProps {
}

const Game: FC<IProps> = ({
}) => {
    const [title, setTitle] = useState<string>(constTitle);
    const [second, setSecond] = useState<number>(constSecond);
    const [start, setStart] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [word,setWord] = useState<string>('');

    const inputRef = useRef() as RefObject<InputRef>;

    const { words, dispatch } = useContext(TypingContext)

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
        if (!start) {
            getTitle();
        };
        setStart(!start)
    }, [start])

    const getTitle = useCallback(async () => {
        const { data } = await axios.get('/titles');
        setTitle(data);
    }, [])

    useEffect(() => {
        if (second <= constSecond && start && second !== 0) {
            setTimeout(() => {
                setSecond(second - 1)
            }, 1000)
        } else if (second <= 0) {
            setSecond(constSecond);
            setStart(false)
        } else if (!start) {
            setTitle(constTitle)
            setSecond(constSecond);
        }
    }, [second, start])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }, [])

    useEffect(() => {
        console.log(start)
        if (start)
            inputRef.current!.focus({
                cursor: 'start',
            });
    }, [start])

    return (
        <>
            <Card
                title={title}
                headStyle={{ backgroundColor: '#101628', color: '#FFFFFF', borderWidth: 0 }}
                style={{ width: 400, color: '#FFFFFF', borderWidth: 0 }}
                bodyStyle={{ backgroundColor: '#26304A' }}
                loading={loading}>
                <Space direction="vertical" size="middle" style={{ padding: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Timer second={second}></Timer>
                    <Input
                        ref={inputRef}
                        style={{ width: '100%' }}
                        disabled={!start}
                        value={word}
                        onChange={e=>setWord(e.target.value)}
                        onPressEnter={onEnter}
                    />
                    <Button type='primary' onClick={gameStart}>{!start ? 'Start' : 'Restart'}</Button>
                </Space>
            </Card>
        </>
    )
}

export default Game