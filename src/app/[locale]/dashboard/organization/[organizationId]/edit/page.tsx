"use client";
import { FieldForm } from "@components/UI/FieldForm";
import { FormRow } from "@components/UI/FormRow";
import { OrganizationEntity } from "@entities/organizationEntity";
import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import { Button, Flex, Heading, Spinner } from "@radix-ui/themes";
import { refreshTokenServerAction } from "@server-actions/loginServerAction";
import {
  findOrganizationByIdAction,
  newOrganizationAction,
  updateOrganizationAction,
} from "@server-actions/organizationActions";
import { Building2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

type NewOrganizationPageProps = {
  params: {
    locale: string;
    organizationId: string;
  };
};

const NewOrganizationPage: React.FC<NewOrganizationPageProps> = ({
  params: { organizationId },
}) => {
  const t = useTranslations("newOrganization");
  const [isLoading, setIsLoading] = React.useState(false);
  const { refreshUserData } = useContext(AuthLoggedUserContext);

  if (organizationId !== "new" && Number.isNaN(Number(organizationId))) {
    throw new Error("Invalid organizationId");
  }

  const form = useForm<OrganizationEntity>({
    shouldUseNativeValidation: false,
    disabled: isLoading,
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  const createOrganization = useCallback(
    async (data: OrganizationEntity) => {
      await newOrganizationAction(data);
      await refreshTokenServerAction();
      await refreshUserData();
    },
    [refreshUserData]
  );

  const onSubmitHandler = async (data: OrganizationEntity) => {
    setIsLoading(true);
    if (organizationId === "new") {
      await createOrganization(data);
    } else {
      const updated = await updateOrganizationAction(
        Number(organizationId),
        data
      );

      reset(updated as unknown as OrganizationEntity);
    }

    setIsLoading(false);
    return;
  };

  const loadOrganization = useCallback(async () => {
    if (organizationId === "new") {
      return;
    }
    setIsLoading(true);
    const organization = await findOrganizationByIdAction(
      Number(organizationId)
    );
    if (organization) {
      form.reset(organization as unknown as OrganizationEntity);
    }
    setIsLoading(false);
  }, [form, organizationId]);

  React.useEffect(() => {
    loadOrganization();
  }, [loadOrganization]);

  return (
    <Flex
      direction="column"
      mb="6"
      px={{
        initial: "4",
        lg: "2",
      }}
    >
      <Flex gap="2">
        <Building2 size="24" />
        <Heading size="6">{t("title")}</Heading>
      </Flex>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Flex justify="end" mb="4">
            <Button
              variant="solid"
              type="submit"
              size="3"
              disabled={isLoading || !isDirty}
            >
              <Spinner loading={isLoading}>
                <Save size="24" />
              </Spinner>
              {t("form.save")}
            </Button>
          </Flex>
          <FormRow>
            <FieldForm
              label={t("form.name")}
              name="name"
              type="text"
              required={t("form.mandatoryField")}
            />

            <FieldForm
              label={t("form.taxNumber")}
              name="taxNumber"
              type="text"
              required={t("form.mandatoryField")}
            />

            <FieldForm
              label={t("form.email")}
              name="email"
              type="email"
              required={t("form.mandatoryField")}
            />
          </FormRow>

          <FormRow>
            <FieldForm label={t("form.address")} name="address" type="text" />

            <FieldForm
              label={t("form.addressNumber")}
              name="addressNumber"
              type="text"
            />

            <FieldForm
              label={t("form.addressComplement")}
              name="addressComplement"
              type="text"
            />
          </FormRow>
          <FormRow>
            <FieldForm label={t("form.city")} name="city" type="text" />
            <FieldForm
              label={t("form.postalCode")}
              name="postalCode"
              type="text"
            />
            <FieldForm label={t("form.country")} name="country" type="text" />
          </FormRow>
          <FormRow>
            <FieldForm
              label={t("form.phoneNumber")}
              name="phoneNumber"
              type="text"
              width="third"
            />
            <FieldForm
              label={t("form.website")}
              name="website"
              type="text"
              width="third"
            />
          </FormRow>
        </form>
      </FormProvider>
    </Flex>
  );
};

export default NewOrganizationPage;
