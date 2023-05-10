import React from "react";

const DeletePopup = () => {
  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex gap-6 flex-col">
        <h2 className="text-xl">
          Are you sure you want to delete this recipe?
        </h2>
        <button className="text-sm font-bold text-red-400"> Delete Recipe</button>
      </div>
    </div>
  );
};

export default DeletePopup;
