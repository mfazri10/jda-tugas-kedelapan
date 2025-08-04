import { prisma } from './prisma'

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string | null;
  githubUrl?: string | null;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    });
    return project;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return projects;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
}
