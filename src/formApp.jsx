import { useEffect, useState } from "react"
import { Form } from "./components/form"
import { Table } from "./components/table"
import { Resumen } from "./components/resumen"
import {
    actualizarProducto, crearProducto,
    eliminarProducto, suscribirProductos,
} from "./firebase/productosService"

const inicial = { nombre: "", cantidad: "", precio: "" }

export const FormApp = () => {
    const [info, setInfo] = useState([])
    const [cargando, setCargando] = useState(true)
    const [productoEditando, setProductoEditando] = useState(null)

    useEffect(() => {
        const unsubscribe = suscribirProductos((productos) => {
            setInfo(productos)
            setCargando(false)
        })
        return () => unsubscribe()
    }, [])

    const guardarInfo = async (valores) => {
        if (productoEditando) {
            await actualizarProducto(productoEditando.id, valores)
            setProductoEditando(null)
        } else {
            await crearProducto(valores)
        }
    }

    const editarInfo = (producto) => setProductoEditando(producto)
    const cancelarEdicion = () => setProductoEditando(null)
    const borrarInfo = async (id) => {
        await eliminarProducto(id)
        if (productoEditando?.id === id) setProductoEditando(null)
    }

    return (
        <>
            <h1>Inventario Almacen</h1>
            <div>
                <div>
                    <h2>Registrar Producto</h2>
                    <Form
                        key={productoEditando?.id ?? "nuevo"}
                        inicial={productoEditando ?? inicial}
                        guardarInfo={guardarInfo}
                        enEdicion={Boolean(productoEditando)}
                        cancelarEdicion={cancelarEdicion}
                    />
                </div>
                <div>
                    <h2>Productos</h2>
                    {cargando ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <Table info={info} editarInfo={editarInfo} borrarInfo={borrarInfo} />
                    )}
                </div>
                <div>
                    <h2>Resumen Inventario</h2>
                    <Resumen info={info} />
                </div>
            </div>
        </>
    )
}