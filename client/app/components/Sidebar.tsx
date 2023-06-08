"use client";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

import {
  IconHome,
  IconNotebook,
  IconFileAnalytics,
  IconFileSpreadsheet,
  IconBusinessplan,
  IconFileInvoice,
  IconFileDollar,
} from "@tabler/icons-react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Image from "next/image";
import { HamburgerIcon } from "@chakra-ui/icons";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Project Overview", icon: IconHome, path: "/admin/project-overview" },
  { name: "Contractors", icon: IconNotebook, path: "/admin/contractors" },
  { name: "Estimates", icon: IconFileAnalytics, path: "/admin/estimates" },
  { name: "Timesheets", icon: IconFileSpreadsheet, path: "/admin/timesheets" },
  { name: "Expenses", icon: IconFileDollar, path: "/admin/expenses" },
  { name: "Invoices", icon: IconFileInvoice, path: "/admin/invoices" },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContent = ({ onClose, isExpanded, setIsExpanded, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderTop="1px"
      borderTopColor={useColorModeValue("gray.200", "gray.700")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={isExpanded ? { base: "full", md: 60 } : { base: "full", md: 20 }}
      pos="fixed"
      h="full"
      {...rest}
      position="fixed" top="81px" left={0} zIndex={1000}
    >
      <Flex
        justify="flex-start"
        direction="column"
        position="fixed"
        top={5}
        left={40}
      >
        <IconButton
          aria-label="Toggle-sidebar"
          onClick={() => setIsExpanded(!isExpanded)}
          ml={isExpanded ? "2" : "2"}
        >
          <FiMenu />
        </IconButton>
      </Flex>

      <Flex h="3" alignItems="center" mx="5" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link
          href={link.path}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            p="3.5"
            mx="3"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "cyan.300",
              color: "white",
            }}
            // fontFamily=""
          >
            {!isExpanded ? (
              <Tooltip
                label={link.name}
                aria-label="A tooltip"
                placement="right-start"
                bg="transparent"
                color="black"
                openDelay={0}
              >
                <Icon
                  fontSize="23"
                  _groupHover={{
                    color: "white",
                  }}
                  as={link.icon}
                />
              </Tooltip>
            ) : (
              <Icon
                mr="4"
                fontSize="20"
                _groupHover={{
                  color: "white",
                }}
                as={link.icon}
              />
            )}
            {isExpanded && link.name}
          </Flex>
        </Link>
      ))}
    </Box>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box minH="0px" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: isExpanded ? 60 : 20, md: isExpanded ? 60 : 20 }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
