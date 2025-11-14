import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { ResumeTemplate } from '@/app/components/pdf/ResumeTemplate';
import { client } from '@/app/sanity/client';
import { allExperienceQuery, allProjectsQueryDetailed, allTechStackQuery } from '@/app/sanity/lib/queries';
import type { SanityDocument } from 'next-sanity';

const options = { next: { revalidate: 30 } };

export async function GET() {
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

    // Resume data
    const resumeData = {
      name: 'Koen De Vulder',
      title: 'Frontend Developer',
      email: 'devulderk@gmail.com',
      bio: "Passionate frontend developer with expertise in React, React Native, and Angular. I specialize in creating responsive, user-friendly web and mobile applications with a focus on modern design principles and best practices. Always eager to learn and expand my skill set while delivering high-quality solutions.",
      workExperiences: sortedExperiences,
      techStacks: techStacks,
      projects: sortedProjects,
    };

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <ResumeTemplate data={resumeData} />
    );

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Koen_De_Vulder_Resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume PDF' },
      { status: 500 }
    );
  }
}
