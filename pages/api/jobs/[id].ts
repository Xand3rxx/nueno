import { JobDetailResponseParams as ResponseParams } from "@api-contracts/jobs/detail";
import JobEntity from "@business-logic/Job";
import { NextApiRequest, NextApiResponse } from "next";

import HttpError from "@helpers/errors/HttpError";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const entity = new JobEntity();

  try {
    const { id } = req.query;
    const response: ResponseParams = await entity.find(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof HttpError) return res.status(error.code).json(error.message);
    throw error;
  }
}
