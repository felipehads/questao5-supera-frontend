import { Button } from "primereact/button";
import { InputMask, InputMaskChangeEvent } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findAllTransferenciasByFiltro } from "../api/services/Transferencia";
import DataTableComponent from "../components/DataTable";
import { FiltroTransferencia, Transferencia } from "../types/Transferencia";

export default function TransferenciasPage() {
  const location = useLocation();
  const [tableData, setTableData] = useState<Transferencia[]>([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [operadorTransacao, setOperadorTransacao] = useState("");
  const [saldoTotal, setSaldoTotal] = useState(0);
  const { data: { idConta, nomeResponsavel } } = location.state
  const navigate = useNavigate()

  const populateFiltro = (filtro: FiltroTransferencia) => {
    if(operadorTransacao != "") filtro = { ...filtro, operadorTransacao }
    if(dataInicio != "") { filtro = { ...filtro, dataInicio: dataInicio.split("/").reverse().join("-") } }
    if(dataFim != "") { filtro = { ...filtro, dataFim: dataFim.split("/").reverse().join("-") } }
    return filtro
  }

  const onChangeDataInicio = (e: InputMaskChangeEvent) => {
    setDataInicio(e.target.value!)
  }

  const onChangeDataFim = (e: InputMaskChangeEvent) => {
    setDataFim(e.target.value!)
  }

  const handleFiltrar = async () => {
    let filtro = populateFiltro({idConta})
    const transferencias: Transferencia[] = await findAllTransferenciasByFiltro(filtro);
    setTableData(transferencias)
  }

  useEffect(() => {
    const fetchData = async () => {
      const transferencias: Transferencia[] = await findAllTransferenciasByFiltro({idConta});
      const saldoTotalTransferencias = transferencias.reduce((acc:number, curr:Transferencia) => {
        return acc + curr.valor
      }, 0)
      setSaldoTotal(saldoTotalTransferencias)
      return transferencias
    }
    fetchData().then((data:Transferencia[]) => setTableData(data)).catch(console.error)
  }, [])

  return (
    <div style={{padding: "2rem 8rem"}}>
      <Button label="Voltar" style={{ display: "absolute" }} type="submit" icon="pi pi-angle-left" onClick={() => (navigate("/"))}/> 
      <h2>Bem vindo, {nomeResponsavel} !</h2>
      <div style={{ marginBottom: "1rem", display: "flex", width: "100%", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{flexGrow: 1}}>
          <p>Data Início </p>
          <InputMask style={{ width: "100%" }} value={dataInicio} onChange={onChangeDataInicio} mask="99/99/9999" placeholder="23/12/2005" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <p>Data Fim </p>
          <InputMask style={{ width: "100%" }} value={dataFim} onChange={onChangeDataFim} mask="99/99/9999" placeholder="23/12/2022" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <p>Nome do Operador Transacionado </p>
          <InputText style={{width: "100%"}} placeholder="Operador Responsável" value={operadorTransacao} onChange={(e) => setOperadorTransacao(e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button label="Pesquisar" onClick={handleFiltrar} />
      </div>
      {tableData.length > 0 ? <DataTableComponent saldoTotal={saldoTotal} transferencias={tableData} /> : <h2>Sem resultados</h2>}
    </div>
    
  )
}
