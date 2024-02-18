import { useState, useEffect } from "react";
import clipboardIcon from "./assets/clipboard-regular.svg";
import "./App.css";
import HistoryCard from "./components/HistoryCard.jsx";
import Clipboard from "react-clipboard.js";

function App() {
	const [lengthOfPasswordInput, setLengthOfPasswordInput] = useState(0);
	const [showPassword, setShowPassword] = useState("");
	const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
	const [useNumbers, setUseNumbers] = useState(true);
	const [useUpperCase, setUseUpperCase] = useState(true);
	const [useLowerCase, setUseLowerCase] = useState(true);
	const [previousPasswords, setPreviousPasswords] = useState([]);
	const [isHistoryVisible, setIsHistoryVisible] = useState(false);
	const [isNotLaptop, setIsNotLaptop] = useState(window.innerWidth <= 768);

	let specialCharacters = useSpecialCharacters
		? " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
		: "";
	let upperCaseCharacters = useUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
	let lowerCaseCharacters = useLowerCase ? "abcdefghijklmnopqrstuvwxyz" : "";
	let numbers = useNumbers ? "0123456789" : "";
	let passwordsIsFrom =
		numbers + upperCaseCharacters + lowerCaseCharacters + specialCharacters;
	passwordsIsFrom = passwordsIsFrom.split("");

	const passwordsGenerator = (lengthOfPassword) => {
		let password = "";
		for (let i = 0; i < lengthOfPassword; i++) {
			password +=
				passwordsIsFrom[Math.floor(Math.random() * passwordsIsFrom.length)];
		}
		setPreviousPasswords([
			...previousPasswords,
			{ password: password, strength: getPasswordStrength(password) },
		]);
		setShowPassword(password);
	};
	const getPasswordStrength = (password) => {
		let strength = 0;

		// Check the length of the password
		if (password.length >= 8) {
			strength++;
			console.log("length");
		}

		// Check for uppercase letters
		if (password.match(/[A-Z]/)) {
			strength++;
			console.log("upper");
		}

		// Check for lowercase letters
		if (password.match(/[a-z]/)) {
			strength++;
			console.log("lower");
		}

		// Check for numbers
		if (password.match(/[0-9]/)) {
			strength++;
			console.log("number");
		}

		// Check for special characters
		if (password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)) {
			strength++;
			console.log("special");
		}

		console.log(strength);
		return strength;
	};

	useEffect(() => {
		const handleResize = () => {
			setIsNotLaptop(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		console.log(isHistoryVisible);
		console.log(isNotLaptop);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [window.innerWidth]);

	return (
		<>
			<div className="main-container">
				<div className="generator">
					<h1>Random Password Generator</h1>
					{isNotLaptop  && (
						<div className={`history ${previousPasswords.length > 0 ? 'visible' : ''}`}>
							<p>History</p>
							<button onClick={() => setIsHistoryVisible(!isHistoryVisible)}>
								{isHistoryVisible ? "Hide" : "Show"}
							</button>
						</div>
					)}

					<div className="cardSelection">
						<p className="read-the-docs">Enter the length of password</p>
						<input
							type="number"
							value={lengthOfPasswordInput}
							onChange={(e) => setLengthOfPasswordInput(e.target.value)}
						/>
						<div style={{ display: "flex", flexWrap: "wrap" }}>
							<label>
								<input
									type="checkbox"
									checked={useSpecialCharacters}
									onChange={() =>
										setUseSpecialCharacters(!useSpecialCharacters)
									}
								/>
								Use special characters
							</label>
							<label>
								<input
									type="checkbox"
									checked={useNumbers}
									onChange={() => setUseNumbers(!useNumbers)}
								/>
								Use numbers
							</label>
							<label>
								<input
									type="checkbox"
									checked={useUpperCase}
									onChange={() => setUseUpperCase(!useUpperCase)}
								/>
								Use uppercase letters
							</label>
							<label>
								<input
									type="checkbox"
									checked={useLowerCase}
									onChange={() => setUseLowerCase(!useLowerCase)}
								/>
								Use lowercase letters
							</label>
						</div>
						<button
							onClick={() => {
								setLengthOfPasswordInput(lengthOfPasswordInput);
								passwordsGenerator(lengthOfPasswordInput);
							}}
						>
							Generate
						</button>
						<p
							style={{
								display: "flex",
								padding: "10px",
								alignContent: "center",
								justifyContent: "center",
								borderRadius: "5px",
								color: "black",
								backgroundColor: "grey",
							}}
						>
							<code
								style={{
									wordWrap: "break-word",
									wordBreak: "break-all",
									whiteSpace: "pre-wrap",
								}}
							>
								{showPassword}
							</code>
							<Clipboard
								style={{ marginLeft: "10px", cursor: "pointer" }}
								data-clipboard-text={showPassword}
							>
								<img src={clipboardIcon} alt="clipboard" />
							</Clipboard>
						</p>
						<div>
							<strong style={{ marginRight: "10px", color: "black" }}>
								Password Strength:
							</strong>
							<progress
								value={getPasswordStrength(showPassword)}
								max="5"
								style={{ width: "100%" }}
							></progress>
						</div>
					</div>
				</div>
				{(isHistoryVisible || !isNotLaptop) && (
					<div className="history-cards">
						{isHistoryVisible && isNotLaptop && (
							<button onClick={() => setIsHistoryVisible(!isHistoryVisible)}>
								{isHistoryVisible ? "Hide" : "Show"}
							</button>
						)}
						<h1>Previous Passwords</h1>
						{/* Use the state to conditionally render the history container */}

						<div className="password-card-container">
							{previousPasswords.map(({ password, strength }, index) => (
								<HistoryCard
									key={index}
									password={password}
									strength={strength}
									index={index + 1}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
