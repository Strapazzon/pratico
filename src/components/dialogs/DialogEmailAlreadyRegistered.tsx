import { Link } from "@i18n/routing";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { LucideMailWarning, X } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type DialogEmailAlreadyRegisteredProps = {
  open: boolean;
  onClose: () => void;
};

export const DialogEmailAlreadyRegistered: React.FC<
  DialogEmailAlreadyRegisteredProps
> = ({ open, onClose }) => {
  const t = useTranslations("dialogEmailAlreadyRegistered");
  return (
    <Dialog.Root open={open}>
      <Dialog.Content
        width={{
          initial: "90%",
          xs: "90%",
          sm: "45%",
        }}
      >
        <Dialog.Title>
          <Flex align="center" gap="2" justify="between">
            <Flex gap="2" align="center">
              <LucideMailWarning />
              {t("title")}
            </Flex>
            <Button variant="ghost" onClick={onClose}>
              <X />
            </Button>
          </Flex>
        </Dialog.Title>
        <Dialog.Description>{t("description")}</Dialog.Description>
        <Flex gap="3" justify="end" mt="6" align="center">
          <Link href={`/auth/recovery-password?email=${"email"}`}>
            <Button variant="solid" onClick={onClose}>
              {t("recoverPassword")}
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="soft" onClick={onClose}>
              {t("login")}
            </Button>
          </Link>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
