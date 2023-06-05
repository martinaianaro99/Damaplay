import React, { useState } from "react";
import { Button } from "reactstrap";
import { askFaucet } from "src/util/faucet";
import FaucetInput from "./FaucetInput";
import * as FontAwesome from "react-icons/fa"

interface IFaucetProps {
    goBack: () => void
}

const Faucet = (props: IFaucetProps) => {
    const faucetInputRef: React.RefObject<FaucetInput> = React.createRef();
    const amount: number = 1000000;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] =  useState<string | undefined>(undefined); 

    const handleFaucetClick = () => {
        setResponse(undefined)

        if (faucetInputRef.current) {
            const { address } = faucetInputRef.current.state;
            const tokens = {
                stake: amount,
            };

            setIsLoading(true); 

            askFaucet(address, tokens)
            .then(() => {
                console.log("Faucet request successful");
                setResponse("Tokens sent!")
            })
            .catch((error) => {
                console.log("Faucet request failed", error);
                setResponse("An error occurred.")
            })
            .finally(() => {
                setIsLoading(false); 
            });
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button color="primary" onClick={props.goBack} style={{marginBottom: "20px"}}>
                    <FontAwesome.FaLongArrowAltLeft fontSize="1.5em" /> Back
                </Button>
                <h1>Faucet</h1>
                <div>
                    <h3>Insert your address and press the button.</h3>
                    <h3>{amount} STAKE tokens will be sent to you.</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                    <div style={{ width: "200px" }}>
                        <FaucetInput ref={faucetInputRef} />
                    </div>
                        <Button
                            color="info"
                            size="lg"
                            onClick={handleFaucetClick}
                            style={{ marginLeft: "10px", marginBottom: "20px" }}
                            disabled={isLoading} 
                        >
                            {isLoading ? "Loading..." : "Faucet 💸"} 
                        </Button>
                    </div>
                {response ? <h3>{response}</h3> : null}
            </div>
        </div>
    );
};

export default Faucet;
