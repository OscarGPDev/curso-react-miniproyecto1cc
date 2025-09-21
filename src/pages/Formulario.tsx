import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useForm } from "react-hook-form"


export default function Formulario() {
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [txresult, setTxresult] = useState(null)
    const { register, handleSubmit } = useForm()
    useEffect(() => {
        window.ethereum?.request({ method: "eth_requestAccounts" }).then((cuenta: any) => setAccount(cuenta[0]))?.catch(error => console.log(error))
        console.log("useEffect execution")
        const handleAccountsChanged = (accounts: any) => setAccount(accounts[0])
        window.ethereum?.on("accountsChanged", handleAccountsChanged)
        return () => window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
    }, [window.ethereum])
    useEffect(() => {
        if (account) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            provider.getBalance(account).then(b => setBalance(ethers.formatEther(b)))
        }
    }, [account])
    if (!window.ethereum) {
        return <>No hay metamask</>
    }
    if (!account) {
        return <>No hay cuenta</>
    }
    const submit = async (data) => {
        const parameters = {
            from: account,
            to: data.address,
            value: ethers.parseEther(data.amount).toString() // Cambiado a toString()
        }
        if(window.ethereum){
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [parameters]
            }).catch(error => console.log(error))
            setTxresult(txHash)
            
        }
        
        console.log(data)
    }
    function ResultadoTransaccion({hash}){
        if(!hash){
            return
        }
        return <div className="alert alert-success">
            <b>Exito en la transferencia: </b>
            {txresult}
        </div>
    }
    return <div>
        <h2>Enviar ETH</h2>
        <div>
            <b>Cuenta: </b>{account ? account : "Cargando..."}
        </div>
        <div>
            <b>Saldo: </b>{balance}
        </div>
        <form className="form-inline" onSubmit={handleSubmit(submit)}>
            <div className="form-group mb-3">
                <label htmlFor="address">Address</label>
                <input id="address" type="text" className="form-control" {...register("address")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="amount">Amount</label>
                <input id="amount" type="text" className="form-control" {...register("amount")} />
            </div>
            <button type="submit" className="btn btn-primary mb-3">Send</button>
        </form>
        <ResultadoTransaccion hash={txresult}/>
    </div>
}