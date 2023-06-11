"use client"

import Chakra from "@/app/components/Chakra"
import Providers from "@/app/components/Providers"
import { Flex } from "@chakra-ui/react"

// import { Metadata } from 'next';
 
// export const metadata: Metadata = {
//   title: 'Projects',
// };

const Projects = () => {
  return (
    <Flex>
        <Providers>
          <Chakra>
            <Flex style={{ display: "flex" }}>
              <Flex mt={20}>
                Project Selection Page
              </Flex>
            </Flex>
          </Chakra>
        </Providers>
    </Flex>
  )
}
export default Projects