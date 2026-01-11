import useFetch from "../hooks/useFetch";

export default function OffersPage() {
  const { data, loading, error, refetch } = useFetch(
    "https://dummyjson.com/products?limit=9"
  );

  const offers = data?.products || [];

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Special Offers</h1>
        <p>דף ה־API – מציג מבצעים ממקור חיצוני.</p>

        <button onClick={refetch} style={{ marginTop: 12 }}>
          Refetch
        </button>
      </header>

      {loading && <p style={{ padding: 12 }}>Loading...</p>}

      {error && (
        <div style={{ padding: 12 }}>
          <p>Error: {error}</p>
          <button onClick={refetch}>Try again</button>
        </div>
      )}

      {!loading && !error && (
        <div className="cards-grid">
          {offers.map((item) => (
            <div key={item.id} className="offer-card">
              <img
                className="offer-img"
                src={item.thumbnail}
                alt={item.title}
              />
              <h3 className="offer-title">{item.title}</h3>
              <p className="offer-price">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
