"use client";
import { EntityForm } from "@components/EntityForm";
import { OrganizationEntity } from "@entities/organizationEntity";
import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import { refreshTokenServerAction } from "@server-actions/loginServerAction";
import {
  findOrganizationByIdAction,
  newOrganizationAction,
  updateOrganizationAction,
} from "@server-actions/organizationActions";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext } from "react";

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
  const [values, setValues] = React.useState<OrganizationEntity>();

  if (organizationId !== "new" && Number.isNaN(Number(organizationId))) {
    throw new Error("Invalid organizationId");
  }

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

      setValues(updated as unknown as OrganizationEntity);
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
      setValues(organization as unknown as OrganizationEntity);
    }
    setIsLoading(false);
  }, [organizationId]);

  React.useEffect(() => {
    loadOrganization();
  }, [loadOrganization]);

  return (
    <EntityForm<OrganizationEntity>
      defaultValues={values}
      formTitle={t("title")}
      formIcon={<Building2 size="24" />}
      submitLabel={t("form.save")}
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
    />
  );
};

export default NewOrganizationPage;
