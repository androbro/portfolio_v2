// portfolio_v2/studio-portfolio/schemaTypes/projectType.ts
import { defineField, defineType } from "sanity";

export const projectType = defineType({
	name: "project",
	title: "Project",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text", // Short description for project cards
			validation: (rule) => rule.required().max(300),
		}),
		defineField({
			name: "fullDescription",
			title: "Full Description",
			description: "Detailed description for the project page",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "H2", value: "h2" },
						{ title: "H3", value: "h3" },
						{ title: "H4", value: "h4" },
					],
					lists: [
						{ title: "Bullet", value: "bullet" },
						{ title: "Numbered", value: "number" },
					],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" },
							{ title: "Code", value: "code" },
						],
					},
				},
			],
		}),
		defineField({
			name: "image",
			title: "Main Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "projectScreenshots",
			title: "Project Screenshots",
			description: "Screenshots of the project for the detailed page",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "caption",
							type: "string",
							title: "Caption",
							options: {
								isHighlighted: true,
							},
						},
						{
							name: "alt",
							type: "string",
							title: "Alt Text",
							options: {
								isHighlighted: true,
							},
						},
					],
				},
			],
		}),
		defineField({
			name: "mockImages",
			title: "Mock Images",
			description: "Mockup images for projects that cannot be shared publicly",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "caption",
							type: "string",
							title: "Caption",
							options: {
								isHighlighted: true,
							},
						},
						{
							name: "alt",
							type: "string",
							title: "Alt Text",
							options: {
								isHighlighted: true,
							},
						},
					],
				},
			],
		}),
		defineField({
			name: "url",
			title: "Project URL",
			type: "url",
		}),
		defineField({
			name: "repositoryUrl",
			title: "Repository URL",
			type: "url",
		}),
		defineField({
			name: "tags",
			title: "Tags / Technologies Used",
			type: "array",
			of: [{ type: "reference", to: [{ type: "techStack" }] }],
		}),
		defineField({
			name: "features",
			title: "Key Features",
			description: "List of key features for the project",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "challenges",
			title: "Challenges & Solutions",
			description: "Describe challenges faced and solutions implemented",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{ name: "challenge", type: "string", title: "Challenge" },
						{ name: "solution", type: "text", title: "Solution" },
					],
				},
			],
		}),
		defineField({
			name: "publishedAt",
			title: "Published At",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: "duration",
			title: "Project Duration",
			type: "string",
			description: 'e.g., "3 months", "Jan 2023 - Mar 2023"',
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "image",
		},
	},
});
