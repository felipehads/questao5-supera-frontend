import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Transferencia } from '../types/Transferencia';

export default function DataTableComponent(props: any) {
  const { transferencias, saldoTotal } = props

  const formatDateTimeToDate = (dateInput: Date) => {
    if (dateInput == null) return null
    return dateInput.toString().split("T")[0].split("-").reverse().join("/")
  }

  const formattedDate = (transferencia: Transferencia) => {
    return formatDateTimeToDate(transferencia.dataTransferencia)
  }

  const treatEmptyOperador = (transferencia: Transferencia) => {
    return transferencia.nomeOperadorTransacao ? transferencia.nomeOperadorTransacao : "Não Informado"
  }
  
  const formattedValor = (transferencia: Transferencia) => {
    const formattedValor = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(transferencia.valor)

    const backgroundColor = transferencia.valor > 0 ? "green" : "red"

    return (
      <div style={{backgroundColor, color: "white", width: "fit-content", padding: "3px", borderRadius: "5px"}}>
        {formattedValor}
      </div>
    )
  }

  const getFormattedSaldoTotal = () => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(saldoTotal)
  }


  const getSaldoAtual = () => {
    const saldoAtual = (transferencias.reduce((acc: number, curr: Transferencia) => {
      return acc + (curr.valor)
    }, 0))

    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(saldoAtual)
  }

  return (
    <div className="card">
      <div style={{display: "flex",justifyContent: "space-between"}}>
        <p>Saldo Total: {getFormattedSaldoTotal()}</p>
        <p>Saldo no período: {getSaldoAtual()}</p>
      </div>
      <DataTable paginator rows={2} rowsPerPageOptions={[2, 5, 10, 25, 50]} value={transferencias}>
        <Column field="dataTransferencia" header="Dados" body={formattedDate}></Column>
        <Column field="valor" header="Valência" body={formattedValor} ></Column>
        <Column field="tipo" header="Tipo" ></Column>
        <Column field="nomeOperadorTransacao" header="Nome do Operador Transacionado" body={treatEmptyOperador}></Column>
      </DataTable>
    </div>
  )
}
