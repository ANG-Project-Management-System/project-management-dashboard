"use client"

import { Flex } from "@chakra-ui/react";
import Chakra from "../components/Chakra";
import Navbar from "../components/NavbarContractors";
import Providers from "../components/Providers";
import Sidebar from "../components/SidebarContractors";

export default function Contractors() {
  return (
    <Flex>
      <Providers>
        <Chakra>
          <Navbar />
          <Flex style={{ display: "flex" }}>
            <Sidebar children={undefined} />
            <Flex mt={20}>
                Contractors Main Page
            </Flex>
          </Flex>
        </Chakra>
      </Providers>
    </Flex>
  );
}
