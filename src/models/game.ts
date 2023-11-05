import { z } from "zod";

export type Game = {
  id: string;
  name: string;
  yearPublished: string;
  thumbnail: string;
};

export const BGGGameSchema = z.object({
  id: z.string(),
  name: z.string(),
  yearpublished: z.string(),
  thumbnail: z.string(),
});

export type BGGGameSchemaType = z.infer<typeof BGGGameSchema>;
