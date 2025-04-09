// portfolio_v2/studio-portfolio/schemaTypes/techStackType.ts
import { defineField, defineType } from 'sanity'

export const techStackType = defineType({
	name: 'techStack',
	title: 'Tech Stack',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'image',
			options: {
				hotspot: true, // Allows selecting a specific part of the image to focus on
			},
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			options: {
				list: [
					{ title: 'Frontend', value: 'frontend' },
					{ title: 'Backend', value: 'backend' },
					{ title: 'Database', value: 'database' },
					{ title: 'DevOps/Tools', value: 'devops-tools' },
					{ title: 'Mobile', value: 'mobile' },
					{ title: 'Other', value: 'other' },
				],
				layout: 'radio', // or 'dropdown'
			},
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'icon',
		},
	},
})