import { FC, useEffect, useState, useRef, RefObject } from "react"

import Timer from "./Timer";

import { Card, Input, InputProps, Space, Button, InputRef } from 'antd';

import { constSecond, constTitle } from "../typing";
import axios from "axios";

interface IProps{
    title:string,
    setTitle:Function,
    checkTitle:Function,
}

const Game: FC<IProps> = ({
    title,
    setTitle,
    checkTitle
}) => {
    const [second, setSecond] = useState<number>(constSecond);
    const [start, setStart] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const inputRef = useRef() as RefObject<InputRef>;

    const onEnter: InputProps['onPressEnter'] = (e) => {
        const target = e.target as HTMLInputElement;
        checkTitle(target.value)
    }

    const gameStart = () => {
        if (!start) getTitle();
        setStart(!start)
    }

    const getTitle = async () => {
        const res = await axios.get('/titles');
        setTitle(res.data)
    }

    useEffect(() => {
        if (second <= constSecond && start && second !== 0) {
            inputRef.current!.focus({
                cursor: 'start',
            });

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
                        onPressEnter={onEnter}
                    />
                    <Button type='primary' onClick={gameStart}>{!start ? 'Start' : 'Restart'}</Button>
                </Space>
            </Card>
        </>
    )
}

export default Game