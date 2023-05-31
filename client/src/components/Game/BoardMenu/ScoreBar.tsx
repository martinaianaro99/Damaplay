import React from "react"
import { IPlayerInfo } from "../../../sharedTypes"
import { Player } from "../../../util/MoveTree"
import "./ScoreBar.css"

interface IScoreBarProps {
    updateName: (player: "p1" | "p2", newName: string) => void
    turn: Player
    p1: IPlayerInfo
    p2: IPlayerInfo
    wager: number
}


const ScoreBar = (props: IScoreBarProps) => {
    return (
        <div id="score" style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: 1 }}>
    <span className="truncated-text" style={{ marginLeft: "20px", color: "black" }}>
      {props.p1.name.length > 12 ? props.p1.name.substring(0, 12) + "..." : props.p1.name}
    </span>
    : {props.p1.score}
  </div>
  <div style={{ marginLeft: "20px" }}>
    wager: {props.wager}💰
  </div>
  <div style={{ flex: 1, textAlign: "right" }}>
    <span className="truncated-text" style={{color:"red"}}>
      {props.p2.name.length > 12 ? props.p2.name.substring(0, 12) + "..." : props.p2.name}
    </span>
    : {props.p2.score}
  </div>
</div>



    )
}
export default ScoreBar
