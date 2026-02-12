import { z } from "zod";

const EnvSchema = z.object({
	OGP_URL: z.string(),

	HTML_DESCRIPTION: z.string(),

	AUTHOR_NAME_SHORT: z.string(),
	AUTHOR_NAME_LONG: z.string(),
	AUTHOR_ADDRESS_SHORT: z.string(),
	AUTHOR_ADDRESS_LONG: z.string(),
	AUTHOR_CONTACT_NUMBER: z.string(),
	AUTHOR_EMAIL: z.string(),
	AUTHOR_LINKEDIN_LINK: z.string(),
	AUTHOR_GITHUB_LINK: z.string(),
	AUTHOR_BANNER_IMAGE_LINK: z.string(),
	AUTHOR_BANNER_IMAGE_ALT: z.string(),
	AUTHOR_RESUME_LINK: z.string(),
	AUTHOR_PORTRAIT_LINK: z.string(),
});

export const env = EnvSchema.parse(import.meta.env);
