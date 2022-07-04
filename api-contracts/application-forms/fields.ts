import { Field } from "@prisma/client";
import { FieldType, FieldChange } from "@prisma/client";

export type FieldCreateRequestParams = {
  label: string;
  type: FieldType;
  required: boolean;
  jobId: number;
  companyId: number | null;
  fieldChange: FieldChange;
};

export type FieldCreateResponseParams = Field;
