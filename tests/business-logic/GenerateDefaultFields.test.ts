import GenerateDefaultFields from "@business-logic/GenerateDefaultFields";
import JobEntity from "@business-logic/Job";
import { Job } from "@prisma/client";

import prisma from "@helpers/prisma";
import { minimalSetup } from "@helpers/tests/setup";
import { teardown } from "@helpers/tests/teardown";

describe("Create Job Applicaton Form", () => {
  beforeEach(async () => {
    await teardown();
  });

  describe("#create", () => {
    it("can generate default job application form fields", async () => {
      const { user } = await minimalSetup();

      const requestParams = {
        title: "Software Engineer",
        description: "You write code.",
      };

      const jobEntity = new JobEntity();
      const result = await jobEntity.create(requestParams, user.id);

      const job = (await prisma.job.findUnique({ where: { id: result.id } })) as Job;

      const entity = new GenerateDefaultFields();
      const fields = await entity.create(job.uid, user.id);
      expect(fields.count).toBe(2);
    });
  });
});
