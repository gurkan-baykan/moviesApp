import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
} from "react";

const FilmContext = createContext();

export const FilmContextProvider = ({ children }) => {
  const initialState = {
    editFilm: {},
  };

  const [state, setContextData] = useState(initialState);

  const mergeState = (partialState) => {
    setContextData((prevState) => ({
      ...prevState,
      partialState,
    }));
  };

  const setEditItem = useCallback((value) => {
    mergeState({ editFilm: value });
  }, []);

  const providerState = useMemo(
    () => ({
      state,
      setEditItem,
    }),
    [state, setEditItem]
  );

  return (
    <FilmContext.Provider value={providerState}>
      {children}
    </FilmContext.Provider>
  );
};

export const useFilmContext = () => useContext(FilmContext);
