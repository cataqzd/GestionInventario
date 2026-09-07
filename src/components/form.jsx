import { useState } from "react"
 export const Form = ({ inicial, guardarInfo, enEdicion, cancelarEdicion }) => {
    const [valores, setValores] = useState(inicial)
    const { nombre, cantidad, precio } = valores
 
    const cambio = ({ target }) => {
        setValores({ ...valores, [target.name]: target.value })
    }
    const guardar = async (e) => {
        e.preventDefault()
        if (nombre.trim() === '' || cantidad.trim() === '' || precio.trim() === '')
            return alert('Completa los campos')
        await guardarInfo(valores)
        reset()
    }
    const reset = () => setValores(inicial)
 
    return (
        <form >
            <label>Nombre Producto</label>
            <input type="text" name="nombre" value={nombre} onChange={cambio} />
            <label>Cantidad</label>
            <input type="number" name="cantidad" value={cantidad} onChange={cambio} min="0" />
            <label>Precio</label>
            <input type="number" name="precio" value={precio} onChange={cambio} min="0" />
            <button onClick={guardar}>{enEdicion ? 'Actualizar' : 'Guardar'}</button>
            {enEdicion && <button type="button" onClick={cancelarEdicion}>Cancelar</button>}
        </form>
    )
}
