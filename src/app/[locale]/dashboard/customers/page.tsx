import { Button, Flex } from "@radix-ui/themes";
import { Plus } from "lucide-react";
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
      <Flex justify="end">
        <Button variant="solid">
          <Plus size="24" />
          {t("addCustomer")}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CustomersPage;
