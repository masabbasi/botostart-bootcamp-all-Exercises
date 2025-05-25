import { useMutation } from "@tanstack/react-query";
import { api } from "../configs/api.js";

export function useAddProduct() {
  const addProduct = async (values) => {
    const response = await api.post("/products", values);
    return response;
  };

  const mutation = useMutation({
    mutationFn: addProduct,
  });

  return {
    mutation,
  };
}
