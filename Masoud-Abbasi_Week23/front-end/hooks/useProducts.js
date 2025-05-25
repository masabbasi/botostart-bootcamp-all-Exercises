import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../configs/api.js";

export function useProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async ({ queryKey }) => {
    const [, searchQuery, page] = queryKey;
    const response = await api.get(
      `/products?page=${page}&limit=5&name=${searchQuery}`
    );
    return response;
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["products", searchQuery, page],
    queryFn: fetchProducts,
    retry: 1,
  });

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    data,
    isSuccess,
    isLoading,
  };
}
