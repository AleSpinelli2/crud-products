import { useState, useEffect } from "react";

const initialForm = {
  name: "",
  price: "",
  email: "",
  date: "",
  category: "",
  stock: "",
};

export default function ProductForm({ onAdd, onUpdate, productToEdit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setForm(productToEdit);
    }
  }, [productToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) {
      newErrors.name = "Nombre requerido";
    } else if (!/[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(form.name)) {
      newErrors.name = "El nombre debe contener al menos una letra";
    }
    if (!form.price || form.price <= 0) newErrors.price = "Precio mayor a 0";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Correo electronico inválido";
    if (!form.date) newErrors.date = "Fecha requerida";
    if (!form.category) newErrors.category = "Categoría requerida";
    if (!form.stock || form.stock < 0) newErrors.stock = "Stock inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (form.id) {
      onUpdate(form);
    } else {
      onAdd(form);
    }
    setForm(initialForm);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-200">Nombre del producto</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-200">Precio</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.price && (
            <p className="text-red-400 text-sm">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200">Correo del proveedor</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200">Fecha de ingreso</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.date && <p className="text-red-400 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-gray-200">Categoría</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-200">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          {errors.stock && (
            <p className="text-red-400 text-sm">{errors.stock}</p>
          )}
        </div>
      </div>

      <div className="mt-4 text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          {form.id ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
