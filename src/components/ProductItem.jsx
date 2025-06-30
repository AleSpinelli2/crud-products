export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800">
      <td className="p-3">{product.name}</td>
      <td className="p-3">
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
      </td>
      <td className="p-3">
        <span
          className={`text-sm font-semibold ${
            product.stock > 100
              ? "text-green-400"
              : product.stock > 0
              ? "text-yellow-400"
              : "text-red-500"
          }`}
        >
          {product.stock}
        </span>
      </td>
      <td className="p-3">${parseFloat(product.price).toFixed(2)}</td>
      <td className="p-3">{product.email}</td>
      <td className="p-3">{product.date}</td>
      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => onEdit(product)}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-sm rounded"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
