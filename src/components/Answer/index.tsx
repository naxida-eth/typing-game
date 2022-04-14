import { FC } from "react"

import { Card, Row, Col, Tag } from 'antd';

interface IProps {
    corrects: string[],
    mistakes: string[],
}

const Answer: FC<IProps> = ({
    corrects,
    mistakes,
}) => {
    return (
        <>
            <Card
                title={`Correct Count: ${corrects.length}`}
                headStyle={{ backgroundColor: '#101628', color: '#FFFFFF', borderWidth: 0 }}
                style={{ width: '100%', color: '#FFFFFF', borderWidth: 0 }}
                bodyStyle={{ backgroundColor: '#26304A' }}
            >
                <Row style={{ width: '100%' }}>
                    <Col style={{ width: '50%' }} flex={1}>
                        {corrects.map((item, index) => {
                            return <Tag style={{ width: '100px', marginTop: 20 }} key={`${item}-${index}`} color="#108ee9">{item}</Tag>
                        })}
                    </Col>
                    <Col style={{ width: '50%' }} flex={1}>
                        {mistakes.map((item, index) => {
                            return <Tag style={{ width: '100px', marginTop: 20 }} key={`${item}-${index}`} color="#3B5999">{item}</Tag>
                        })}
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Answer