//* Server side component *//
import Image from 'next/image'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Sidebar from './components/Sidebar';
import Page from './project-overview/page'

export default function Home() {
  return (
    <main>
      {/* <Sidebar children={undefined} /> */}
      <Page />
    </main>
  )
}
