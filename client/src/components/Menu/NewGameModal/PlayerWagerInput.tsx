import React, { Component } from "react"
import { FormGroup, Input, Label } from "reactstrap"

interface IPlayerWagerInputProps {
}

interface IPlayerWagerInputState {
    wager: number
}

export default class PlayerWagerInput extends Component<IPlayerWagerInputProps, IPlayerWagerInputState> {
    public constructor(props: IPlayerWagerInputProps) {
        super(props)
        this.state = {
            wager: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    public render() {
        return (
            <FormGroup>
                <Label d={`MatchWager`}>
                    Game wager:
                </Label>
                <Input type="number" value={this.state.wager} onChange={this.handleChange} />
            </FormGroup>
        )
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const wager = parseInt(event.target.value)
        this.setState({
            wager: isNaN(wager) ? 0 : wager,
        })
    }
}
