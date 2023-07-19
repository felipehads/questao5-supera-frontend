import { type FiltroTransferencia } from "../../types/Transferencia";
import { instance as axiosInstance } from "./../axios";

const findAllTransferenciasByFiltro = async (filtro: FiltroTransferencia) => {
  const { data } = await axiosInstance({
    method: "get",
    params: filtro,
    url: "/transferencia/filtrar",
  });

  return data;
}

const getContaByIdConta = async (idConta: number) => {
  const { data } = await axiosInstance({
    method: "get",
    params: {
      idConta
    },
    url: "transferencia/filtrar"
  })
  return data[0].conta;
}

export { findAllTransferenciasByFiltro, getContaByIdConta };

