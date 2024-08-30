import { Link } from "react-router-dom";

import { TCategory } from "@customTypes/category";

import styles from "./category.module.css";
const { category, categoryImg, categoryTitle } = styles;

export default function Category({ title, img, prefix }: TCategory) {
  return (
    <div className={category}>
      <Link to={`/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
}
