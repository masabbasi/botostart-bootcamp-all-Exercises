import { useMutation } from "@tanstack/react-query";
import { api } from "../configs/api.js";
import { useApp } from "@/context/AppProvider.js";

export function useDeleteProduct() {
  const {
    state: { selectProduct },
    dispatch,
  } = useApp();

  const deleteProduct = async () => {
    const response = await api.delete(`/products/${selectProduct}`);
    return response;
  };

  const mutation = useMutation({
    mutationFn: deleteProduct,
  });

  return {
    selectProduct,
    dispatch,
    mutation,
  };
}
