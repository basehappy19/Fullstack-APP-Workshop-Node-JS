import { useEffect, useState } from "react";
import { listby } from "../../functions/ProductFunction";
import ProductCard from "../ProductCard/ProductCard";
import LoadingCard from "../ProductCard/LoadingCard";

export default function ProductNew() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadData = async () => {
    await listby(10, "createdAt", "desc")
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <LoadingCard count={6} />
        ) : (
          product.map((item) => (
            <div className="col-md-4">
              <ProductCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
