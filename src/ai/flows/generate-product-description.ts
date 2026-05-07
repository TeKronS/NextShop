'use server';
/**
 * @fileOverview An AI assistant for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category the product belongs to (e.g., "Electronics", "Apparel").'),
  shortDescription: z.string().describe('A brief, one-sentence description of the product.'),
  keyFeatures: z.array(z.string()).describe('A list of key features or selling points of the product.'),
  targetAudience: z.string().optional().describe('The intended audience for the product (e.g., "tech enthusiasts", "young adults").'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter for an e-commerce platform named NextShop. Your task is to generate a detailed, engaging, and SEO-friendly product description based on the provided product features.

Product Name: {{{productName}}}
Category: {{{category}}}
Short Description: {{{shortDescription}}}

Key Features:
{{#each keyFeatures}}- {{{this}}}
{{/each}}

{{#if targetAudience}}Target Audience: {{{targetAudience}}}
{{/if}}

Please write a compelling product description that highlights its benefits, addresses the target audience if specified, and encourages purchase. The description should be professional yet enthusiastic, and should be at least 150 words long.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
