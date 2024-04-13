import React from 'react'
import { Button } from 'antd'
import { HiOutlinePause, HiOutlinePlay } from 'react-icons/hi'
import { signal } from '@preact/signals-react'

export const isPause = signal(false)

const PauseButton = () => {
  return (
    <div className="pause-btn">
        <Button onClick={ () => isPause.value = !isPause.value }>{isPause.value ? <HiOutlinePause/> : <HiOutlinePlay/>}</Button>
    </div>
  )
}

export default PauseButton