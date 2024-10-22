"use client";

import React, { useState } from "react";
import { Box, Button, Callout, Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { Forward, OctagonAlert } from "lucide-react";
import { Link } from "@i18n/routing";
import { FieldForm } from "@components/UI/FieldForm";
import { FormProvider, useForm } from "react-hook-form";
import { UserRegister } from "@types";
import { registerUserServerAction } from "@server-actions/registerUserServerAction";
import { TextureBackground } from "@components/UI/TextureBackground";
import { DialogEmailAlreadyRegistered } from "@components/dialogs/DialogEmailAlreadyRegistered";
import { CardFullWidth } from "@components/UI/CardFullWidth";

const RegisterPage: React.FC = () => {
  const t = useTranslations("register");
  const form = useForm<UserRegister>();
  const [dialogEmailErrorIsOpen, setDialogEmailErrorIsOpen] = useState(false);
  const [invalidInviteCode, setInvalidInviteCode] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: UserRegister) => {
    const registerResp = await registerUserServerAction(data);

    if (registerResp?.error === "emailAlreadyExists") {
      setDialogEmailErrorIsOpen(true);
    }

    if (registerResp?.error === "invalidInviteCode") {
      setInvalidInviteCode(true);
    }

    return;
  };

  return (
    <Flex
      className="registerForm"
      p="4"
      height="100vh"
      direction="column"
      justify="center"
      align="center"
    >
      <TextureBackground />
      <DialogEmailAlreadyRegistered
        open={dialogEmailErrorIsOpen}
        onClose={() => setDialogEmailErrorIsOpen(false)}
      />

      <Box
        width={{
          initial: "100%",
          xs: "100%",
          sm: "50%",
          md: "40%",
        }}
      >
        <CardFullWidth>
          <Flex direction="column" gap="2" align="center" my="6">
            <Heading>{t("title")}</Heading>
            <Text>{t("subtitle")}</Text>
          </Flex>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" mb="4">
                <FieldForm
                  label={t("firstName")}
                  name="firstName"
                  placeholder={t("firstNamePlaceholder")}
                  required
                  errorMessage={errors.firstName?.message}
                  width="full"
                />

                <FieldForm
                  label={t("lastName")}
                  name="lastName"
                  placeholder={t("lastNamePlaceholder")}
                  type="text"
                  required
                  errorMessage={errors.lastName?.message}
                  width="full"
                />

                <FieldForm
                  label={t("email")}
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  type="email"
                  required
                  errorMessage={errors.email?.message}
                  width="full"
                />

                <FieldForm
                  label={t("password")}
                  name="password"
                  type="password"
                  required
                  errorMessage={errors.password?.message}
                  width="full"
                  validate={(value) => {
                    if (value.length < 6) {
                      return t("passwordValidation");
                    }
                    return true;
                  }}
                />

                <FieldForm
                  label={t("confirmPassword")}
                  name="confirmPassword"
                  type="password"
                  required
                  errorMessage={errors.confirmPassword?.message}
                  width="full"
                  validate={(value) => {
                    if (value !== form.getValues("password")) {
                      return t("confirmPasswordValidation");
                    }
                    return true;
                  }}
                />

                <FieldForm
                  label={t("inviteCode")}
                  name="inviteCode"
                  type="text"
                  required
                  errorMessage={errors.inviteCode?.message}
                  placeholder={t("inviteCodePlaceholder")}
                  width="full"
                  onChange={() => setInvalidInviteCode(false)}
                  validate={(value) => {
                    if (value.length !== 6) {
                      return t("invalidInviteCode");
                    }
                    return true;
                  }}
                />
              </Flex>

              {invalidInviteCode ? (
                <Callout.Root color="red" mb="3">
                  <Callout.Icon>
                    <OctagonAlert />
                  </Callout.Icon>
                  <Callout.Text>{t("invalidInviteCode")}</Callout.Text>
                </Callout.Root>
              ) : null}

              <Flex
                justify="center"
                align="center"
                direction="column"
                gap="4"
                mb="3"
              >
                <Button type="submit" size="3">
                  {t("register")}
                  <Forward size="1rem" />
                </Button>

                <Button variant="ghost" type="button" asChild>
                  <Link href="/auth/login">{t("login")}</Link>
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </CardFullWidth>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
