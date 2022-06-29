import prisma from "@helpers/prisma";

export async function teardown() {
  return prisma.company.deleteMany({});
}

export async function resetJobApplicationForm() {
  return prisma.field.deleteMany({});
}
