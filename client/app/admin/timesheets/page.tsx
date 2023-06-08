"use client"

import Chakra from "@/app/components/Chakra"
import Navbar from "@/app/components/Navbar"
import Providers from "@/app/components/Providers"
import Sidebar from "@/app/components/Sidebar"
import { Flex } from "@chakra-ui/react"

// import { Metadata } from 'next';
 
// export const metadata: Metadata = {
//   title: 'Timesheets',
// };

const Timesheets = () => {
  return (
    <div>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <Flex mt={20}>Timesheets Page</Flex>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Timesheets