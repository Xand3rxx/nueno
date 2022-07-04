import { FieldCreateRequestParams } from "@api-contracts/application-forms/fields";
import JobEntity from "@business-logic/Job";
import UserEntity from "@business-logic/User";
import { FieldType } from "@prisma/client";

import NotFoundError from "@helpers/errors/NotFoundError";
import prisma from "@helpers/prisma";

export default class GenerateDefaultFields {
  async create(jobUid: string, userId: number) {
    const user = await new UserEntity().find(userId);
    const job = await new JobEntity().findByUuid(jobUid);

    // Throw a Not found error if user id does not exist
    if (!user) throw new NotFoundError("Not found");

    // Throw a Not found error if job uid does not exist
    if (!job) throw new NotFoundError("Job Not found");

    // Array of objects to be processed
    const fields: FieldCreateRequestParams[] = [
      {
        label: "Full Name",
        type: FieldType["SHORT_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "FIXED",
      },
      {
        label: "Email Address",
        type: FieldType["SHORT_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "FIXED",
      },
      {
        label: "Phone Number",
        type: FieldType["SHORT_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "FIXED",
      },
      {
        label: "Headline",
        type: FieldType["SHORT_TEXT"],
        required: false,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "NON_FIXED",
      },
      {
        label: "Address",
        type: FieldType["LONG_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "NON_FIXED",
      },
      {
        label: "Education History",
        type: FieldType["LONG_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "NON_FIXED",
      },
      {
        label: "Job Experience",
        type: FieldType["LONG_TEXT"],
        required: true,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "NON_FIXED",
      },
      {
        label: "Cover Letter",
        type: FieldType["LONG_TEXT"],
        required: false,
        jobId: job.id,
        companyId: user.companyId,
        fieldChange: "NON_FIXED",
      },
    ];

    // Delete existing data
    await prisma.field.deleteMany({
      where: {
        jobId: job.id,
      },
    });

    return await prisma.field.createMany({
      data: fields,
      skipDuplicates: true,
    });
  }
}
