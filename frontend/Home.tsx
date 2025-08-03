declare global {
    interface Window {
        aptos: any;
    }
}

import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    async function connectbtn() {
        try {
            console.log("Connect button clicked!");
            const isconnected = await window.aptos.isConnected();
            console.log("Is connected:", isconnected);
            if (!isconnected) {
                await window.aptos.connect();
                navigate("/first");
            } else {
                console.log("Already connected");
                const add = await window.aptos.account();
                console.log("Account address:", add?.address);
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            alert("Error connecting to wallet.");
        }
    }

    return (
        <>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your application.</p>
            <button onClick={connectbtn}>connect</button>
        </>
    );
}