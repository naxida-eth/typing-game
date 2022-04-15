import { FC, useContext } from "react"
import { Card, Row, Col, Tag } from 'antd';
import { TypingContext } from "../../pages/TypingGame";

interface IProps {
}

const Answer: FC<IProps> = ({
}) => {
    const { words } = useContext(TypingContext)
    return (
        <>
            <Card
                title={
                    `Correct Count: ${words.filter((item) => {
                        if (item.correct) return item
                    }).length
                    }`}
                headStyle={{ backgroundColor: '#101628', color: '#FFFFFF', borderWidth: 0 }}
                style={{ width: '100%', color: '#FFFFFF', borderWidth: 0 }}
                bodyStyle={{ backgroundColor: '#26304A' }}
            >
                <Row style={{ width: '100%' }}>
                    <Col style={{ width: '50%' }} flex={1}>
                        {
                            words.filter((item) => {
                                if (item.correct) return item
                            }).map((item) => {
                                const { id, word } = item
                                return <Tag style={{ width: '100px', marginTop: 20 }} key={id} color="#108ee9">{word}</Tag>
                            })
                        }
                    </Col>
                    <Col style={{ width: '50%' }} flex={1}>
                        {
                            words.filter((item) => {
                                if (!item.correct) return item
                            }).map((item) => {
                                const { id, word } = item
                                return <Tag style={{ width: '100px', marginTop: 20 }} key={id} color="#3B5999">{word}</Tag>
                            })
                        }
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Answer