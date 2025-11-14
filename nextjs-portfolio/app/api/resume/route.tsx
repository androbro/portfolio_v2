import { ResumeTemplate } from "@/app/components/pdf/ResumeTemplate";
import { client } from "@/app/sanity/client";
import {
	allExperienceQuery,
	allProjectsQueryDetailed,
	allTechStackQuery,
} from "@/app/sanity/lib/queries";
import Anthropic from "@anthropic-ai/sdk";
import { renderToBuffer } from "@react-pdf/renderer";
import type { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

const options = { next: { revalidate: 30 } };

async function translateToDutch(data: any): Promise<any> {
	const apiKey = process.env.ANTHROPIC_API_KEY || process.env.Claude_key;

	if (!apiKey) {
		throw new Error('ANTHROPIC_API_KEY environment variable is not set');
	}

	const anthropic = new Anthropic({
		apiKey: apiKey,
	});

	const contentToTranslate = JSON.stringify({
		title: data.title,
		bio: data.bio,
		workExperiences: data.workExperiences.map((exp: any) => ({
			role: exp.role,
			company: exp.company,
			description: exp.description,
			responsibilities: exp.responsibilities,
		})),
		projects: data.projects.map((proj: any) => ({
			title: proj.title,
			description: proj.description,
		})),
	});

	const message = await anthropic.messages.create({
		model: "claude-haiku-4-5-20251001",
		max_tokens: 4096,
		messages: [
			{
				role: "user",
				content: `You are a professional Dutch copywriter translating a resume from English to Dutch. Your goal is to create natural, human-sounding Dutch text that reads as if it was originally written in Dutch by a native speaker.

TRANSLATION GUIDELINES:
1. DO NOT translate technical terms: Keep programming languages, frameworks, tools, and technologies in English (React, TypeScript, Next.js, Angular, JavaScript, CSS, Node.js, Git, Docker, AWS, etc.)
2. DO NOT translate literally: Rewrite sentences naturally as a Dutch speaker would express them
3. Use professional but conversational Dutch that feels authentic and human
4. Maintain the same meaning and tone, but adapt the phrasing to sound natural in Dutch
5. Keep company names in their original form
6. Maintain the JSON structure exactly as provided - only translate the text values, keep all keys in English

TECHNICAL REQUIREMENTS:
- Return ONLY the JSON object, without any markdown formatting, code blocks, or additional text
- Do not wrap the response in \`\`\`json\`\`\` tags
- Maintain exact JSON structure

Here's the resume content to translate:\n\n${contentToTranslate}`,
			},
		],
	});

	// Extract text and strip markdown code blocks if present
	let responseText = message.content[0].type === "text" ? message.content[0].text : "{}";

	// Remove markdown code blocks (```json ... ``` or ``` ... ```)
	responseText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

	const translatedContent = JSON.parse(responseText);

	return {
		...data,
		title: translatedContent.title,
		bio: translatedContent.bio,
		workExperiences: data.workExperiences.map((exp: any, idx: number) => ({
			...exp,
			role: translatedContent.workExperiences[idx]?.role || exp.role,
			company: translatedContent.workExperiences[idx]?.company || exp.company,
			description: translatedContent.workExperiences[idx]?.description || exp.description,
			responsibilities:
				translatedContent.workExperiences[idx]?.responsibilities || exp.responsibilities,
		})),
		projects: data.projects.map((proj: any, idx: number) => ({
			...proj,
			title: translatedContent.projects[idx]?.title || proj.title,
			description: translatedContent.projects[idx]?.description || proj.description,
		})),
	};
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const lang = searchParams.get("lang") || "english";
	try {
		// Fetch all data from Sanity CMS
		const [workExperiences, projects, techStacks] = await Promise.all([
			client.fetch<any[]>(allExperienceQuery, {}, options),
			client.fetch<any[]>(allProjectsQueryDetailed, {}, options),
			client.fetch<any[]>(allTechStackQuery, {}, options),
		]);

		// Sort work experiences by start date (most recent first)
		const sortedExperiences = workExperiences.sort((a: any, b: any) => {
			return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
		});

		// Sort projects by published date (most recent first)
		const sortedProjects = projects
			.filter((p: any) => p.publishedAt)
			.sort((a: any, b: any) => {
				return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
			});

		// Fetch profile image and convert to base64
		let profileImageBase64 = "";
		try {
			// Get the origin from the request to build the full URL
			const url = new URL(request.url);
			const imageUrl = `${url.origin}/profile.jpg`;

			const imageResponse = await fetch(imageUrl);
			if (imageResponse.ok) {
				const imageBuffer = await imageResponse.arrayBuffer();
				const base64 = Buffer.from(imageBuffer).toString("base64");
				profileImageBase64 = `data:image/jpeg;base64,${base64}`;
			} else {
				console.error("Failed to fetch profile image:", imageResponse.status);
			}
		} catch (error) {
			console.error("Error loading profile image:", error);
			// Continue without image if it fails
		}

		// Resume data
		let resumeData = {
			name: "Koen De Vulder",
			title: "Frontend Developer",
			email: "devulderk@gmail.com",
			bio: "Passionate frontend developer with expertise in React, React Native, and Angular. I specialize in creating responsive, user-friendly web and mobile applications with a focus on modern design principles and best practices. Always eager to learn and expand my skill set while delivering high-quality solutions.",
			workExperiences: sortedExperiences,
			techStacks: techStacks,
			projects: sortedProjects,
			profileImage: profileImageBase64 || undefined,
		};

		// Translate to Dutch if requested
		if (lang === "dutch") {
			resumeData = await translateToDutch(resumeData);
		}

		// Generate PDF
		const pdfBuffer = await renderToBuffer(<ResumeTemplate data={resumeData} />);

		// Return PDF as downloadable file
		return new NextResponse(pdfBuffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": 'attachment; filename="Koen_De_Vulder_Resume.pdf"',
				"Cache-Control": "no-cache, no-store, must-revalidate",
			},
		});
	} catch (error) {
		console.error("Error generating PDF:", error);
		return NextResponse.json({ error: "Failed to generate resume PDF" }, { status: 500 });
	}
}
