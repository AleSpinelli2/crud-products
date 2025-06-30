import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-gray-800 p-6 text-white shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-4">
                  ¿Eliminar producto?
                </Dialog.Title>
                <p className="mb-6 text-sm text-gray-300">
                  Esta acción no se puede deshacer. ¿Estás seguro de que querés
                  eliminar este producto?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
