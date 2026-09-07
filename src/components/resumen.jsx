export const Resumen = ({ info }) => {
const totalProductos = info.length
const totalUnidades = info.reduce(
(acumulado, item) => acumulado + Number(item.cantidad),
0
)
const valorTotal = info.reduce(
(acumulado, item) => acumulado + (Number(item.cantidad) * Number(item.precio)),
0
)
return (
<div>
<p>Productos distintos: {totalProductos}</p>
<p>Unidades totales en stock: {totalUnidades}</p>
<p>Valor total del inventario: ${valorTotal}</p>
</div>
)
}
