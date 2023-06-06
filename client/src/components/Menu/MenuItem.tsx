import React, { Component } from "react"
import { Col, ListGroupItem, Row } from "reactstrap"
import { IGameInfo } from "../../sharedTypes"
import SavedGameInfo from "./SavedGameInfo"
import MenuItemButtons from "./MenuItemButtons"

interface IMenuItemProps {
    deleteGame: (index: number) => void
    info: IGameInfo
    index: number
}

interface IMenuItemState {
    showButtons: boolean
}

export default class MenuItem extends Component<IMenuItemProps, IMenuItemState> {
    constructor(props: IMenuItemProps) {
        super(props)
        this.state = {
            showButtons: false,
        }
    }

    public render() {
        const mouseEnter = () => this.setState({ showButtons: true })
        const mouseLeave = () => this.setState({ showButtons: false })
        return (
            <ListGroupItem
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                style={{
                    display: "inline-block",
                    marginBottom: "-4px",
                    width: "100%",
                }}
            >
                <Row>
                    <Col xs={8}>
                        <SavedGameInfo info={this.props.info} />
                    </Col>
                    <Col xs={4}>
                        <MenuItemButtons
                            index={this.props.index}
                            showButtons={this.state.showButtons}
                        />
                    </Col>
                </Row>
            </ListGroupItem>
        )
    }
}
