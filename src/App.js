import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { fetchFilms, postFilm, updateFilm, deleteFilm } from "./services/films";
import FilmsDialog from "./components/FilmsDialog";
import Header from "./components/Header";
import { Col, Row, Card, Button, Modal, Input } from "antd";
import "./App.css";
import SwiperSlider from "./components/SwiperSlider";
import ListFilms from "./screen/ListFilms";
import { FilmContextProvider } from "./context/film";

axios.defaults.baseURL = "http://localhost:3007/film";
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const [films, setFilm] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const saveFilm = useCallback((state) => {
    if (state._id) {
      updateFilm(state).then(() => {
        getFilms();
        handleCancel();
      });
    } else {
      postFilm(state).then(() => {
        getFilms();
        handleCancel();
      });
    }
  }, []);

  const deprecateFilm = useCallback((_id) => {
    deleteFilm(_id).then((res) => getFilms());
  }, []);

  const editFilm = () => {
    setIsModalOpen(true);
  };
  const getFilms = useCallback(() => {
    fetchFilms().then(({ data }) => {
      setFilm(data.data);
    });
  }, [films]);

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <FilmContextProvider>
      <div className="App">
        <Header />
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          style={{ margin: 15 }}
          justify={"start"}
          align={"start"}
        >
          <Col span={6}>
            <Button onClick={showModal} type="primary">
              Create Film
            </Button>
          </Col>

          {isModalOpen === true ? (
            <FilmsDialog handleCancel={handleCancel} saveFilm={saveFilm} />
          ) : (
            <></>
          )}
        </Row>

        <div className="Swiper">
          <Row style={{ width: "100%" }}>
            <Col span={18} offset={3}>
              <SwiperSlider films={films} />
            </Col>
          </Row>
        </div>

        <ListFilms films={films} editFilm={editFilm} />
      </div>
    </FilmContextProvider>
  );
}

export default App;
