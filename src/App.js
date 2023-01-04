import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { fetchFilms, postFilm, updateFilm, deleteFilm } from "./services/films";

import Header from "./components/Header";
import { Col, Row, Card, Button, Modal, Input } from "antd";
import "./App.css";
import SwiperSlider from "./components/SwiperSlider";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

axios.defaults.baseURL = "http://localhost:3007/film";
axios.defaults.headers.post["Content-Type"] = "application/json";

function App() {
  const [films, setFilm] = useState([]);
  const initialState = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setFormData] = useState(initialState);
  const { name, description, imageUrl } = state;

  const { TextArea } = Input;
  const goFilmDetails = (item) => {};

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = useCallback(() => {
    setFormData({});
    setIsModalOpen(false);
  }, [setFormData]);

  const saveFilm = useCallback(() => {
    if (state._id) {
      updateFilm(state).then(() => {
        getFilms();
        handleCancel();
      });
    } else {
      postFilm({
        state,
      }).then(() => {
        getFilms();
        handleCancel();
      });
    }
  }, []);

  const deprecateFilm = (_id) => {
    deleteFilm(_id).then((res) => getFilms());
  };

  const getFilms = useCallback(() => {
    fetchFilms().then(({ data }) => {
      setFilm(data.data);
    });
  }, [films]);

  const editFilm = (item) => {
    setFormData(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
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
        <Modal
          title="New Film"
          open={isModalOpen}
          onOk={saveFilm}
          onCancel={handleCancel}
        >
          <Row style={{ marginBottom: 10 }}>
            <Col span={24}>
              <Input
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    name: event.target.value,
                  }))
                }
                placeholder="Name"
                value={name}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: 10 }}>
            <Col span={24}>
              <TextArea
                rows={4}
                value={description}
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    description: event.target.value,
                  }))
                }
                placeholder="Descripton"
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: 10 }}>
            <Col span={24}>
              <Input
                onChange={(event) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    imageUrl: event.target.value,
                  }))
                }
                placeholder="İmage URL"
                value={imageUrl}
              />
            </Col>
          </Row>
        </Modal>
      </Row>

      <div className="Swiper">
        <Row style={{ width: "100%" }}>
          <Col span={18} offset={3}>
            <SwiperSlider films={films} />
          </Col>
        </Row>
      </div>

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
            <Col span={6}>
              <Card>
                <EditOutlined
                  style={{ fontSize: 25, color: "blue", cursor: "pointer" }}
                  onClick={() => editFilm(item)}
                />
                <DeleteOutlined
                  style={{ fontSize: 25, color: "red", cursor: "pointer" }}
                  onClick={() => deprecateFilm(item._id)}
                />
              </Card>
              <Card
                onClick={() => goFilmDetails(item)}
                hoverable
                style={{
                  width: 300,
                  margin: 8,
                }}
                cover={<img alt="example" src={item.imageUrl} />}
              ></Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default App;
