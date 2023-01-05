import React from "react";
import { Col, Row, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFilmContext } from "../context/film";
const ListFilms = ({ films, editFilm, deprecateFilm }) => {
  const FilmContext = useFilmContext();

  const editItem = (item) => {
    FilmContext.setEditItem(item);
    editFilm();
  };
  return (
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
            <Col span={6}>
              <Card>
                <EditOutlined
                  style={{ fontSize: 25, color: "blue", cursor: "pointer" }}
                  onClick={() => editItem(item)}
                />
                <DeleteOutlined
                  style={{ fontSize: 25, color: "red", cursor: "pointer" }}
                  onClick={() => deprecateFilm(item._id)}
                />
              </Card>
              <Card
                onClick={() => console.log(456)}
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
};

export default ListFilms;
