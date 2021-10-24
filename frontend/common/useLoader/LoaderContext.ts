import { createContext } from "react";

type LoaderContextType = {
  addLoader(): void;
  removeLoader(): void;
};

const LoaderContext = createContext<LoaderContextType>({} as any);

export default LoaderContext;
