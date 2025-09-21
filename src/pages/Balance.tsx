import { useEffect, useState } from "react"
import { ethers } from "ethers"


export default function Balance() {
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    useEffect(() => {
        window.ethereum?.request({ method: "eth_requestAccounts" }).then((cuenta: any) => setAccount(cuenta[0]))?.catch(error => console.log(error))
        console.log("useEffect execution")
        const handleAccountsChanged = (accounts: any) => setAccount(accounts[0])
        window.ethereum?.on("accountsChanged", handleAccountsChanged)
        return () => window.ethereum?.removeListener("accountsChanged",handleAccountsChanged)
    }, [window.ethereum])
    useEffect(()=>{
        if(account){
            // window.ethereum?.request({
            //     method: "eth_getBalance",
            //     params: [account, "latest"]})
            //     .catch(error => console.log(error))
            //     .then((balance: any) => {
            //     })
            const provider = new ethers.BrowserProvider(window.ethereum)
            provider.getBalance(account).then(b => setBalance(ethers.formatEther(b)))
        }
    },[account])
    if (!window.ethereum) {
        return <>No hay metamask</>
    }
    if (!account) {
        return <>No hay cuenta</>
    }
    return <div>
        <h2>Balance</h2>
        <div>
            {account ? account : "Cargando..."}
        </div>
        <div>
            {balance}
        </div>
    </div>
}