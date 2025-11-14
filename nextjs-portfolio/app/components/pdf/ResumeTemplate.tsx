import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View
} from '@react-pdf/renderer';
import React from 'react';

// Register fonts if needed (optional - PDF will use default fonts)
// Font.register({ family: 'Roboto', src: 'path-to-roboto.ttf' });

// Define styles matching your website's design
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#212121', // Dark background matching --background
    color: '#ededed', // Light text matching --foreground
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottom: '2 solid #00ff7f', // Green accent matching --accent (approximation)
    paddingBottom: 15,
    alignItems: 'center',
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
    borderStyle: 'solid',
    borderColor: '#00ff7f',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff7f', // Bright green accent
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    color: '#ededed',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    color: '#b0b0b0',
    marginTop: 5,
  },
  section: {
    marginTop: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00ff7f', // Green accent
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  aboutText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#ededed',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ededed',
  },
  role: {
    fontSize: 11,
    color: '#00ff7f',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#b0b0b0',
  },
  description: {
    fontSize: 9,
    color: '#d0d0d0',
    lineHeight: 1.3,
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  skillCategory: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#00ff7f',
    marginRight: 6,
  },
  skillsList: {
    fontSize: 9,
    color: '#d0d0d0',
  },
  projectItem: {
    marginBottom: 6,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ededed',
    marginBottom: 1,
  },
  projectDescription: {
    fontSize: 8,
    color: '#d0d0d0',
    lineHeight: 1.3,
    marginBottom: 2,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 1,
  },
  projectTag: {
    fontSize: 7,
    color: '#00ff7f',
    backgroundColor: '#1a3a2a',
    padding: '1 4',
    marginRight: 3,
    marginBottom: 2,
    borderRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#808080',
    fontSize: 8,
    borderTop: '1 solid #3a3a3a',
    paddingTop: 10,
  },
});

interface ResumeData {
  name: string;
  title: string;
  email: string;
  bio: string;
  workExperiences: any[];
  techStacks: any[];
  projects: any[];
}

// Helper function to convert Portable Text to plain text
const portableTextToPlain = (blocks: any[]): string => {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join(' ');
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ResumeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { name, title, email, bio, workExperiences, techStacks, projects } = data;

  // Group tech stacks by category
  const groupedTechStacks = techStacks.reduce((acc, tech) => {
    const category = tech.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, any[]>);

  // Category display names
  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    'devops-tools': 'DevOps & Tools',
    mobile: 'Mobile',
    other: 'Other',
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            src="./public/profile.jpg"
            style={styles.profileImage}
          />
          <View style={styles.headerContent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.contactInfo}>Email: {email}</Text>
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
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </Text>
              </View>
              <Text style={styles.description}>
                {portableTextToPlain(exp.description)}
              </Text>
            </View>
          ))}
        </View>

        {/* Technical Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {Object.entries(groupedTechStacks).map(([category, techs]) => (
            <View key={category} style={styles.skillsContainer}>
              <Text style={styles.skillCategory}>
                {categoryNames[category] || category}:
              </Text>
              <Text style={styles.skillsList}>
                {(techs as any[]).map((tech: any) => tech.name).join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{project.title}</Text>
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
    </Document>
  );
};
