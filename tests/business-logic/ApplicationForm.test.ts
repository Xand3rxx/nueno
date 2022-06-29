import ApplicationFormEntity from "@business-logic/ApplicationForm";
import JobEntity from "@business-logic/Job";
import { FieldType } from "@prisma/client";

import { minimalSetup } from "@helpers/tests/setup";
import { resetJobApplicationForm } from "@helpers/tests/teardown";
import { teardown } from "@helpers/tests/teardown";

describe("Create Job Applicaton Form", () => {
  beforeEach(async () => {
    await resetJobApplicationForm();
    await teardown();
  });

  describe("#create", () => {
    it("creates job application form", async () => {
      // Create new user record
      const { user } = await minimalSetup();

      // Create new job application record
      const jobRequestParams = {
        title: "Software Engineer",
        description: "You write code.",
      };

      const jobEntity = new JobEntity();
      const jobResponse = await jobEntity.create(jobRequestParams, user.id);

      // Job application form field payload
      const formRequestParams = {
        jobUid: jobResponse.uid,
        fields: [
          {
            label: "Full Name",
            type: FieldType["SHORT_TEXT"],
            required: true,
            jobId: jobResponse.id,
            companyId: user.companyId,
          },
        ],
      };

      const entity = new ApplicationFormEntity();
      const result = await entity.create(formRequestParams, user.id);
      expect(result.jobUid).toBe(jobResponse.uid);
    });
  });
});
