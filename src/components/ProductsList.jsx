import ProductItem from "./ProductItem";

export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No hay productos cargados aún.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full bg-gray-900 text-white">
        <thead className="bg-gray-800 text-sm uppercase text-gray-300">
          <tr>
            <th className="p-3 text-left">Producto</th>
            <th className="p-3 text-left">Categoría</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Precio</th>
            <th className="p-3 text-left">Proveedor</th>
            <th className="p-3 text-left">Ingreso</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
