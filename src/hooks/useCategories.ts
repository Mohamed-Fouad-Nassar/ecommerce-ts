import { useEffect } from "react";

import {
  cleanUpCategories,
  getCategories,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export default function useCategories() {
  const dispatch = useAppDispatch();
  const {
    loading,
    records: categories,
    error,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    const promise = dispatch(getCategories());

    return () => {
      promise.abort();
      dispatch(cleanUpCategories());
    };
  }, [dispatch]);

  return {
    loading,
    categories,
    error,
  };
}
