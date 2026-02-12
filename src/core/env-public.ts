import { z } from "zod";

const EnvPublicSchema = z.object({
	PUBLIC_PROJECTS_JSON_DATA_LINK: z.string(),
});

export const envPublic = EnvPublicSchema.parse(import.meta.env);
