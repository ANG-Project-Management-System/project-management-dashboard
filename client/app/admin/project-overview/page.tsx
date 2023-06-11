"use client"

import Chakra from "@/app/components/Chakra"
import Providers from "@/app/components/Providers"
import { Flex } from "@chakra-ui/react"

// import { Metadata } from 'next';
 
// export const metadata: Metadata = {
//   title: 'Project Overview',
// };

const projectOverview = () => {
  return (
    <Flex>
        <Providers>
          <Chakra>
            <Flex style={{ display: "flex" }}>
              <Flex mt={20}>
                Project Overview Page
              </Flex>
            </Flex>
          </Chakra>
        </Providers>
    </Flex>
  )
}
export default projectOverview