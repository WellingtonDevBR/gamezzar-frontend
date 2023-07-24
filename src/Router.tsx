import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layout/DefaultLayout'
import { Home } from './pages/Home'
import { Explorer } from './pages/Explorer/Explorer'

import { Community } from './pages/Community/Community'
import { Contact } from './pages/Contact/Contact'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Explorer" element={<Explorer />} />
        <Route path= "/Community" element = {<Community />}/>
        <Route path= "/Contact" element = {<Contact />} />
      </Route>
    </Routes>
  )
}