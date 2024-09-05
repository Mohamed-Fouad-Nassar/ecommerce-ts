import ContentLoader from "react-content-loader";

import styles from "./cartSkeleton.module.css";
const { cartItem } = styles;

export default function CartSkeleton() {
  const skeleton = Array(3)
    .fill(0)
    .map(({ i }) => (
      <div className={cartItem} key={i}>
        <ContentLoader
          speed={2}
          width={270}
          height={180}
          viewBox="0 0 270 180"
          backgroundColor="#e0e0e0"
          foregroundColor="#f2f2f2"
        >
          <rect x="0" y="0" rx="4" ry="4" width="120" height="180" />
          <rect x="126" y="141" rx="3" ry="3" width="140" height="38" />
          <rect x="126" y="7" rx="3" ry="3" width="140" height="10" />
          <rect x="126" y="35" rx="3" ry="3" width="140" height="10" />
          <rect x="126" y="66" rx="3" ry="3" width="140" height="10" />
        </ContentLoader>

        <ContentLoader
          speed={2}
          width={60.87}
          height={66}
          viewBox="0 0 60.87 66"
          backgroundColor="#e0e0e0"
          foregroundColor="#f2f2f2"
        >
          <rect x="0" y="0" rx="4" ry="4" width="60.87" height="10" />
          <rect x="0" y="28" rx="4" ry="4" width="60.87" height="36" />
        </ContentLoader>
      </div>
    ));

  return <>{skeleton}</>;
}
