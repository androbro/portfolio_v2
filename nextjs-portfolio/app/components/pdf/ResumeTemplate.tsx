import { Document, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type React from "react";

// Register fonts if needed (optional - PDF will use default fonts)
// Font.register({ family: 'Roboto', src: 'path-to-roboto.ttf' });

// Define styles matching your website's design
const styles = StyleSheet.create({
	page: {
		padding: 40,
		backgroundColor: "#212121", // Dark background matching --background
		color: "#ededed", // Light text matching --foreground
		fontFamily: "Helvetica",
		fontSize: 10,
	},
	header: {
		flexDirection: "row",
		marginBottom: 12,
		borderBottom: "2 solid #00ff7f", // Green accent matching --accent (approximation)
		paddingBottom: 10,
		alignItems: "center",
	},
	headerContent: {
		flex: 1,
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 15,
		borderWidth: 8,
		borderStyle: "solid",
		borderColor: "#00ff7f",
	},
	name: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#00ff7f", // Bright green accent
		marginBottom: 5,
		letterSpacing: 0.5,
	},
	title: {
		fontSize: 16,
		color: "#ededed",
		marginBottom: 8,
	},
	contactInfo: {
		fontSize: 9,
		color: "#b0b0b0",
		marginTop: 3,
		lineHeight: 1.4,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 5,
	},
	contactItem: {
		fontSize: 9,
		color: "#b0b0b0",
	},
	contactLink: {
		fontSize: 9,
		color: "#00ff7f",
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#00ff7f", // Green accent
		marginBottom: 8,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	aboutText: {
		fontSize: 9,
		lineHeight: 1.4,
		color: "#ededed",
		textAlign: "justify",
	},
	experienceItem: {
		marginBottom: 10,
	},
	experienceHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	companyName: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#ededed",
	},
	role: {
		fontSize: 11,
		color: "#00ff7f",
		marginBottom: 2,
	},
	date: {
		fontSize: 9,
		color: "#b0b0b0",
	},
	description: {
		fontSize: 9,
		color: "#d0d0d0",
		lineHeight: 1.3,
		marginTop: 2,
	},
	skillsContainer: {
		flexDirection: "row",
		marginBottom: 4,
		flexWrap: "wrap",
	},
	skillCategory: {
		fontSize: 9,
		fontWeight: "bold",
		color: "#00ff7f",
		marginRight: 6,
	},
	skillsList: {
		fontSize: 9,
		color: "#d0d0d0",
	},
	projectItem: {
		marginBottom: 6,
	},
	projectTitle: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#ededed",
		marginBottom: 1,
	},
	projectDescription: {
		fontSize: 8,
		color: "#d0d0d0",
		lineHeight: 1.3,
		marginBottom: 2,
	},
	projectTags: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 1,
	},
	projectTag: {
		fontSize: 7,
		color: "#00ff7f",
		backgroundColor: "#1a3a2a",
		padding: "1 4",
		marginRight: 3,
		marginBottom: 2,
		borderRadius: 2,
	},
	educationItem: {
		marginBottom: 10,
	},
	degree: {
		fontSize: 11,
		fontWeight: "bold",
		color: "#ededed",
		marginBottom: 2,
	},
	institution: {
		fontSize: 10,
		color: "#00ff7f",
		marginBottom: 2,
	},
	footer: {
		position: "absolute",
		bottom: 30,
		left: 40,
		right: 40,
		textAlign: "center",
		color: "#808080",
		fontSize: 8,
		borderTop: "1 solid #3a3a3a",
		paddingTop: 10,
	},
});

interface ResumeData {
	name: string;
	title: string;
	email: string;
	phone?: string;
	location?: string;
	linkedin?: string;
	github?: string;
	website?: string;
	bio: string;
	workExperiences: any[];
	techStacks: any[];
	projects: any[];
	education?: Array<{
		degree: string;
		institution: string;
		location: string;
		startDate: string;
		endDate: string;
	}>;
	languages?: Array<{
		language: string;
		proficiency: string;
	}>;
	profileImage?: string;
}

// Helper function to convert Portable Text to plain text
const portableTextToPlain = (blocks: any[]): string => {
	if (!blocks || !Array.isArray(blocks)) return "";

	return blocks
		.map((block) => {
			if (block._type !== "block" || !block.children) return "";
			return block.children.map((child: any) => child.text).join("");
		})
		.join(" ");
};

