import Chakra from "@/app/components/Chakra"
import Navbar from "@/app/components/Navbar"
import Providers from "@/app/components/Providers"
import Sidebar from "@/app/components/Sidebar"

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Projects',
};

const Projects = () => {
  return (
    <div>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <div>Projects Page</div>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Projects