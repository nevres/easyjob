import { useContext } from "react";
import LoaderContext from "./LoaderContext";

const useLoader = () => {
  const confirm = useContext(LoaderContext);
  return confirm;
};

export default useLoader;
