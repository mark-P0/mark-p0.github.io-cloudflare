import { FiCode, FiExternalLink } from "solid-icons/fi";
import { createEffect, createSignal, For, Show } from "solid-js";
import z from "zod";
import { envPublic } from "../../core/env-public.ts";
import { LoadingIndicator } from "./LoadingIndicator.tsx";
import { TagIconMap } from "./TagIcons.tsx";

export type Project = z.infer<typeof ProjectSchema>;

const ProjectSchema = z.object({
	description: z.string(),
	livePreview: z.string().optional(),
	name: z.string(),
	screenshot: z.string(),
	sourceCode: z.string(),
	tags: z.string().array().optional(),
});
const ProjectRecordSchema = z.record(z.string(), ProjectSchema);

async function getProjects() {
	const res = await fetch(envPublic.PUBLIC_PROJECTS_JSON_DATA_LINK);
	const body = await res.json();

	const projectRecord = ProjectRecordSchema.parse(body);
	const projects = Object.values(projectRecord);

	return projects;
}

function* mapTagsToIcons(project: Project) {
	const { tags, name } = project;

	if (tags === undefined) {
		console.warn(`Project "${name}" has no tags`, project);
		return;
	}

	for (const tag of tags) {
		if (!TagIconMap.has(tag)) {
			console.warn(`Tag "${tag}" not mapped?`, project);
			continue;
		}

		const icon = TagIconMap.get(tag)!;
		yield [tag, icon] as const;
	}
}

export function ProjectCard(p: { project: Project }) {
	const icons = () => [...mapTagsToIcons(p.project)];

	return (
		<figure class="group/card h-full rounded-lg overflow-hidden grid grid-rows-[auto_1fr] shadow-lg">
			<div class="relative overflow-hidden aspect-[21/9]">
				<img
					src={p.project.screenshot}
					alt={`A screenshot of the app ${p.project.name}`}
					class="absolute top-0 group-hover/card:-top-[30%] transition-[top] duration-1000 ease-out"
				/>
				<div class="absolute w-full h-full bg-primary/75 group-hover/card:bg-transparent duration-500"></div>
			</div>

			<figcaption class="flex flex-col bg-white border-primary border-2 border-t-0 border-l-0 rounded-lg rounded-tr-none p-5">
				<header class="mb-2 flex flex-wrap items-center gap-x-4">
					<h2 class="font-title font-extrabold text-3xl">{p.project.name}</h2>
					<ul class="flex gap-2">
						<For each={icons()}>
							{([tag, Icon]) => (
								<li>
									<Icon class="w-4 h-4" title={tag} />
								</li>
							)}
						</For>
					</ul>
				</header>

				<p class="mb-6">{p.project.description}</p>

				<ul class="-mr-2 -mb-2 mt-auto flex flex-row-reverse">
					<Show when={p.project.livePreview !== undefined}>
						<li>
							<a
								href={p.project.livePreview}
								target="_blank"
								class="block p-2 rounded transition hover:bg-primary hover:text-white active:scale-90"
							>
								<FiExternalLink class="w-6 h-6" />
								<span class="sr-only">
									Go to live preview of "{p.project.name}"
								</span>
							</a>
						</li>
					</Show>
					<li>
						<a
							href={p.project.sourceCode}
							target="_blank"
							class="block p-2 rounded transition hover:bg-primary hover:text-white active:scale-90"
						>
							<FiCode class="w-6 h-6" />
							<span class="sr-only">
								Read source code for "{p.project.name}"
							</span>
						</a>
					</li>
				</ul>
			</figcaption>
		</figure>
	);
}

export function ProjectList() {
	const [projects, setProjects] = createSignal<Project[] | null>(null);
	createEffect(() => {
		async function initializeProjects() {
			const projects = await getProjects();
			setProjects(projects);
		}
		initializeProjects();
	});

	const last6Projects = () => projects()?.slice(-6).reverse() ?? null;

	const Fallback = (
		<div class="grid place-items-center">
			<LoadingIndicator />
		</div>
	);
	return (
		<Show when={last6Projects() !== null} fallback={Fallback}>
			<ul class="h-fit grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<For each={last6Projects()}>
					{(project) => (
						<li>
							<ProjectCard project={project} />
						</li>
					)}
				</For>
			</ul>
		</Show>
	);
}
