"use client"

import { Flex } from "@chakra-ui/react"
import Chakra from "../components/Chakra"
import Navbar from "../components/Navbar"
import Providers from "../components/Providers"
import Sidebar from "../components/Sidebar"


const Admin = () => {
  return (
    <Flex>
        <Providers>
          <Chakra>
            <Navbar />
            <Flex style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <Flex mt={20}>
                Admin Home Page
              </Flex>
            </Flex>
          </Chakra>
        </Providers>
    </Flex>
  )
}
export default Admin