import { Generated, JSONColumnType } from "kysely";

export type AnamnesisQuestionModel = {
  type: "text" | "number" | "date" | "radio" | "checkbox";
  question: string;
  required: boolean;
  options?: string[];
  optionalText?: boolean;
};

export interface AnamnesisModelEntity {
  anamnesisModelId: Generated<number>;
  organizationId: number;
  title: string;
  status: "active" | "archived";
  description?: string;
  questions?: JSONColumnType<AnamnesisQuestionModel[]>;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

type AnamnesisAnswer = {
  questionModel: AnamnesisQuestionModel;
  question: string;
  answer: string;
};

export interface AnamnesisEntity {
  anamnesisId: string;
  organizationId: number;
  customerId: number;
  anamnesisModelId: number;
  answers: JSONColumnType<AnamnesisAnswer>;
  status: "created" | "inProgress" | "signed";
  signedAt?: Date;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}
