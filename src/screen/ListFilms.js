import React from "react";
import { Col, Row, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFilmContext } from "../context/film";

const ListFilms = ({ item, editFilm, deprecateFilm, goPage }) => {
  const FilmContext = useFilmContext();

  const editItem = (item) => {
    FilmContext.setEditItem(item);
    editFilm();
  };

  return (
    <Col xs={24} sm={18} md={12} lg={6}>
      <Card>
        <Row justify={"space-between"} align={"center"}>
          <Col xs={6}>
            <EditOutlined
              style={{ fontSize: 25, color: "blue", cursor: "pointer" }}
              onClick={() => editItem(item)}
            />
            <DeleteOutlined
              style={{ fontSize: 25, color: "red", cursor: "pointer" }}
              onClick={() => deprecateFilm(item._id)}
            />
          </Col>

          <Col xs={18}>{item.name}</Col>
        </Row>
      </Card>
      <Card
        onClick={() => goPage(item)}
        hoverable
        style={{
          width: 320,
          margin: 8,
        }}
        cover={<img alt="example" src={item.imageUrl} />}
      ></Card>
    </Col>
  );
};

export default ListFilms;
