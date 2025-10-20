import "./style.css"

export default function SearchBar(){
    return(
        <section className="search-contenedor">
            <h2 className="seccion-titulo">Busca ofertas en cabañas y casas playeras</h2>
            <div className="search-box">
                <input type="text" placeholder="¿A donde vamos?" />
                <input type="text" placeholder="Check in - Check out" />
                <button className="search-btn">Buscar</button>
            </div>
        </section>
    )
}