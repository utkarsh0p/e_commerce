import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div>
        {category} page
    </div>
  );
};

export default CategoryPage;
