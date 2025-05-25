import { useMutation } from "@tanstack/react-query";
import { api } from "../configs/api.js";
import { useApp } from "@/context/AppProvider.js";

export function useEditProduct() {
  const {
    state: { selectProduct, editProduct: product },
    dispatch,
  } = useApp();
  const editProduct = async (values) => {
    const response = await api.put(`/products/${selectProduct}`, values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: editProduct,
  });

  return {
    mutation,
    selectProduct,
    product,
    dispatch,
  };
}
