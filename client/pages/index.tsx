import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Feed from "../components/home/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import metamaskLogo from "../assets/metamask.png";
import errorImg from "../assets/error.png";
import Image from "next/image";

// const style = {
// 	wrapper: `flex justify-between h-screen w-screen select-none bg-white`,
// 	content: `flex justify-between`,
// 	loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
// 	walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
// 	loginContent: `text-3xl font-bold text-center mt-24`,
// };

const Home = () => {
	const { appStatus, connectWallet } = useContext(TwitterContext);

	const app = (status = appStatus) => {
		switch (status) {
			case "connected":
				return userLoggedIn;

			case "notConnected":
				return noUserFound;

			case "noMetaMask":
				return noMetaMaskFound;

			case "error":
				return error;

			default:
				return loading;
		}
	};

	const userLoggedIn = (
		<>
			<div className="flex">
				<Sidebar initialSelectedIcon={"Home"} />
				<Feed />
				<Widgets />
			</div>
		</>
	);

	const noUserFound = (
		<div className="flex justify-center text-center font-semibold h-screen items-center">
			<div>
				<Image src={metamaskLogo} width={200} height={200} />
				<div
					className="bg-white rounded-2xl p-2"
					onClick={() => connectWallet()}
				>
					Connect Wallet
				</div>
				<div className="text-white p-2">Connect to Metamask.</div>
			</div>
		</div>
	);

	const noMetaMaskFound = (
		<div className="flex justify-center text-center font-semibold h-screen items-center">
			<div>
				<Image src={metamaskLogo} width={200} height={200} />
				<div className="bg-white rounded-2xl p-2">
					<a
						target="_blank"
						rel="noreferrer"
						href={`https://metamask.io/download.html`}
					>
						You must install Metamask, a <br /> virtual Ethereum
						wallet, in your browser.
					</a>
				</div>
			</div>
		</div>
	);

	const error = (
		<div className="flex justify-center text-center font-semibold h-screen items-center">
			<div>
				<Image src={errorImg} width={250} height={200} />
				<div className="">
					An error occurred. Please try again later or from another
					browser.
				</div>
			</div>
		</div>
	);

	const loading = (
		<div className="flex justify-center text-center font-semibold h-screen items-center">
			<div className="text-white">Loading...</div>
		</div>
	);

	return <div className="">{app(appStatus)}</div>;
};

export default Home;
