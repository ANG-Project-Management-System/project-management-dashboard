"use client"

import Chakra from "@/app/components/Chakra"
import Providers from "@/app/components/Providers"
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
            <div style={{ display: "flex" }}>
              <Flex mt={20}>Timesheets Page</Flex>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Timesheets