import { useMemo, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

function GalleryPage({ products, loading }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const categories = useMemo(() => {
    const list = new Set(products.map((p) => p.category || "General"));
    return ["All", ...Array.from(list)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
      const matchCategory =
        selectedCategory === "All" || (p.category || "General") === selectedCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === "asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="relative mb-10 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-violet-600 to-cyan-500 p-10 text-white shadow-xl md:p-14">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          Product Gallery
        </p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Discover Our Products</h2>
        <p className="mt-3 text-white/80">
          {products.length} items available by Janssen Bauca
        </p>
      </section>


      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm shadow-xs outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
          </div>


          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-xs outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="default">Sort by: Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>


        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="py-20 text-center text-slate-400">Loading products...</p>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onSelect={(product) => setActiveModalProduct(product)}
        />
      )}


      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </main>
  );
}

export default GalleryPage;