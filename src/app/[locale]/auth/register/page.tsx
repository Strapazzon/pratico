"use client";

import React from "react";
import "./register-style.scss";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { Forward } from "lucide-react";
import { Link } from "@i18n/routing";
import { FieldForm } from "@components/UI/FieldForm";
import { FormProvider, useForm } from "react-hook-form";
import { UserRegister } from "@types";
import { registerUserServerAction } from "@server-actions/registerUserServerAction";

const RegisterPage: React.FC = () => {
  const t = useTranslations("register");
  const form = useForm<UserRegister>();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: UserRegister) => {
    registerUserServerAction(data);
    return;
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
          lg: "30%",
        }}
      >
        <Card className="card">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="2" mb="4">
                <FieldForm
                  label={t("firstName")}
                  name="firstName"
                  placeholder={t("firstNamePlaceholder")}
                  required
                  errorMessage={errors.firstName?.message}
                />

                <FieldForm
                  label={t("lastName")}
                  name="lastName"
                  placeholder={t("lastNamePlaceholder")}
                  type="text"
                  required
                  errorMessage={errors.lastName?.message}
                />

                <FieldForm
                  label={t("email")}
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  type="email"
                  required
                  errorMessage={errors.email?.message}
                />

                <FieldForm
                  label={t("password")}
                  name="password"
                  type="password"
                  required
                  errorMessage={errors.password?.message}
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
                  validate={(value) => {
                    if (value !== form.getValues("password")) {
                      return t("confirmPasswordValidation");
                    }
                    return true;
                  }}
                />
              </Flex>

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

                <Link href="/auth/login">
                  <Button variant="ghost" type="button">
                    {t("login")}
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

export default RegisterPage;
