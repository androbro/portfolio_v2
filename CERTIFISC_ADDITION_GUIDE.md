# Adding Certifisc Project to Portfolio

This guide provides step-by-step instructions for adding the Certifisc project, new tech stacks, and work experience to your Sanity CMS.

## Recent Improvements

✅ **Rich Text Support:** The portfolio now properly renders rich text (Portable Text) from Sanity CMS:
- Project descriptions support headings, lists, bold, italic, and code formatting
- Work experience descriptions now display formatted content with proper styling
- All markup from Sanity will render correctly on the website

✅ **Improved Project Links:** The "Visit Website" link has been moved to the top of project detail pages for better visibility and clarity.

## Prerequisites

1. Start Sanity Studio:
```bash
cd studio-portfolio
npm install
npm run dev
```

2. Access Sanity Studio at `http://localhost:3333` (or the port shown in terminal)

---

## Part 1: Add New Tech Stacks

You need to add these new technologies to Sanity:

### 1. PayloadCMS
- **Name:** PayloadCMS
- **Category:** Backend
- **Icon URL:** `/icons/payloadcms.svg`
- **Description:** Headless CMS for content management

### 2. Asana
- **Name:** Asana
- **Category:** DevOps/Tools
- **Icon URL:** `/icons/asana.svg`
- **Description:** Project management and task tracking

### 3. Google Analytics
- **Name:** Google Analytics
- **Category:** DevOps/Tools
- **Icon URL:** `/icons/googleanalytics.svg`
- **Description:** Web analytics and tracking

### 4. PostHog
- **Name:** PostHog
- **Category:** DevOps/Tools
- **Icon URL:** `/icons/posthog.svg`
- **Description:** Product analytics and feature flags

**Steps in Sanity Studio:**
1. Click "Tech Stack" in the left sidebar
2. Click "+ Create" button
3. Fill in the fields for each technology above
4. Click "Publish" for each entry

---

## Part 2: Add Certifisc Work Experience

### Work Experience Details:
- **Company:** Certifisc
- **Role:** Front End Developer
- **Location:** Ghent (you can add this in the description)
- **Start Date:** 2025-04
- **End Date:** Leave empty (current position)

### Description / Responsibilities:

**Note:** The description field supports rich text formatting. You can use headings, lists, bold, italic, and other formatting options in Sanity Studio. The content will be properly displayed on the website.

Suggested content:
```
Developed and designed the complete Certifisc website from concept to production.

Key Responsibilities:
- Led the full design process using Figma, iterating with business stakeholders to achieve the final design
- Developed the entire frontend using modern web technologies
- Implemented custom integrations with Asana for automated appointment-to-ticket conversion
- Integrated PayloadCMS for company-wide content management
- Created and produced all website media including videos and photography
- Implemented SEO optimization strategies
- Set up analytics and tracking with Google Analytics and PostHog
```

### Skills / Technologies Used:
Select these from the Tech Stack references:
- Next.js
- React
- TypeScript
- Tailwind CSS
- PayloadCMS
- Asana
- Google Analytics
- PostHog
- Figma

**Steps in Sanity Studio:**
1. Click "Work Experience" in the left sidebar
2. Click "+ Create" button
3. Fill in all fields as specified above
4. Link the technologies in the "Skills / Technologies Used" field
5. Click "Publish"

---

## Part 3: Add Certifisc Project

### Project Details:

**Basic Information:**
- **Title:** Certifisc Website
- **Slug:** certifisc-website (will auto-generate)
- **Project URL:** https://www.certifisc.be/nl/home
- **Repository URL:** (Add if applicable, otherwise leave empty)
- **Duration:** April 2025 - Present

**Short Description (for project cards):**
```
A fully custom-designed website for Certifisc with complete design, development, and content management implementation. Features seamless Asana integration and PayloadCMS for dynamic content.
```

**Full Description (detailed page content):**

**Note:** This field supports rich text formatting including headings (H2, H3, H4), bullet lists, numbered lists, bold text, italic text, and inline code. Use these formatting options in Sanity Studio to create a well-structured project description.

