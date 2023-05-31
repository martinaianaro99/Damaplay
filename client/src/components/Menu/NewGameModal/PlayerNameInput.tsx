import React, { Component } from "react"
import { FormFeedback, FormGroup, Input } from "reactstrap"

interface IPlayerNameInputProps {
    readonly playerNumber: 1 | 2
}

interface IPlayerNameInputState {
    isValid: boolean
    name: string
}

export default class PlayerNameInput extends Component<IPlayerNameInputProps, IPlayerNameInputState> {
    public constructor(props: IPlayerNameInputProps) {
        super(props)
        this.state = {
            isValid: true,
            name: ``,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    public render() {
        const color = this.props.playerNumber === 1 ? "Black" : "Red"
        const { playerNumber } = this.props
        return (
            <FormGroup>
                <h2>
                    Player {playerNumber}(<span className={`p${playerNumber}_name`}>{color}</span>)
                </h2>
                <Input
                    type="text"
                    invalid={!this.state.isValid}
                    placeholder={`Player ${playerNumber} address`}
                    maxLength={45}
                    onChange={this.handleChange}
                    valid={this.state.isValid}
                    value={this.state.name}
                />
                <FormFeedback valid={false}>Sorry, that is not a valid address</FormFeedback>
            </FormGroup>
        )
    }
    private handleChange(event: any): void {
        const newName = event.target.value
        const isValid = !(/<|>/g.test(newName) || newName.trim() === "")
        this.setState({
            isValid,
            name: newName,
        })
    }
}
