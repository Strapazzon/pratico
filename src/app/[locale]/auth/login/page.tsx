"use client";

import { FieldForm } from "@components/UI/FieldForm";
import { TextureBackground } from "@components/UI/TextureBackground";
import { Link } from "@i18n/routing";
import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { loginServerAction } from "@server-actions/loginServerAction";
import { LoginServerActionResponse } from "@types";
import { LogIn, OctagonAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type UserLogin = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const t = useTranslations("login");
  const form = useForm<UserLogin>();
  const [loginResp, setLoginResp] = React.useState<LoginServerActionResponse>();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: UserLogin) => {
    const loginResp = await loginServerAction(data.email, data.password);
    setLoginResp(loginResp);
  };

  return (
    <Flex
      className="registerForm"
      p="4"
      height="100%"
      direction="column"
      justify="center"
      align="center"
    >
      <TextureBackground />

      <Flex direction="column" gap="2" align="center" mb="6">
        <Heading>{t("title")}</Heading>
        <Text>{t("subtitle")}</Text>
      </Flex>
      <Box
        width={{
          initial: "100%",
          xs: "100%",
          sm: "50%",
          md: "40%",
        }}
      >
        <Card className="card">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="2" mb="4">
                <FieldForm
                  label={t("email")}
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  type="email"
                  required
                />

                <FieldForm
                  label={t("password")}
                  name="password"
                  type="password"
                  required
                  errorMessage={errors.password?.message}
                />
              </Flex>

              {loginResp?.error ? (
                <Callout.Root color="red" mb="3">
                  <Callout.Icon>
                    <OctagonAlert />
                  </Callout.Icon>
                  <Callout.Text>
                    {t("invalidCredentials")}{" "}
                    <Link href="/auth/forgot-password">
                      <Text as="span" color="blue" weight="bold">
                        {t("forgotPassword")}
                      </Text>
                    </Link>
                  </Callout.Text>
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
                  {t("login")}
                  <LogIn size="1rem" />
                </Button>

                <Link href="/auth/register">
                  <Button variant="ghost" type="button">
                    {t("register")}
                  </Button>
                </Link>
              </Flex>
            </form>
          </FormProvider>
        </Card>
      </Box>
    </Flex>
  );
};

export default LoginPage;
