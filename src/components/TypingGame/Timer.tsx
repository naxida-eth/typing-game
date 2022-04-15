import { FC } from "react"

interface IProps {
    second: number
}

const Timer: FC<IProps> = ({
    second
}) => {
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                border: '2px solid #753049',
                fontSize: 34,
            }}>
                {second}
            </div>
        </>
    )
}

export default Timer