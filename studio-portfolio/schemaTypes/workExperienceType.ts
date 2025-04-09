// portfolio_v2/studio-portfolio/schemaTypes/workExperienceType.ts
import { defineField, defineType } from 'sanity'

export const workExperienceType = defineType({
	name: 'workExperience',
	title: 'Work Experience',
	type: 'document',
	fields: [
		defineField({
			name: 'company',
			title: 'Company',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
			options: {
				dateFormat: 'YYYY-MM',
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'date',
			options: {
				dateFormat: 'YYYY-MM',
			},
			// No validation required, as it might be the current job
		}),
		defineField({
			name: 'description',
			title: 'Description / Responsibilities',
			type: 'array', // Use block content for rich text descriptions
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'skills',
			title: 'Skills / Technologies Used',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'techStack' }] }],
		}),
	],
	preview: {
		select: {
			title: 'role',
			subtitle: 'company',
		},
	},
	orderings: [
		// Optional: Add ordering for Sanity Studio UI
		{
			title: 'End Date, Newest First',
			name: 'endDateDesc',
			by: [{ field: 'endDate', direction: 'desc' }],
		},
		{
			title: 'Start Date, Newest First',
			name: 'startDateDesc',
			by: [{ field: 'startDate', direction: 'desc' }],
		},
	],
})