// Helper function to format date
const formatDate = (dateString: string): string => {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const ResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
	const {
		name,
		title,
		email,
		phone,
		location,
		linkedin,
		github,
		website,
		bio,
		workExperiences,
		techStacks,
		projects,
		education,
		languages,
		profileImage,
	} = data;

	// Group tech stacks by category
	const groupedTechStacks = techStacks.reduce(
		(acc, tech) => {
			const category = tech.category || "other";
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(tech);
			return acc;
		},
		{} as Record<string, any[]>,
	);

	// Category display names
	const categoryNames: Record<string, string> = {
		frontend: "Frontend",
		backend: "Backend",
		database: "Database",
		"devops-tools": "DevOps & Tools",
		mobile: "Mobile",
		other: "Other",
	};

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Header Section */}
				<View style={styles.header}>
					{profileImage && <Image src={profileImage} style={styles.profileImage} />}
					<View style={styles.headerContent}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.title}>{title}</Text>
						{location && <Text style={styles.contactInfo}>{location}</Text>}
						{languages && languages.length > 0 && (
							<Text style={styles.contactInfo}>
								{languages.map((lang) => `${lang.language} (${lang.proficiency})`).join(" • ")}
							</Text>
						)}
						<View style={styles.contactRow}>
							{email && <Text style={styles.contactItem}>{email}</Text>}
							{phone && <Text style={styles.contactItem}>• {phone}</Text>}
							{website && (
								<Link src={website} style={styles.contactLink}>
									{website}
								</Link>
							)}
						</View>
						<View style={styles.contactRow}>
							{linkedin && (
								<Link src={linkedin} style={styles.contactLink}>
									linkedin.com/in/koendevulder
								</Link>
							)}
							{github && (
								<Link src={github} style={styles.contactLink}>
									• github.com/androbro
								</Link>
							)}
						</View>
					</View>
				</View>

				{/* About Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>About</Text>
					<Text style={styles.aboutText}>{bio}</Text>
				</View>

				{/* Work Experience Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Work Experience</Text>
					{workExperiences.map((exp, index) => (
						<View key={index} style={styles.experienceItem}>
							<View style={styles.experienceHeader}>
								<View>
									<Text style={styles.companyName}>{exp.company}</Text>
									<Text style={styles.role}>{exp.role}</Text>
								</View>
								<Text style={styles.date}>
									{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
								</Text>
							</View>
							<Text style={styles.description}>{portableTextToPlain(exp.description)}</Text>
						</View>
					))}
				</View>
			</Page>

			{/* Page 2 - Technical Skills and Projects */}
			<Page size="A4" style={styles.page}>
				{/* Technical Skills Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Technical Skills</Text>
					{Object.entries(groupedTechStacks).map(([category, techs]) => (
						<View key={category} style={styles.skillsContainer}>
							<Text style={styles.skillCategory}>{categoryNames[category] || category}:</Text>
							<Text style={styles.skillsList}>
								{(techs as any[]).map((tech: any) => tech.name).join(", ")}
							</Text>
						</View>
					))}
				</View>

				{/* Projects Section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Projects</Text>
					{projects.map((project, index) => (
						<View key={index} style={styles.projectItem}>
							{project.slug?.current ? (
								<Link
									src={`https://www.devulderk.com/projects/${project.slug.current}`}
									style={styles.projectTitle}
								>
									{project.title}
								</Link>
							) : (
								<Text style={styles.projectTitle}>{project.title}</Text>
							)}
							<Text style={styles.projectDescription}>{project.description}</Text>
							{project.tags && project.tags.length > 0 && (
								<View style={styles.projectTags}>
									{project.tags.map((tag: any, tagIndex: number) => (
										<Text key={tagIndex} style={styles.projectTag}>
											{tag.name}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>

				{/* Footer */}
				<View style={styles.footer}>
					<Text>Generated from portfolio website • {new Date().toLocaleDateString()}</Text>
				</View>
			</Page>

			{/* Page 3 - Education */}
			{education && education.length > 0 && (
				<Page size="A4" style={styles.page}>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Education</Text>
						{education.map((edu, index) => (
							<View key={index} style={styles.educationItem}>
								<Text style={styles.degree}>{edu.degree}</Text>
								<Text style={styles.institution}>
									{edu.institution} • {edu.location}
								</Text>
								{edu.startDate && (
									<Text style={styles.date}>
										{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
									</Text>
								)}
							</View>
						))}
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						<Text>Generated from portfolio website • {new Date().toLocaleDateString()}</Text>
					</View>
				</Page>
			)}
		</Document>
	);
};
