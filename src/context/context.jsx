import React, { createContext } from "react";
let newDate = new Date();

let dd = String(newDate.getDate()).padStart(2, "0");
let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = newDate.getFullYear();

newDate = yyyy + "-" + mm + "-" + dd;
const contextTemplate = {
  date: newDate,
};

export const AppContext = createContext(contextTemplate);

export default function context({ children }) {
  return (
    <AppContext.Provider date={contextTemplate}>{children}</AppContext.Provider>
  );
}
