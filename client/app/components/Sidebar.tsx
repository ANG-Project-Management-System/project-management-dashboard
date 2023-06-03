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
    path: "https://www.youtube.com/",
  },
  {
    name: "Contractors",
    icon: IconNotebook,
    path: "https://chakra-ui.com/getting-started/nextjs-guide",
  },
  {
    name: "Estimates",
    icon: IconFileAnalytics,
    path: "https://nextjs.org/docs/pages/api-reference/create-next-app",
  },
  {
    name: "Timesheets",
    icon: IconFileSpreadsheet,
    path: "https://chakra-ui.com/getting-started/nextjs-guide",
  },
  {
    name: "Expenses",
    icon: IconFileDollar,
    path: "https://chakra-ui.com/getting-started/nextjs-guide",
  },
  {
    name: "Invoices",
    icon: IconFileInvoice,
    path: "https://chakra-ui.com/getting-started/nextjs-guide",
  },
];

const Header = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
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
      <Flex h="24" alignItems="center" mx="8" justifyContent="space-between">
        {isExpanded && (
          <Image
            alt="ANG Consultants"
            width={140}
            height={90}
            className="flex w-30 ml-4 mb-1"
            src="https://cdn.discordapp.com/attachments/337766477094715405/1114416979286179932/ANG_logo.png"
          />
        )}
        
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
                  mr="4"
                  fontSize="25"
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

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
export default Header;
