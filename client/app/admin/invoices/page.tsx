"use client"

import Chakra from "@/app/components/Chakra"
import Navbar from "@/app/components/Navbar"
import Providers from "@/app/components/Providers"
import Sidebar from "@/app/components/Sidebar"
import { Flex } from "@chakra-ui/react"

import { Metadata } from 'next';
 
// export const metadata: Metadata = {
//   title: 'Invoices',
// };

const Invoices = () => {
  return (
    <Flex>
        <Providers>
          <Chakra>
            <Navbar />
            <Flex style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <Flex mt={20}>
                Invoices Page
              </Flex>
            </Flex>
          </Chakra>
        </Providers>
    </Flex>
  )
}
export default Invoices