interface BttnProps {
    type: string
    value?: string
}

const SubmitBttn = ({type, value}: BttnProps) => {
    return(
        <input 
            type={type}
            value={value}
        />
    )
}

export default SubmitBttn