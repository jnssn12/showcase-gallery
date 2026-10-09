function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          ✕
        </button>

        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80 w-full object-cover"
          />
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {product.category || "General"}
            </span>
            <span className="text-2xl font-bold text-indigo-600">
              ₱{Number(product.price).toLocaleString()}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;