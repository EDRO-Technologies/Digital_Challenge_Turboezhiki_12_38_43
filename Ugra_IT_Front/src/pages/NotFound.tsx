import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-[50px]"> 404 | Страница не найдена</h1>
      <Link className="bg-primary text-white p-[10px] rounded-lg" to={-1}>
        Вернуться назад
      </Link>
    </div>
  );
};

export default NotFound;
