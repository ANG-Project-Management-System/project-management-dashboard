"use client";

// Google OAuth imports
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// React imports
import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import Image from "next/image";

const Links = ["Home", "Projects", "RFQ Form"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={
          children === "Home"
        ? "/admin"
        : children === "Projects"
        ? "/admin/all-projects"
        // : children === "Team"
        // ? "/team"
        : children === "RFQ Form"
        ? "/admin/request-for-quotation"
        : "/admin"
    }
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(true);
  const { data: session } = useSession();
  const defaultName = "User";
  const defaultImageURL = "";

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box bg={"white"} px={4} border="1px" borderColor="gray.200"
        position="fixed" top={0} w="100%" zIndex={1000}
      >
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={4} alignItems={"center"}>
            <Box>
              <div>
                <Link href="/admin">
                    <Image
                      alt="ANG Consultants"
                      width={110}
                      height={80}
                      className="flex ml-4"
                      src="/ANG_logo.png"
                      priority={true}
                    />
                </Link>
              </div>
            </Box>

            <Box ml={20}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "flex", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </Box>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      session?.user?.image
                        ? session.user.image
                        : defaultImageURL
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {session?.user?.name ? session.user.name : defaultName}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>

                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} href="https://myaccount.google.com/">
                  Profile
                </MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    signOut({ callbackUrl: `${window.location.origin}/login` })
                  }
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
