export default function NotFoundPage() {
  return (
    <div style={{width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh"}}>
      <i className="pi pi-times" style={{fontSize: "30px", fontWeight: "lighter"}}></i>
      <p style={{fontSize: "100px", margin: 0}}>404!</p>
      <p style={{fontSize: "25px"}}>Página Não Encontrada</p>
    </div>
  )
}
