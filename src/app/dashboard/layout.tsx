import "@radix-ui/themes/styles.css";
import React from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  FileText,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { Button, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Flex>
        <Flex direction="column" width="20rem">
          <div>
            <h1>Menu</h1>
          </div>
          <Flex direction="column" gap="2" p="4" mr="3">
            <Link
              href="/dashboard/clients"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Button variant="ghost">
                <Users className="mr-2 h-5 w-5" />
                <span>Clientes</span>
              </Button>
            </Link>

            <Link
              href="/dashboard/services"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Button variant="ghost">
                <Briefcase className="mr-2 h-5 w-5" />
                <span>Serviços</span>
              </Button>
            </Link>

            <Link
              href="/dashboard/anamnesis"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Button variant="ghost">
                <FileText className="mr-2 h-5 w-5" />
                <span>Fichas de Anamnese</span>
              </Button>
            </Link>

            <Link
              href="/dashboard/work-orders"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Button variant="ghost">
                <ClipboardList className="mr-2 h-5 w-5" />
                <span>Ordens de Serviço</span>
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Flex direction="column" width="100%" pr="3">
          <Flex justify="between" align="center">
            <h2>Dashboard</h2>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft">
                  <Avatar.Root className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="User avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar.Root>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label className="font-normal">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Perfil</DropdownMenu.Item>
                <DropdownMenu.Item>Configurações</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>

          {children}
        </Flex>
      </Flex>
    </Container>
  );
};

export default DashboardLayout;
