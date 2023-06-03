//* Server side component *// 
import './globals.css'
import { Inter } from 'next/font/google'
import Chakra from './components/Chakra'
import Sidebar from './components/Sidebar'
import ProjectOverview from './project-overview/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ANG PM App',
  description: 'Project Management App created using Chakra UI, Typescript and NextJS for ANG consultants.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Chakra>
          <nav>
            <Sidebar children={undefined} />
          </nav>
          {children}
        </Chakra>
      </body>
    </html>
  )
}
