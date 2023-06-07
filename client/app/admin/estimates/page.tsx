import Chakra from "@/app/components/Chakra"
import Navbar from "@/app/components/Navbar"
import Providers from "@/app/components/Providers"
import Sidebar from "@/app/components/Sidebar"

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Estimates',
};

const Estimates = () => {
  return (
    <div>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <div>Estimates Page</div>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Estimates