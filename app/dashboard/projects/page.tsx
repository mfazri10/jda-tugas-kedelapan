import { prisma } from "@/app/lib/prisma";

export default async function ProjectsPage() {
  // Fetch projects from database
  const projects = await prisma.project.findMany();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
