'use server';

/**
 * @fileOverview A property search suggestion AI agent.
 *
 * - suggestProperties - A function that provides suggestions for property searches based on user input.
 * - SuggestPropertiesInput - The input type for the suggestProperties function.
 * - SuggestPropertiesOutput - The return type for the suggestProperties function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPropertiesInputSchema = z.object({
  query: z
    .string()
    .describe('The user input for which property search suggestions are generated.'),
  userType: z
    .enum(['investor', 'residential'])
    .describe('The type of user, which affects the type of properties suggested.'),
});
export type SuggestPropertiesInput = z.infer<typeof SuggestPropertiesInputSchema>;

const SuggestPropertiesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of property search suggestions based on the user input.'),
});
export type SuggestPropertiesOutput = z.infer<typeof SuggestPropertiesOutputSchema>;

export async function suggestProperties(input: SuggestPropertiesInput): Promise<SuggestPropertiesOutput> {
  return suggestPropertiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPropertiesPrompt',
  input: {schema: SuggestPropertiesInputSchema},
  output: {schema: SuggestPropertiesOutputSchema},
  prompt: `You are a real estate search assistant specializing in Zambian properties.

You will generate search suggestions to help users find properties they may be interested in. Consider the user type when generating suggestions.

If the user type is 'investor', suggest commercial and underdeveloped prime properties such as land for malls, office parks, industrial areas, and mixed-use developments.
If the user type is 'residential', suggest houses, apartments, and flats for rent or sale.

Based on the following user input, provide 5 search suggestions.

User Input: {{{query}}}
User Type: {{{userType}}}

Output the suggestions as a JSON array of strings.
`,
});

const suggestPropertiesFlow = ai.defineFlow(
  {
    name: 'suggestPropertiesFlow',
    inputSchema: SuggestPropertiesInputSchema,
    outputSchema: SuggestPropertiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
