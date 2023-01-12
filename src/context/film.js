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

  const mergeState = useCallback(
    (partialState) => {
      setContextData((prevState) => ({
        ...prevState,
        ...partialState,
      }));
    },
    [setContextData]
  );

  const clearItem = useCallback(() => {
    mergeState({ editFilm: {} });
  }, [mergeState]);

  const setEditItem = useCallback(
    (value) => {
      mergeState({ editFilm: value });
    },
    [mergeState]
  );

  const providerState = useMemo(
    () => ({
      state,
      setEditItem,
      clearItem,
    }),
    [state, setEditItem, clearItem]
  );

  return (
    <FilmContext.Provider value={providerState}>
      {children}
    </FilmContext.Provider>
  );
};

export const useFilmContext = () => useContext(FilmContext);
