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

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Project Overview",
    icon: IconHome,
    path: "/project-overview",
  },
  {
    name: "Contractors",
    icon: IconNotebook,
    path: "/contractors",
  },
  {
    name: "Estimates",
    icon: IconFileAnalytics,
    path: "/estimates",
  },
  {
    name: "Timesheets",
    icon: IconFileSpreadsheet,
    path: "timesheets",
  },
  {
    name: "Expenses",
    icon: IconFileDollar,
    path: "expenses",
  },
  {
    name: "Invoices",
    icon: IconFileInvoice,
    path: "invoices",
  },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="0px" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {/* <MobileNav onOpen={onOpen} /> */}
      <Box ml={{ base: 60, md: 60 }}>
          {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={isExpanded ? { base: "full", md: 60 } : { base: "full", md: 20 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="24" alignItems="center" mx="5" justifyContent="space-between">
        {/* {isExpanded && (
          // <Image
          //   alt="ANG Consultants"
          //   width={140}
          //   height={90}
          //   className="flex w-30 ml-4 mb-1"
          //   src="https://cdn.discordapp.com/attachments/337766477094715405/1114416979286179932/ANG_logo.png"
          // />
        )}
         */}
        <Button 
          bg="white" 
          onClick={() => setIsExpanded(!isExpanded)}
          ml={isExpanded ? "2" : "-3"}
        >
          {isExpanded ? "<<" : ">>"}
        </Button>
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
            fontFamily="Inter"
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

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      href={href}
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
        fontFamily="Inter"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default Sidebar;
