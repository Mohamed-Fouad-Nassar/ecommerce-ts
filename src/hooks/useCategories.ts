import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getCategories } from "@store/categories/categoriesSlice";

export default function useCategories() {
  const dispatch = useAppDispatch();
  const {
    loading,
    records: categories,
    error,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!categories.length) dispatch(getCategories());
  }, [dispatch, categories]);

  return {
    loading,
    categories,
    error,
  };
}
