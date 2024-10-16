import "@radix-ui/themes/styles.css";
import React from "react";
import {
  Users,
  Briefcase,
  FileText,
  ClipboardList,
  LogOut,
  MenuIcon,
} from "lucide-react";
import { Button, Container, DropdownMenu, Flex, Link } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>
      <Flex direction="column" width="100%" pr="3">
        <Flex justify="between" align="center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Link href="/dashboard/clients">
                <DropdownMenu.Item>
                  <Users className="mr-2 h-5 w-5" />
                  <span>Clientes</span>
                </DropdownMenu.Item>
              </Link>
              <Link href="/dashboard/services">
                <DropdownMenu.Item>
                  <Briefcase className="mr-2 h-5 w-5" />
                  <span>Serviços</span>
                </DropdownMenu.Item>
              </Link>
              <Link href="/dashboard/anamnesis">
                <DropdownMenu.Item>
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Fichas de Anamnese</span>
                </DropdownMenu.Item>
              </Link>
              <Link href="/dashboard/work-orders">
                <DropdownMenu.Item>
                  <ClipboardList className="mr-2 h-5 w-5" />
                  <span>Ordens de Serviço</span>
                </DropdownMenu.Item>
              </Link>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">
                <Avatar.Root className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
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
    </Container>
  );
};

export default DashboardLayout;
