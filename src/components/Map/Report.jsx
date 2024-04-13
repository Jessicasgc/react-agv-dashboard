import React, { useState } from 'react'
import { Button, Input, Space } from 'antd';
import Dpad from './Dpad';
import InputObstacle from './InputObstacle';
import { HiExclamationCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { signal } from '@preact/signals-react';
const { Search } = Input;

export const wsURLServer = signal('localhost:8080')

const Report = () => {
  const [wsURL, setWSURL] = useState('')
  const {readyState} = useWebSocket(`ws://${wsURLServer}`, {
    onOpen: () => console.log(`Success Connection ${wsURLServer}`),
    share: true,
    shouldReconnect: () => true,
    onClose: () => console.log(`Disconnected ${wsURLServer}`)
  })

  const handleSetUrl = () => {
    wsURLServer.value = wsURL
  }

  return (
    <div className='report'>
      <div className='search-container'>
        <Search
          placeholder="input search text"
          //onSearch={onSearch}
          style={{width: "100%"}}
        />
      </div>
      <div style={{marginTop: "0.5rem"}}>Reported Operations</div>
      <div className='card'>
        <div className='card-header'>
          <h3>Reported Operations</h3>
        </div>
        <div className='card-body'>
          {/* Content for Reported Operations */}
          <Dpad/>
        </div>
      </div>
      <div className='card'>
        <div className='card-header'>
          <h3>Input New Obstacle</h3>
        </div>
        <div className='card-body'>
          <InputObstacle/>
        </div>
      </div>
      <div className='card'>
        <div className='card-header'>
          {
            readyState === ReadyState.OPEN ? <HiOutlineCheckCircle color='green'/> : <HiExclamationCircle color='red'/>
          }
          <h3>Connect Robot</h3>
        </div>
        <div className='card-body'>
          <Space.Compact>
            <Input placeholder="Robot Websocket URL" onChange={(e) => setWSURL(e.target.value)}/>
            <Button type="primary" onClick={handleSetUrl}>Connect</Button>
          </Space.Compact>
        </div>
      </div>
    </div>
  )
}

export default Report