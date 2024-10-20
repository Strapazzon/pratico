import { Link } from "@i18n/routing";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { Plus, UserSquare2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const CustomersPage: React.FC = () => {
  const t = useTranslations("customers");
  return (
    <Flex
      direction="column"
      height="100%"
      p={{
        initial: "2",
        xs: "4",
        lg: "0",
      }}
    >
      <Flex gap="2" align="center">
        <UserSquare2 size="24" />
        <Heading size="6">{t("title")}</Heading>
      </Flex>
      <Flex justify="end">
        <Link href="/dashboard/customers/new/edit">
          <Button variant="solid">
            <Plus size="24" />
            {t("addCustomer")}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CustomersPage;
