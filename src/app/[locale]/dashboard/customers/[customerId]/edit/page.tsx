"use client";
import { EntityForm } from "@components/EntityForm";
import { Notes } from "@components/UI/Notes";
import { CustomerEntity } from "@entities/customerEntity";
import { useRouter } from "@i18n/routing";
import { OrganizationsContext } from "@providers/organizationsProvider";
import {
  createCustomerAction,
  getCustomerAction,
  updateCustomerAction,
} from "@server-actions/customerServerActions";
import { UserPen, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useEffect, useState } from "react";

type CustomerEditPageProps = {
  params: {
    locale: string;
    customerId: string;
  };
};

const CustomerEditPage: React.FC<CustomerEditPageProps> = ({
  params: { customerId },
}) => {
  const t = useTranslations("customerEdit");
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<CustomerEntity>();
  const { organizationId } = useContext(OrganizationsContext);
  const router = useRouter();

  const isNew = customerId === "new";

  if (!isNew && Number.isNaN(Number(customerId))) {
    throw new Error("Invalid organizationId");
  }

  const createCustomer = async (data: CustomerEntity) => {
    if (!organizationId) {
      throw new Error("OrganizationId not found");
    }

    await createCustomerAction(data, organizationId);
  };

  const onSubmitHandler = async (data: CustomerEntity) => {
    setIsLoading(true);
    if (isNew) {
      await createCustomer(data);
      router.push("/dashboard/customers");
    } else {
      const updated = await updateCustomerAction(Number(customerId), data);
      setValues(updated as unknown as CustomerEntity);
    }

    setIsLoading(false);
    return;
  };

  const loadCustomer = useCallback(async () => {
    setIsLoading(true);
    if (!organizationId) {
      throw new Error("OrganizationId not found");
    }

    const customer = await getCustomerAction(
      Number(customerId),
      organizationId
    );
    setValues(customer as unknown as CustomerEntity);
    setIsLoading(false);
  }, [customerId, organizationId]);

  useEffect(() => {
    if (!isNew) {
      loadCustomer();
    }
  }, [isNew, loadCustomer]);

  return (
    <EntityForm<CustomerEntity>
      isLoading={isLoading}
      formTitle={isNew ? t("newCustomer") : t("formTitle")}
      formIcon={isNew ? <UserPlus size="24" /> : <UserPen size="24" />}
      submitLabel={t("save")}
      defaultValues={values}
      onSubmit={onSubmitHandler}
      configFields={{
        firstName: {
          label: t("firstName"),
          type: "text",
          required: t("mandatoryField"),
        },
        lastName: {
          label: t("lastName"),
          type: "text",
          required: t("mandatoryField"),
        },
        birthDate: {
          label: t("birthDate"),
          type: "date",
          required: t("mandatoryField"),
        },
        email: {
          label: t("email"),
          type: "email",
          required: t("mandatoryField"),
        },

        address: {
          label: t("address"),
          type: "text",
        },
        addressComplement: {
          label: t("addressComplement"),
          type: "text",
        },
        city: {
          label: t("city"),
          type: "text",
        },
        postalCode: {
          label: t("postalCode"),
          type: "text",
        },
        country: {
          label: t("country"),
          type: "text",
        },
        phoneNumber: {
          label: t("phoneNumber"),
          type: "text",
        },
        taxNumber: {
          label: t("taxNumber"),
          type: "text",
          required: t("mandatoryField"),
        },
        notes: {
          label: t("notes"),
          type: "component",
          render: ({ value, onChange }) => (
            <Notes content={value} onChange={onChange} />
          ),
        },
        createdAt: {
          hidden: true,
        },
        customerId: {
          hidden: true,
        },
        organizationId: {
          hidden: true,
        },
      }}
    />
  );
};

export default CustomerEditPage;
