
import { OfflineSigner } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import React, { Component, CSSProperties } from "react"
import { Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import { CheckersSigningStargateClient } from "src/checkers_signingstargateclient"
import { checkersChainId, getCheckersChainInfo } from "src/types/checkers/chain"
import "./NewGame.css"
import PlayerNameInput from "./PlayerNameInput"
import PlayerWagerInput from "./PlayerWagerInput"
import Long from "long"

declare global {
    interface Window extends KeplrWindow {}
}

interface CreatorInfo {
    creator: string
    signingClient: CheckersSigningStargateClient
}

interface INewGameModalProps {
    close: () => void
    shown: boolean
    rpcUrl: string
}

interface INewGameModalState {
    showAlert: boolean
    creator: string
    signingClient: CheckersSigningStargateClient | undefined
}

export default class NewGameModal extends Component<INewGameModalProps, INewGameModalState> {
    private readonly linkStyles: CSSProperties = {
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: '100%',
    }
    private readonly p1NameRef: React.RefObject<PlayerNameInput>
    private readonly p2NameRef: React.RefObject<PlayerNameInput>
    private readonly wagerRef: React.RefObject<PlayerWagerInput>

    public constructor(props: INewGameModalProps) {
        super(props)
        this.state = {
            showAlert: false,
            creator: "",
            signingClient: undefined,
        }
        this.p1NameRef = React.createRef()
        this.p2NameRef = React.createRef()
        this.wagerRef = React.createRef()

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    protected async getSigningStargateClient(): Promise<CreatorInfo> {
        if (this.state.creator && this.state.signingClient)
            return {
                creator: this.state.creator,
                signingClient: this.state.signingClient,
            }
        const { keplr } = window
        if (!keplr) {
            alert("You need to install Keplr")
            throw new Error("You need to install Keplr")
        }
        await keplr.experimentalSuggestChain(getCheckersChainInfo())
        await keplr.enable(checkersChainId)
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner!(checkersChainId)
        const creator = (await offlineSigner.getAccounts())[0].address
        const client: CheckersSigningStargateClient = await CheckersSigningStargateClient.connectWithSigner(
            this.props.rpcUrl,
            offlineSigner,
            {
                gasPrice: GasPrice.fromString("1stake"),
            },
        )
        this.setState({ creator: creator, signingClient: client })
        return { creator: creator, signingClient: client }
    }

    public render() {
        return (
            <Modal isOpen={this.props.shown} onExit={this.props.close} size="lg" tabIndex={-1}>
                <ModalHeader toggle={this.props.close}>Create A New Game</ModalHeader>
                <ModalBody>
                    <p>Set the addresses of the players</p>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <PlayerNameInput playerNumber={1} ref={this.p1NameRef} />
                            </Col>
                            <Col xs={6}>
                                <PlayerNameInput playerNumber={2} ref={this.p2NameRef} />
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Form>
                        <Row>
                            <Col xs={5}>
                                <PlayerWagerInput ref={this.wagerRef}/>
                            </Col>
                            <Col xs={7}>
                                    <div style={this.linkStyles}>
                                        <Button color="success" size="lg" onClick={this.handleSubmit} >
                                            Play Game!
                                        </Button>
                                        <Button color="danger" size="lg" onClick={this.props.close}>
                                            Cancel
                                        </Button>
                                    </div>
                            </Col>
                        </Row>
                    </Form>
                </ModalFooter>
            </Modal>
        )
    }

    private async handleSubmit(event: any): Promise<void> {
        if (
            this.p1NameRef.current &&
            this.p2NameRef.current &&
            this.wagerRef.current
        ) {
            const { name: p1Name, isValid: p1Valid } = this.p1NameRef.current.state
            const { name: p2Name, isValid: p2Valid } = this.p2NameRef.current.state
            const { wager: wager } = this.wagerRef.current.state
            if (p1Valid && p2Valid) {
                const { creator, signingClient } = await this.getSigningStargateClient()
                const index: string = await signingClient.createGuiGame(creator, p1Name, p2Name, Long.fromNumber(wager) )
                this.props.close()
                window.location.replace(`/play/${index}`)
            } else {
                event.preventDefault()
            }
        }
    }
}
