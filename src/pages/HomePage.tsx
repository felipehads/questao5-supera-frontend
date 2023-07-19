// import axios from "axios";
import { Button } from "primereact/button";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Messages } from 'primereact/messages';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContaByIdConta } from "../api/services/Transferencia";

export default function HomePage() {
  const [contaEscolhida, setContaEscolhida] = useState<number>();
  const msgs = useRef<Messages>(null);
  
  const navigate = useNavigate()

  const handleContaChange = (event: InputNumberValueChangeEvent) => {
    setContaEscolhida(event.target.value!);
  };

  const handleSubmit = async () => {
    try {
      const conta = await getContaByIdConta(contaEscolhida!);
      navigate("/transferencias", { state: { data: conta }})
    } catch (error) {
      msgs.current?.show(
        { sticky: true, severity: 'error', summary: 'Erro', detail: 'Conta bancária não encontrada!', closable: true }
      )
      console.error(error);
    }
  };

  return (
    <>
      <Messages ref={msgs} />
      <div style={{ display:"flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
        <p>Digite o número da sua conta: </p>
        <InputNumber style={{minWidth: "250px"}} value={contaEscolhida} onValueChange={handleContaChange} locale="pt-BR" placeholder="Nº Conta Bancária"/>
        <Button style={{margin: "1rem 0 1rem 0"}} label="Pesquisar Transferências" onClick={handleSubmit}/>
      </div>
      
    </>
  )
}
