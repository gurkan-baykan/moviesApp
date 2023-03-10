import React, { useEffect, useState } from "react";
import { Col, Row, Modal, Input, Spin } from "antd";
import { useFilmContext } from "../context/film";

const FilmsDialog = ({ handleCancel, saveFilm, loading }) => {
  const initialState = {
    name: "",
    description: "",
    imageUrl: "",
  };

  const FilmContext = useFilmContext();
  const { editFilm } = FilmContext.state;
  const [state, setFormData] = useState(initialState);
  const { name, description, imageUrl } = state;

  /*
  const formData = useMemo(() => {
    return {
      name,
      description,
      imageUrl,
    };
  }, [name, description, imageUrl]);
  */

  const { TextArea } = Input;

  useEffect(() => {
    if (editFilm) {
      setFormData(editFilm);
    }

    return () => {
      console.log(43645);
      FilmContext.clearItem();
    };
  }, [setFormData]);

  return (
    <Modal
      title="New Film"
      open={true}
      onOk={() => saveFilm(state)}
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
      {loading === true ? (
        <div
          style={{
            zIndex: -5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Spin size={"large"} />
        </div>
      ) : (
        <></>
      )}

      <Row style={{ marginBottom: 10 }}>
        <Col span={24}>
          <Input
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                imageUrl: event.target.value,
              }))
            }
            placeholder="??mage URL"
            value={imageUrl}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default FilmsDialog;
