import axios from "axios";

export const fetchFilms = async () => {
  return await axios.get("/list");
};

export const postFilm = async (payload) => {
  return await axios.post("/save", payload);
};

export const updateFilm = async (payload) => {
  console.log(payload);
  return await axios.post("/update", payload);
};

export const deleteFilm = async (payload) => {
  return await axios.delete("/delete", { params: { _id: payload } });
};
