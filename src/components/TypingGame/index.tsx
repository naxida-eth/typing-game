import { FC, useState } from "react"
import Answer from "../Answer";
import Game from "./Game";
import { constTitle } from "../typing";


import { Row, Col } from 'antd';

const baseStyle = {
    textAlign:'center' as 'center',
    color:'#FFFFFF',
}

const Typing: FC = () => {
    const [title, setTitle] = useState<string>(constTitle);
    const [corrects,setCorrects] = useState<string[]>([
        'orange',
        'middle',
        'ringe',
        'mobile',
        'phone',
    ]);
    const [mistakes,setMistakes] = useState<string[]>([
        'orange',
        'middle',
        'ringe',
        'mobile',
        'phone',
    ]);

    const checkTitle = (inpt:string)=>{
        console.log(title);
        console.log(inpt)
        if(title===inpt){
            setCorrects([...corrects,inpt])
        }else{
            setMistakes([...mistakes,inpt])
        }
    }

    return (
        <Row style={{height:'100vh'}}>
            <Col style={{...baseStyle,backgroundColor:'#121113',display:'flex',justifyContent:'center',alignItems:'center'}} flex={2}>
                <Game title={title} setTitle={setTitle} checkTitle={checkTitle}></Game>
            </Col>
            <Col style={{...baseStyle,backgroundColor:'#26304A',maxWidth:400}} flex={1}>
                <Answer corrects={corrects} mistakes={mistakes}></Answer>
            </Col>
        </Row>
    )
}

export default Typing