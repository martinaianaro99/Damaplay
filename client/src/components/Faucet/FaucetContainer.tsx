import React, { Component } from "react"
import {} from "../../types/checkers/extensions-gui"
import Faucet from "./Faucet"

interface IFaucetContainerProps {
    location?: any
    rpcUrl: string
}

interface IFaucetContainerState {
}

export default class FaucetContainer extends Component<IFaucetContainerProps, IFaucetContainerState> {
    constructor(props: IFaucetContainerProps) {
        super(props)
        this.state = {
        }
    }

    public render(): JSX.Element {
        return (
            <Faucet
                rpcUrl={this.props.rpcUrl}
            />
        )
    }
}
