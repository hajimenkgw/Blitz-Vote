import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteQuestion = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteQuestion), resolver.authorize(), async ({ id }) => {
  await db.choice.deleteMany({ where: { questionId: id } })

  const question = await db.question.deleteMany({ where: { id } })

  return question
})
