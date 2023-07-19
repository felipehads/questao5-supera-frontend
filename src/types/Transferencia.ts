export interface Transferencia {
  id: number;
  dataTransferencia: Date;
  valor: number;
  tipo: String;
  nomeOperadorTransacao: string;
  conta: Conta;
}

export interface FiltroTransferencia {
  idConta: number;
  dataInicio?: string;
  dataFim?: string;
  operadorTransacao?: string;
}

interface Conta {
  idConta: number;
  nomeResponsavel: String;
}
