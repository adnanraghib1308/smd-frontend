import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const LoaderContext = createContext({ loading: false });

export const LoaderProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    // Listen for custom events to change loading state
    window.addEventListener("startLoading", handleStart);
    window.addEventListener("stopLoading", handleEnd);

    return () => {
      window.removeEventListener("startLoading", handleStart);
      window.removeEventListener("stopLoading", handleEnd);
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ loading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom Hook to use Loader Context
export const useLoader = () => useContext(LoaderContext);
