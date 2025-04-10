import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const allProjectsQueryDetailed = defineQuery(/* groq */ `
  *[_type == "project"] | order(publishedAt desc) {
    ...,
    "tags": tags[]->name
  }
`);

export const projectBySlugQuery = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    ...,
    "tags": tags[]->name
  }
`);

export const allProjectsQuerySimple = defineQuery(/* groq */ `
  *[_type == "project"] | order(publishedAt desc)
`);

export const allExperienceQuery = defineQuery(/* groq */ `
  *[_type == "workExperience"] | order(startDate desc)
`);

export const allTechStackQuery = defineQuery(/* groq */ `
  *[_type == "techStack"]
`);
