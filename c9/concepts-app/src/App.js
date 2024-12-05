import './App.css'
import React, { useState } from 'react'
import StateExample from './concepts/state/StateExample'
import PropsParent from './concepts/props/PropsParent'
import LiftingParent from './concepts/lifting/LiftingParent'
import UpdateParent from './concepts/update/UpdateParent'
import EffectsExample from './concepts/effects/EffectsExample'
import CustomHooks from './concepts/custom/CustomHooks'
import ContextParent from './concepts/contexts/ContextParent'
import ReducersExample from './concepts/reducers/ReducersExample'

function App () {
  const [example, setExample] = useState('state')

  const getComponent = (example) => {
    switch (example) {
      case 'state':
        return <StateExample />
      case 'props':
        return <PropsParent />
      case 'lifting':
        return <LiftingParent />
      case 'update':
        return <UpdateParent />
      case 'effects':
        return <EffectsExample />
      case 'custom':
        return <CustomHooks />
      case 'context':
        return <ContextParent />
      case 'reducers':
        return <ReducersExample />
    }
  }

  return (
    <div className='app'>
      <header className='app-header'>
        React concepts
      </header>
      <aside className='app-aside'>
        <article onClick={() => setExample('state')}>
          State
        </article>
        <article onClick={() => setExample('props')}>
          Props
        </article>
        <article onClick={() => setExample('lifting')}>
          Lifting
        </article>
        <article onClick={() => setExample('update')}>
          Update parent
        </article>
        <article onClick={() => setExample('effects')}>
          Effects
        </article>
        <article onClick={() => setExample('custom')}>
          Custom hooks/useRef
        </article>
        <article onClick={() => setExample('context')}>
          Contexts
        </article>
        <article onClick={() => setExample('reducers')}>
          Reducers
        </article>
      </aside>
      <main className='app-main'>
        {
          getComponent(example)
        }
      </main>
    </div>
  )
}

export default App
