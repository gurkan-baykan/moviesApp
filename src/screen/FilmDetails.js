import React from 'react';
import { Col, Row, Card, Button, Image, Divider } from 'antd';
import { useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const FilmDetails = () => {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();

  const goBack = () => {
    console.log(423423);
    return navigate('/', { replace: true });
  };

  return (
    <div
      style={{ display: 'flex', flex: 1, margin: 25, flexDirection: 'column' }}
    >
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => goBack()}
          >
            Geri
          </Button>
        </Col>
        <Col span={18}>
          <span style={{ fontWeight: 'bold', fontSize: 25 }}>{item.name}</span>
        </Col>
      </Row>
      <Divider></Divider>
      <Row wrap={true}>
        <Col span={6}>
          <Image width={300} src={item.imageUrl} />
        </Col>
        <Col span={18}>
          <p>{item.description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default FilmDetails;
