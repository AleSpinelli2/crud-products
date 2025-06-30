import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductsList";
import ProductModal from "./components/ProductModal";
import ConfirmModal from "./components/ConfirmModal";
import Pagination from "./components/Pagination";
import FilterBar from "./components/FilterBar";
import SortDropdown from "./components/SortDropdown";
import SearchBar from "./components/SearchBar";
import initialProducts from "./data/products.json";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const [productToEdit, setProductToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategory
      ? p.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const searchMatch = searchTerm
      ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return categoryMatch && searchMatch;
  });
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });
  // LOGICA PARA EL PAGINADO
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedProducts = sortedProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const openModal = (product = null) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setProductToEdit(null);
    setIsModalOpen(false);
  };

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: crypto.randomUUID() }]);
    closeModal();
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    closeModal();
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg h-[600px] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Catálogo de Productos</h1>
        </div>
        <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
          <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>
              <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                <button
                  onClick={() => openModal()}
                  className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
                >
                  + Agregar producto
                </button>
                <div className="flex items-center w-full space-x-3 md:w-auto">
                  <SortDropdown
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <FilterBar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(cat) => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductList
          products={paginatedProducts}
          onEdit={openModal}
          onDelete={confirmDelete}
        />

        <ProductModal isOpen={isModalOpen} onClose={closeModal}>
          <ProductForm
            onAdd={addProduct}
            onUpdate={updateProduct}
            productToEdit={productToEdit}
          />
        </ProductModal>
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) {
              setCurrentPage(page);
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
