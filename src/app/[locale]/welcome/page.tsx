"use client";
import { EntityForm } from "@components/EntityForm";
import { OrganizationEntity } from "@entities/organizationEntity";
import { useRouter } from "@i18n/routing";
import { OrganizationsContext } from "@providers/organizationsProvider";
import { Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { refreshTokenServerAction } from "@server-actions/loginServerAction";
import { newOrganizationAction } from "@server-actions/organizationActions";
import { DoorOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext } from "react";
import styled from "styled-components";

type NewOrganizationPageProps = {
  params: {
    locale: string;
  };
};

const WelcomeMessage = styled(Text)`
  max-width: 40rem;
  text-align: center;
  margin-bottom: var(--space-9);
`;

const WelcomePage: React.FC<NewOrganizationPageProps> = ({ params: {} }) => {
  const tw = useTranslations("welcomePage");
  const t = useTranslations("newOrganization");
  const [isLoading, setIsLoading] = React.useState(false);
  const { refreshOrganizations } = useContext(OrganizationsContext);
  const router = useRouter();

  const createOrganization = useCallback(
    async (data: OrganizationEntity) => {
      await newOrganizationAction(data);
      await refreshTokenServerAction();
      await refreshOrganizations();
      router.push(`/dashboard`);
    },
    [refreshOrganizations, router]
  );

  const onSubmitHandler = async (data: OrganizationEntity) => {
    setIsLoading(true);
    await createOrganization(data);
    setIsLoading(false);
    return;
  };

  return (
    <Flex direction="column" align="center" height="100vh">
      <Heading my="8">{tw("title")}</Heading>
      <WelcomeMessage size="3">{tw("subtitle")}</WelcomeMessage>
      <EntityForm<OrganizationEntity>
        submitLabel={t("form.save")}
        hiddenHeader={true}
        configFields={{
          name: {
            label: t("form.name"),
            placeholder: t("form.name"),
            required: t("form.mandatoryField"),
            width: "third",
          },
          taxNumber: {
            label: t("form.taxNumber"),
            placeholder: t("form.taxNumber"),
            required: t("form.mandatoryField"),
            width: "third",
          },
          email: {
            label: t("form.email"),
            placeholder: t("form.email"),
            required: t("form.mandatoryField"),
            type: "email",
            width: "third",
          },
          address: {
            label: t("form.address"),
            placeholder: t("form.address"),
            width: "third",
          },
          addressNumber: {
            label: t("form.addressNumber"),
            placeholder: t("form.addressNumber"),
            width: "third",
          },
          addressComplement: {
            label: t("form.addressComplement"),
            placeholder: t("form.addressComplement"),
            width: "third",
          },
          city: {
            label: t("form.city"),
            placeholder: t("form.city"),
            width: "third",
          },
          postalCode: {
            label: t("form.postalCode"),
            placeholder: t("form.postalCode"),
            width: "third",
          },
          country: {
            label: t("form.country"),
            placeholder: t("form.country"),
            width: "third",
          },
          phoneNumber: {
            label: t("form.phoneNumber"),
            placeholder: t("form.phoneNumber"),
            width: "third",
          },
          website: {
            label: t("form.website"),
            placeholder: t("form.website"),
            width: "third",
          },
          createdAt: {
            hidden: true,
          },
          organizationId: {
            hidden: true,
          },
          userOwnerId: {
            hidden: true,
          },
        }}
        onSubmit={onSubmitHandler}
        isLoading={isLoading}
        formFooterRender={() => (
          <Flex justify="end" align="center" mt="6">
            <Button disabled={isLoading} size="3" variant="solid" type="submit">
              {tw("next")}
              <Spinner loading={isLoading}>
                <DoorOpen />
              </Spinner>
            </Button>
          </Flex>
        )}
      />
    </Flex>
  );
};

export default WelcomePage;
