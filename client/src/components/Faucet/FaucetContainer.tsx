import React, { Component } from "react"
import {} from "../../types/checkers/extensions-gui"
import Faucet from "./Faucet"

interface IFaucetContainerProps {
    goBack: () => void
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
                goBack={this.props.goBack}
            />
        )
    }
}
