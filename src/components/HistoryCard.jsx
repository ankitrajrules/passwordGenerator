import React from "react";
import Clipboard from "react-clipboard.js";
import clipboardIcon from "../assets/clipboard-regular.svg";
import "./HistoryCard.css";
const HistoryCard = ({ password, strength, index }) => {
	return (
		<div className="card">
			<h2>Password {index}</h2>
			<div className="clipboardIconRemainsOnSide">
			<p>
				<code style={{ color: strength > 3 ? ( strength > 4 ? ( strength==5 ?"green":"yellowgreen"): "yellow"): "red" }}>{password}</code>
			</p>
			<Clipboard
				style={{ margin: "auto", marginLeft: "10px", cursor: "pointer" }}
				data-clipboard-text={password}
			>
				<img src={clipboardIcon} alt="clipboard" />
			</Clipboard>
			</div>
		</div>
	);
};

export default HistoryCard;
