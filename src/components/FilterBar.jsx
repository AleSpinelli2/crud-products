import React, { useState } from "react";
export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  const [open, setOpen] = useState(false);
  const handleClick = (cat) => {
    onCategoryChange(cat);
    setOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Categoría
        <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Categoría
          </h6>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <input
                id="all"
                type="radio"
                name="category"
                checked={selectedCategory === ""}
                onChange={() => handleClick("")}
                className="w-4 h-4 rounded bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-primary-600 focus:ring-2"
              />
              <label
                htmlFor="all"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Todas
              </label>
            </li>
            {categories.map((cat) => (
              <li key={cat} className="flex items-center">
                <input
                  id={cat}
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => handleClick(cat)}
                  className="w-4 h-4 rounded bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-primary-600 focus:ring-2"
                />
                <label
                  htmlFor={cat}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
