import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Row, Col, Card, Divider, Tag, Button } from 'antd'
import { Link } from 'react-router-dom'

import { getEnvironment } from './../../utils/environment'

import "./event.scss";

const Event = () => {
  const [api, setApi] = useState([])

  let { eventId } = useParams()

  const { event, schedule, description, organizer, local, partners, categories, tickets, limited_spaces } = api

  const environment = getEnvironment();

  useEffect(() => {
    fetch(`${environment}/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setApi(data)
      })
      .catch(err => console.error(err, 'Nenhum evento por aqui!'))
  }, [])

  return (
    <>
      <Row gutter={[16, 24]}>
        <Divider orientation='left'>
          {event}
        </Divider>
      </Row>
      {/* Descrição  */}
      <Row className="content-detalhe">
        <Col span={16} offset={4}>
          <Row>
            <Col span={16} className="pr-50">
              <div className="title">
                {/* {
                  schedule ?
                    <span>{schedule}</span> : 'Nenhuma data ou horário informado'
                }
                <h1>{event}</h1> */}
                {/* <small>Código do evento: {eventId}</small> */}
              </div>
              <div className="mt-15">
                <h2 style={{ fontWeight: 300 }}>Descrição</h2>
                <p>{description}</p>
              </div>
              <div className="mt-10">
                    <div>
                      <h2 style={{ fontWeight: 300 }}>Categorias</h2>
                      {categories && categories.length == 0? <p>Sem informações</p> : <div>
                        <p>
                      {categories && categories.map((category) => {
                        if (category == 'workshop')
                        return(<Tag style={{ marginBottom: '8px' }}>Workshop</Tag>)
                        if (category == 'backend')
                        return(<Tag style={{ marginBottom: '8px' }}>Backend</Tag>)
                        if (category == 'frontend')
                        return(<Tag style={{ marginBottom: '8px' }}>Frontend</Tag>)
                        if (category == 'bootcamp')
                        return(<Tag style={{ marginBottom: '8px' }}>Bootcamp</Tag>)
                      })}
                      </p>
                      </div>
                    }
              </div>        
              </div>
              <div className="mt-10">
                    <div>
                      <h2 style={{ fontWeight: 300 }}>Parceiros aceitos</h2>
                      {partners && partners.length == 0 || (partners && partners.includes("Nao"))? <p>Não aceita parceiros</p> : <div>
                        <p>
                      {partners && partners.map((partner) => {
                        if (partner == 'sponsors')
                        return(<Tag style={{ marginBottom: '8px' }}>Sponsors</Tag>)
                        if (partner == 'universidade')
                        return(<Tag style={{ marginBottom: '8px' }}>Universidades</Tag>)
                        if (partner == 'comunidades')
                        return(<Tag style={{ marginBottom: '8px' }}>Comunidades</Tag>)
                        if (partner == 'startups')
                        return(<Tag style={{ marginBottom: '8px' }}>Startups</Tag>)
                        if (partner == 'palestrantes')
                        return(<Tag style={{ marginBottom: '8px' }}>Palestrantes</Tag>)
                        if (partner == 'impresa')
                        return(<Tag style={{ marginBottom: '8px' }}>Imprensa</Tag>)
                      })}
                      </p>
                      <p style={{fontSize: "0.9em"}}>Entre em contato com a organização do evento!</p>
                      <Link to={`/partners/${eventId}`} >
                        <Button type="secundary">Seja um parceiro</Button>
                      </Link>
                      </div>
                    }
              </div>        
              </div>
            </Col>
            <Col span={8}>
              {
                organizer ?
                  <Card className="mt-15">
                    <i style={{ textSize: 10 }}>
                      <div>
                        <b>Organizador(a):</b>
                        <span> {organizer}</span>
                      </div>
                    </i>
                  </Card> : ''
              }
              <Card className="mt-15">
                <p>
                  <small>Data/Horário</small>
                  <br />
                  {
                    schedule ?
                      <b>{schedule}</b> : 'Nenhuma data ou horário informado'
                  }
                </p>
                <p>
                  <small>Local</small>
                  <br />
                  {
                    local ?
                      <Link to="">{local}</Link> : 'Nenhum local informado'
                  }
                </p>
                <p>
                  <small>Espaço limitado?</small>
                  <br />
                  {
                    limited_spaces == true ? <strong>Sim</strong> : <strong>Não</strong>
                      
                  }
                </p>
              </Card>
              {
                tickets ?
                  <Card className="mt-15">
                    <small>Ingressos</small>
                    <br />
                    <b>Grátis</b>
                  </Card> : ''
              }
              <Card className="mt-15">
                <p><b>Seja um palestrante</b></p>
                <p>Para participar, inscreva-se através do formulário clicando no link abaixo. Defina o tipo de atividade (palestra, painel ou workshop) e a temática.</p>
                <div style={{textAlign: "center"}}>
                  <Link to={`/lectures/form/${eventId}`} >
                    <Button type="primary">Cadastre uma atividade</Button>
                  </Link></div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

    </>
  )
}

export default Event