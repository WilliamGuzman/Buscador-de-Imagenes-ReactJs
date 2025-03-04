import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    //State que tomara la palabra del usuario para buscar las imagenes
    const [ termino, guardarTermino ] = useState('');

    //State para guardar el error
    const [ error, guardarError ] = useState(false);

    //Funcion  cuando el usuario haga submit
    const buscarImagenes = e => {
        e.preventDefault();
        
        //Validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }

        //Enviar termino de busqueda hacia el componente principal
        guardarError(false);
        guardarBusqueda(termino);
    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange={ e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>

            { error ? <Error mensaje="Agrega un termino de búsqueda" /> : null}

        </form>
     );
}
 
export default Formulario;