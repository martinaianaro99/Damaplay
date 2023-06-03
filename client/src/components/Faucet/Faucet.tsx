import React from "react"
import { Button} from "reactstrap"

import { askFaucet } from "src/util/faucet"
import FaucetInput from "./FaucetInput"

interface IFaucetProps {
    rpcUrl: string
}

const amount: number = 10000;

const Faucet = (props: IFaucetProps) => {

    const handleFaucetClick = () => {
        if (
            faucetInputRef.current
        ) {
            const { address } = faucetInputRef.current.state;
            const tokens = {
                stake: amount,
              };
            askFaucet(address, tokens);
        }
    };

    const faucetInputRef: React.RefObject<FaucetInput> = React.createRef()
    
    return (
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Faucet</h1>
        <div>
            <h3>Insert your address and press the button.</h3>
            <h3>{amount} STAKE tokens will be sent to you.</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
            <div style={{ width: "200px" }}>
                <FaucetInput />
            </div>
            <Button color="info" size="lg" onClick={handleFaucetClick} style={{ marginLeft: "10px", marginBottom: "20px" }}>
                Faucet 💸
            </Button>
        </div>
    </div>
</div>

    )
}
export default Faucet
