export default function HomeNavbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Moneyly</a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Gastos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Ingresos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Perfil</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}