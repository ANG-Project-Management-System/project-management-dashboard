//* Server side component *//
import Image from 'next/image'
import Page from './project-overview/page'
import Contractors from './contractors/page'
import Sidebar from './components/Sidebar'

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Project Managment App',
  description: 'ANG Consultants PM App'
};

export default function Home() {
  return (
    <main>
      <p>Main page</p>
    </main>
  )
}
