import { useEffect } from "react";

import Heading from "@components/ui/Heading";
import GridList from "@components/ui/GridList";
import Loader from "@components/feedback/Loader";
import Category from "@components/eCommerce/Categories/Category";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getCategories } from "@store/categories/categoriesSlice";

import { TCategory } from "@customTypes/category";

export default function Categories() {
  const dispatch = useAppDispatch();
  const {
    loading,
    records: categories,
    error,
  } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!categories.length) dispatch(getCategories());
  }, [dispatch, categories]);

  return (
    <>
      <Heading>categories</Heading>

      <Loader loading={loading} error={error}>
        <GridList<TCategory>
          data={categories}
          renderItem={(category) => (
            <Category key={category.id} {...category} />
          )}
          error="there are no categories."
        />
      </Loader>
    </>
  );
}
