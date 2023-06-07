import Chakra from "@/app/components/Chakra"
import Navbar from "@/app/components/Navbar"
import Providers from "@/app/components/Providers"
import Sidebar from "@/app/components/Sidebar"

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Timesheets',
};

const Timesheets = () => {
  return (
    <div>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <div>Timesheets Page</div>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Timesheets