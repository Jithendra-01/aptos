declare global {
    interface Window {
        aptos: any;
    }
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FirstPage() {
    const navigate = useNavigate();

    useEffect(() => {
        checkConnection();
    }, []);

    async function checkConnection() {
        try {
            const isConnected = await window.aptos.isConnected();
            console.log("Is connected:", isConnected);
            if (!isConnected) {
                alert("You are not connected to the wallet, redirecting to main page");
                console.log("Not connected, redirecting to home page.");
                navigate("/");
            } else {
                const add = await window.aptos.account();
                console.log("Account address:", add?.address);
            }
        } catch (error) {
            console.error("Error checking wallet connection:", error);
            alert("Error checking wallet connection. Redirecting to home page.");
            navigate("/");
        }
    }

    async function Disconnfun() {
        try {
            await window.aptos.disconnect();
        } catch (error) {
            console.error("Error disconnecting wallet:", error);
        }
        navigate("/");
    }

    return (
        <div>
            <p>This is the first page of your application.</p>
            <button onClick={Disconnfun}>Disconnect</button>
        </div>
    );
}