Suggested content:
```
Complete Website Design & Development for Certifisc

I designed and developed the entire Certifisc website from the ground up, handling every aspect from initial concept to production deployment.

Design Process
The design was created entirely in Figma through an iterative process with business stakeholders. Multiple rounds of feedback and refinement led to a final design that perfectly balances user experience with business objectives.

Content Creation
All media assets were custom-created for the website:
- Professional video production showcasing company services
- Custom photography capturing the company's work environment and team
- Carefully crafted copy and messaging aligned with brand identity

Technical Implementation
The website features several sophisticated integrations and modern development practices:

PayloadCMS Integration
Implemented a complete headless CMS solution that empowers the entire company to manage website content without technical knowledge. The system provides intuitive content editing for pages, blog posts, team members, and service descriptions.

Asana Integration
Developed a seamless integration where appointment bookings automatically create tickets in the company's Asana project board. This automation streamlines the workflow from customer inquiry to project management.

Performance & SEO
The website is built with performance and discoverability in mind:
- Comprehensive SEO optimization for search engine visibility
- Google Analytics implementation for traffic analysis
- PostHog integration for advanced product analytics and user behavior tracking
- Optimized loading times and responsive design across all devices

The result is a modern, maintainable website that serves as an effective business tool while providing an excellent user experience.
```

### Key Features:
Add these as separate feature items:
```
1. Custom Figma design created through stakeholder collaboration
2. Asana integration for automatic appointment-to-ticket conversion
3. PayloadCMS implementation for company-wide content management
4. Custom video production and photography
5. Comprehensive SEO optimization
6. Google Analytics integration for traffic tracking
7. PostHog analytics for user behavior insights
8. Fully responsive design across all devices
9. Performance-optimized for fast loading times
```

### Technologies Used (Tags):
Select these tech stack items you've created:
- Next.js
- React
- TypeScript
- Tailwind CSS
- PayloadCMS
- Asana
- Google Analytics
- PostHog
- Figma
- Node.js (if used for backend)

### Images:
- **Card Image:** Upload a thumbnail/preview image of the Certifisc website
- **Main Image:** Upload a hero image showing the website
- **Project Screenshots:** Upload multiple screenshots showing different pages and features:
  - Homepage
  - About page
  - Services/product pages
  - Contact/appointment booking flow
  - CMS interface (if you can share)
  - Mobile responsive views

### Challenges & Solutions:
Add these challenge/solution pairs:

**Challenge 1:**
```
Challenge: Integrating appointment bookings with Asana's API while maintaining data integrity and real-time synchronization.

Solution: Developed a robust middleware layer that handles API authentication, data transformation, and error handling. Implemented webhook listeners to ensure bidirectional sync and added retry logic for failed requests to maintain reliability.
```

**Challenge 2:**
```
Challenge: Enabling non-technical staff to manage complex website content without compromising design consistency.

Solution: Configured PayloadCMS with custom field types and validation rules that guide content creators while preventing layout-breaking changes. Created reusable content blocks and templates that maintain design integrity across all pages.
```

**Challenge 3:**
```
Challenge: Balancing rich media content (videos and high-resolution images) with optimal performance.

Solution: Implemented Next.js Image optimization, lazy loading strategies, and modern video encoding formats. Used CDN for asset delivery and implemented progressive loading to ensure fast initial page loads while maintaining visual quality.
```

**Steps in Sanity Studio:**
1. Click "Project" in the left sidebar
2. Click "+ Create" button
3. Fill in all sections as detailed above
4. Upload images (make sure you have screenshots of the Certifisc website ready)
5. Link the technologies in the "Tags / Technologies Used" field
6. Add features as separate entries
7. Add challenges and solutions
8. Click "Publish"

---

## Part 4: Verification

After adding all entries:

1. **Check Tech Stack Display:**
   - Navigate to your portfolio's tech stack section
   - Verify all new icons appear correctly

2. **Check Work Experience:**
   - Navigate to your portfolio's experience section
   - Verify Certifisc appears with correct dates and description

3. **Check Project Display:**
   - Navigate to your portfolio's projects section
   - Verify Certifisc project card appears
   - Click through to the project detail page
   - Verify all content displays correctly

---

## Notes

- The icons for new tech stacks have been downloaded to `nextjs-portfolio/public/icons/`
- The TechStackData.ts file has been updated with references to the new technologies
- Make sure to have high-quality images ready before adding the project
- Consider adding a project demo video if available
- The repository URL can be left empty if the project is private/proprietary

---

## Files Modified

1. `/nextjs-portfolio/app/assets/content/TechStackData.ts` - Added new tech stack references
2. `/nextjs-portfolio/public/icons/` - Added new tech stack icons:
   - asana.svg
   - payloadcms.svg
   - googleanalytics.svg
   - posthog.svg

All data additions should be done through Sanity Studio interface as described above.
