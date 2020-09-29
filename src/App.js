import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {


  //State de la App
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);

  //Document.ready para ejecutar la busqueda la primera vez que se cargue la pagina y cuando el usuario quiere buscar algo
  useEffect(() => {
    
    const consultarApi = async () => {
      if( busqueda === '') return;
    
      const imagenesPorPaginas = 30;
      const key = '17634835-e87c03432986c7d4125645991';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPaginas}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //Calcular el total de Paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }

    consultarApi();

  }, [busqueda, paginaactual]);

  //Consultar pagina anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //Consultar pagina anterior
  const paginaSiguiente = () => {

    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"> Buscador de Imágenes</p>
        
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />

      </div>

      <div className="row justify-content-center">
          <ListadoImagenes 
            imagenes={imagenes}
          />

          {(paginaactual === 1) ? null: (

            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
              >&laquo;Anterior
            </button>
          )}

         {(paginaactual === totalpaginas) ? null: (

            <button
              type="button"
              className="btn btn-info"
              onClick={paginaSiguiente}
              > &raquo; Siguiente
            </button>
         )}
      </div>

    </div>
  );
}

export default App;
