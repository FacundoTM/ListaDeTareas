import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Space,
  Card,
  Col,
  Row,
} from "antd";
import { Alert } from "antd";
import { Formik, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import ToDoInput from "./components/ToDoInput";
import * as Yup from "yup";
import "./style.css";

const { Header, Content, Footer } = Layout;
const items = [{ key: 1, label: "Inicio" }];
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [text, setText] = useState(() => {
    const saveText = window.localStorage.getItem("textos");
    if (saveText) {
      return JSON.parse(saveText);
    } else {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("textos", JSON.stringify(text));
  }, [text]);

  console.log(text);
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item>Lista de tareas</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 880,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Formik
            enableReinitialize
            initialValues={{ title: "", text: "", id: crypto.randomUUID() }}
            onSubmit={(values, { resetForm }) => {
              setText([...text, values]), resetForm();
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .required("Debes insertar un titulo")
                .typeError("Inserta un titulo"),
              text: Yup.string()
                .required("Debes insertar un texto")
                .typeError("Inserta un texto."),
            })}
          >
            <Form>
              <Space>
                <Space.Compact>
                  <ToDoInput
                    name="title"
                    type="text"
                    placeholder="Ingrese el titulo"
                  />

                  <ToDoInput
                    name="text"
                    type="text"
                    placeholder="Ingrese la tarea"
                  />

                  <Button type="primary" htmlType="submit">
                    Enviar tarea
                  </Button>
                </Space.Compact>
              </Space>
              <br />
              <br />

              <ErrorMessage
                name="title"
                render={() => (
                  <div>
                    <Alert
                      message="Debes insertar un titulo"
                      type="error"
                      showIcon
                    />
                  </div>
                )}
              />
              <br />
              <ErrorMessage
                name="text"
                render={() => (
                  <div>
                    <Alert
                      message="Debes insertar una descripción"
                      type="error"
                      showIcon
                    />
                  </div>
                )}
              />
            </Form>
          </Formik>
          <br />

          <Row gutter={16}>
            {text.length == 0
              ? "No hay tareas"
              : text.map((x) => {
                  return (
                    <div>
                      <Col span={8}>
                        <Card
                          title={x.title}
                          key={x.id}
                          bordered={false}
                          style={{
                            width: 300,
                          }}
                        >
                          <p>{x.text}</p>

                          <Button
                            type="primary"
                            onClick={() =>
                              setText([...text.filter((y) => y.id != x.id)])
                            }
                          >
                            Eliminar nota
                          </Button>
                        </Card>
                      </Col>
                      <br />
                    </div>
                  );
                })}
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        @FacundoTM | ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
export default App;
