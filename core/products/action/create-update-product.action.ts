import { Product } from "../interface/get-product";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);

  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct;
  }
  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  throw new Error("Function not implemented");
};

function createProduct(product: Partial<Product>) {
  throw new Error("function not implement");
}
