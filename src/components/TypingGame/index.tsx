import { FC } from "react"
import Answer from "../Answer";
import Game from "./Game";

import { Row, Col } from 'antd';

const baseStyle = {
    textAlign:'center' as 'center',
    color:'#FFFFFF',
}

const Typing: FC = () => {
    return (
        <Row style={{height:'100vh'}}>
            <Col style={{...baseStyle,backgroundColor:'#121113',display:'flex',justifyContent:'center',alignItems:'center'}} flex={2}>
                <Game></Game>
            </Col>
            <Col style={{...baseStyle,backgroundColor:'#26304A'}} flex={1}>
                <Answer></Answer>
            </Col>
        </Row>
    )
}

export default Typing