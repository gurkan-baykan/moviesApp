import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { fetchFilms, postFilm, updateFilm, deleteFilm } from "./services/films";
import FilmsDialog from "./components/FilmsDialog";
import Header from "./components/Header";
import { Col, Row, Button } from "antd";
import "./App.css";
import SwiperSlider from "./components/SwiperSlider";
import ListFilms from "./screen/ListFilms";
import { FilmContextProvider } from "./context/film";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3007/film";
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const [films, setFilm] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const saveFilm = useCallback((state) => {
    setLoading(true);
    if (state._id) {
      updateFilm(state)
        .then(() => {
          setLoading(false);
          getFilms();
          handleCancel();
        })
        .catch((e) => console.log(e));
    } else {
      postFilm(state)
        .then(() => {
          setLoading(false);
          getFilms();
          handleCancel();
        })
        .catch((e) => console.log(e));
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

  const goPage = (item) => {
    console.log(item, 13432);
    return navigate("/FilmDetails", { replace: true, state: { item } });
  };
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
            <FilmsDialog
              handleCancel={handleCancel}
              saveFilm={saveFilm}
              loading={loading}
            />
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

        <div>
          <Row justify="start" wrap={true}>
            <Col span={10}>
              <span style={{ fontWeight: "bold", fontSize: 20 }}>
                Yeni Listeler
              </span>
            </Col>
          </Row>

          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{ margin: 15 }}
          >
            {films.map((item) => {
              return (
                <ListFilms
                  goPage={goPage}
                  item={item}
                  editFilm={editFilm}
                  deprecateFilm={deprecateFilm}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </FilmContextProvider>
  );
}

export default App;
