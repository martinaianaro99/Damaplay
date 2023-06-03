import React, { Component } from "react"
import { FormFeedback, FormGroup, Input } from "reactstrap"

interface IFaucetInputProps {
}

interface IFaucetInputState {
    isValid: boolean
    address: string
}

export default class FaucetInput extends Component<IFaucetInputProps, IFaucetInputState> {
    public constructor(props: IFaucetInputProps) {
        super(props)
        this.state = {
            isValid: false,
            address: ``,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    public render() {
        return (
            <FormGroup>
                <Input
                    type="text"
                    invalid={!this.state.isValid}
                    placeholder={`Address`}
                    maxLength={45}
                    onChange={this.handleChange}
                    valid={this.state.isValid}
                    value={this.state.address}
                />
                <FormFeedback valid={false}>Sorry, that is not a valid address</FormFeedback>
            </FormGroup>
        )
    }
    private handleChange(event: any): void {
        const newAddress = event.target.value
        const isValid = /^cosmos[0-9a-zA-Z]{39}$/.test(newAddress) 
        this.setState({
            isValid,
            address: newAddress,
        })
    }
}
