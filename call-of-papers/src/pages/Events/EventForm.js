import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Checkbox, Radio, Button } from 'antd';
import { useFormik } from 'formik';

const formItemLayout = null;

const { TextArea } = Input;

const initialValues = {
    event: '',
    description: '',
    local: '',
    schedule: '',
    organizer: '',
    limited_spaces: '',
    partners: []
}

const EventForm = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const [values, setValuesChecked] = useState([]);
    const [radio, setValuesRadio] = useState([]);
    const [partner, setValuesPartner] = useState([]);

    const environment = 'http://localhost:3001';

    const formik = useFormik({
        initialValues
    })

    function onChangeCategories(categories) {
        setValuesChecked(categories)
    }
    function onChangeSpaces(spaces) {
        setValuesRadio(spaces.target.value);
    }
    function onChangePartners(partners) {
        setValuesPartner(partners);
    }

    const { event, description, local, schedule, organizer } = formik.values;

    const bodyApi = {
        event,
        description,
        schedule,
        local,
        organizer,
        categories: values,
        limited_spaces: radio,
        partners: partner
    }

    function onsubmit(bodyApi) {
        fetch(`${environment}/events`, {
            method: 'post',
            body: JSON.stringify(bodyApi)
        })
            .then(res => res.json())
            .then(function(data){ alert( JSON.stringify( data ) ) })
    }

    return (
        <Row>
            <Col span={16} offset={4}>
                <h1>Crie um evento</h1>
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    onSubmit={onsubmit}>
                    <Form.Item
                        label="Evento"
                        name="event"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de evento!' }]}>
                        <Input {...formik.getFieldProps("event")} />
                    </Form.Item>
                    <Form.Item
                        label="Descrição"
                        name="description"
                        rules={[{ required: false }]}>
                        <TextArea {...formik.getFieldProps("description")} />
                    </Form.Item>
                    <Form.Item
                        label="Data/Horário"
                        name="schedule"
                        rules={[{ required: false }]}>
                        <Input {...formik.getFieldProps("schedule")} />
                    </Form.Item>
                    <Form.Item
                        label="Local"
                        name="local"
                        rules={[{ required: false }]}>
                        <Input {...formik.getFieldProps("local")} />
                    </Form.Item>
                    <Form.Item
                        label="Organizador"
                        name="organizer"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de organizador!' }]}>
                        <Input {...formik.getFieldProps("organizer")} />
                    </Form.Item>

                    <Form.Item
                        label="Categoria do evento"
                        name="categories"
                        rules={[{ required: true, message: 'Preencha corretamente o campo de categoria!' }]}>
                        <Checkbox.Group
                            style={{ width: '50%' }}
                            onChange={onChangeCategories}>
                            <Row>
                                <Col span={6}>
                                    <Checkbox
                                        value="workshop">Workshop</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="bootcamp">Bootscamp</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="frontend">Front-end</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="backend">Back-end</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                        label="Vagas limitadas"
                        name="limited_spaces"
                        rules={[{ required: false }]}>
                        <Radio.Group name="limited_spaces" defaultValue={1} onChange={onChangeSpaces}>
                            <Radio value={"Sim"}>Sim</Radio>
                            <Radio value={"Não"}>Não</Radio>
                        </Radio.Group>

                    </Form.Item>

                    <Form.Item
                        label="Quais parceiros aceita ?"
                        name="partners"
                        rules={[{ required: false }]}>
                        <Checkbox.Group
                            style={{ width: '50%' }}
                            onChange={onChangePartners}>
                            <Row>
                                <Col span={6}>
                                    <Checkbox value="sponsors">Sponsors</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="universidade">Universidades</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="Comunidades">Comunidades</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="startups">Startups</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="palestrantes">Palestrantes</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="impresa">Impresa</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Cadastrar evento</Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    );
};

export default EventForm;
