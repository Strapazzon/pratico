"use client";
import { AnamnesisModelBuilder } from "@components/AnamnesisModelBuilder";
import { EntityForm } from "@components/EntityForm";
import { AnamnesisModelEntity } from "@entities/anamnesisModelEntity";
import { AuthLoggedUserContext } from "@providers/authLoggedUserProvider";
import {
  addAnamnesisModelAction,
  updateAnamnesisModelAction,
  getAnamnesisModelAction,
} from "@server-actions/anamnesisModelActions";
import { FileBox } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useCallback, useContext, useEffect, useState } from "react";

type AnamnesisModelPageProps = {
  params: {
    id: string;
  };
};

const AnamnesisModelPage: React.FC<AnamnesisModelPageProps> = ({
  params: { id },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<AnamnesisModelEntity>();
  const { selectedOrganizationId } = useContext(AuthLoggedUserContext);
  const t = useTranslations("anamnesisModelEdit");
  const isNew = id === "new";

  const onSubmitHandler = useCallback(
    async (data: AnamnesisModelEntity) => {
      setIsLoading(true);
      if (isNew && selectedOrganizationId) {
        await addAnamnesisModelAction(data, selectedOrganizationId);
      } else {
        await updateAnamnesisModelAction(Number(id), data);
      }
      setIsLoading(false);
    },
    [id, isNew, selectedOrganizationId]
  );

  const loadAnamnesisModel = useCallback(async () => {
    setIsLoading(true);
    console.log("id", id, "selectedOrganizationId", selectedOrganizationId);
    const anamnesisModel = await getAnamnesisModelAction(
      Number(id),
      selectedOrganizationId
    );
    setValues(anamnesisModel as unknown as AnamnesisModelEntity);
    setIsLoading(false);
  }, [id, selectedOrganizationId]);

  if (!isNew && Number.isNaN(Number(id))) {
    throw new Error("Invalid anamnesisModelId");
  }

  useEffect(() => {
    if (!isNew) {
      loadAnamnesisModel();
    }
  }, [id, isNew, loadAnamnesisModel]);

  return (
    <EntityForm<AnamnesisModelEntity>
      formTitle={id === "new" ? t("newAnamnesisModel") : t("formTitle")}
      formIcon={<FileBox size="24" />}
      isLoading={isLoading}
      submitLabel={t("save")}
      defaultValues={values}
      onSubmit={onSubmitHandler}
      configFields={{
        anamnesisModelId: { hidden: true },
        organizationId: { hidden: true },
        title: { type: "text", label: t("name"), width: "half" },
        status: { hidden: true, defaultValue: "active" },
        description: { type: "text", label: t("description"), width: "half" },
        questions: {
          type: "component",
          render: () => <AnamnesisModelBuilder />,
        },
        createdAt: { hidden: true },
        updatedAt: { hidden: true },
      }}
    />
  );
};

export default AnamnesisModelPage;
