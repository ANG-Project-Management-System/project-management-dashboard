"use client"

import Chakra from "@/app/components/Chakra";
import Navbar from "@/app/components/NavbarContractors";
import Providers from "@/app/components/Providers";
import Sidebar from "@/app/components/SidebarContractors";
import { Flex } from "@chakra-ui/react";

function ProjectOverview() {
  return (
    <Flex>
      <Providers>
        <Chakra>
          <Navbar />
          <Flex style={{ display: "flex" }}>
            <Sidebar children={undefined} />
            <Flex mt={20}>Project Overview Page</Flex>
          </Flex>
        </Chakra>
      </Providers>
    </Flex>
  );
}
export default ProjectOverview;
