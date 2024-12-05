import React, { useEffect, useState, useRef } from 'react'

function EffectsExample() {
  const [red, setRed] = useState(0)
  const [green, setGreen] = useState(0)
  const [blue, setBlue] = useState(0)

  const [color, setColor] = useState('rgb(255,255,255)')

  const colorElement = useRef(null);


  useEffect(() => {
    setColor('rgb(0,0,0)')
  }, [])

  useEffect(() => {
    setColor(`rgb(${red}, ${green}, ${blue})`)
  }, [red, green, blue])

  useEffect(() => {
    colorElement.current.style.backgroundColor = color
  }, [color])

  const handleRed = (evt) => {
    setRed((red + 10) % 255)
  }

  const handleGreen = (evt) => {
    setGreen((green + 10) % 255)
  }

  const handleBlue = (evt) => {
    setBlue((blue + 10) % 255)
  }

  return (
    <>
      <div>
        the current color value is R:{red} G:{green} B:{blue}
      </div>
      <div>
        the current value of the color is 
        <div id='color' style={{ height: '10em', width: '10em', color: color }} ref={colorElement}>color</div>
      </div>
      <div>
        <input type='button' value='+red' onClick={handleRed} id='red' />
        <input type='button' value='+green' onClick={handleGreen} id='green' />
        <input type='button' value='+blue' onClick={handleBlue} id='blue' />
      </div>        
    </>
  )
}

export default EffectsExample
