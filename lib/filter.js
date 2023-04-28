const Filter = (products, query) => {
  let finalProducts = products;
  if (!query || Object.keys(query).length === 0) {
    return products;
  }
  if (query.category && query.category !== "all") {
    finalProducts = finalProducts.filter((p) => p.category === query.category);
  }
  if (query.rated > 0) {
    finalProducts = finalProducts.filter(
      (p) => Number(p.rating.rate) >= Number(query.rated)
    );
  }
  if (query.q && query.q.length > 0) {
    finalProducts = finalProducts.filter((p) =>
      p.title.toLowerCase().includes(query.q.toLowerCase())
    );
  }
  if (query.sorted) {
    if (query.sorted.startsWith("name")) {
      finalProducts = finalProducts.slice().sort((p1, p2) => {
        return query.sorted === "nameAsc"
          ? p1.title < p2.title
            ? -1
            : p1.title > p2.title
            ? 1
            : 0
          : p1.title < p2.title
          ? 1
          : p1.title > p2.title
          ? -1
          : 0;
      });
    } else {
      finalProducts = finalProducts.slice().sort((p1, p2) => {
        return query.sorted === "priceAsc"
          ? p1.price < p2.price
            ? -1
            : p1.price > p2.price
            ? 1
            : 0
          : p1.price < p2.price
          ? 1
          : p1.price > p2.price
          ? -1
          : 0;
      });
    }
  }
  return finalProducts;
};

export default Filter;
