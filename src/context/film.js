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
