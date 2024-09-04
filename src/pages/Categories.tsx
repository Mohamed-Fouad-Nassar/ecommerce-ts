import Heading from "@components/ui/Heading";
import GridList from "@components/ui/GridList";
import Loader from "@components/feedback/Loader";
import Category from "@components/eCommerce/Categories/Category";

import useCategories from "@hooks/useCategories";

import { TCategory } from "@customTypes/category.types";

export default function Categories() {
  const { loading, categories, error } = useCategories();

  return (
    <>
      <Heading title="categories" />

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
