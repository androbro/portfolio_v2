// portfolio_v2/studio-portfolio/schemaTypes/projectType.ts
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text', // Use 'text' for longer descriptions, 'string' for short ones
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'url',
			title: 'Project URL',
			type: 'url',
		}),
		defineField({
			name: 'repositoryUrl',
			title: 'Repository URL',
			type: 'url',
		}),
		defineField({
			name: 'tags',
			title: 'Tags / Technologies Used',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'techStack' }] }],
		}),
		defineField({
			name: 'publishedAt', // Optional: if you want to order projects by date
			title: 'Published At',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
})