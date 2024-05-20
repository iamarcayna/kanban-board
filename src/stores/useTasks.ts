import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { Task } from "@/types/Task"
import { TaskStatus } from "@/types/Task"

export const useTasks = defineStore("tasks", () => {
	const tasks = ref<Task[]>([
		  {
		    id: crypto.randomUUID(),
		    name: "Write blog post on machine learning",
		    description: "Research and draft a blog post explaining machine learning concepts in a clear and concise way.",
		    status: TaskStatus.TODO,
		    createdAt: new Date().toISOString(),
		  },
		  {
		    id: crypto.randomUUID(),
		    name: "Review design mockups for new landing page",
		    description: "Provide feedback and suggestions on the visual design and layout of the company's new landing page.",
		    status: TaskStatus.IN_PROGRESS,
		    createdAt: new Date().toISOString(),
		  },
		  {
		    id: crypto.randomUUID(),
		    name: "Schedule team meeting for project update",
		    description: "Coordinate a meeting with the project team to discuss progress, address any roadblocks, and plan next steps.",
		    status: TaskStatus.TODO,
		    createdAt: new Date().toISOString(),
		  },
		  {
		    id: crypto.randomUUID(),
		    name: "Order office supplies",
		    description: "Replenish stock of printer cartridges, paper, and other essential office supplies.",
		    status: TaskStatus.DONE,
		    createdAt: new Date().toISOString(),
		  },
		  {
		    id: crypto.randomUUID(),
		    name: "Finalize presentation for client pitch",
		    description: "Incorporate feedback and polish the presentation slides to prepare for the upcoming client meeting.",
		    status: TaskStatus.IN_PROGRESS,
		    createdAt: new Date().toISOString(),
		  },
		])

	const todoList = computed<Task[]>(() => {
	  return tasks.value.filter((t) => t.status === TaskStatus.TODO);
	});
	const inProgressList = computed<Task[]>(() => {
	  return tasks.value.filter((t) => t.status === TaskStatus.IN_PROGRESS);
	});
	const doneList = computed<Task[]>(() => {
	  return tasks.value.filter((t) => t.status === TaskStatus.DONE);
	});

	const create = (task: Task) => {
		tasks.value.push(task)
	}

	const remove = (id: string) => {
		tasks.value = [...tasks.value.filter(task => task.id !== id)]
	}

	const update = (id: string, name?: string, description?: string, status?: string) => {
		tasks.value.map(task => {
			if(task.id === id) {
				task.name = name? name : task.name;
				task.description = description? description : task.description;
				task.status = status? status : task.status
			}
			return task;
		})
	}

	const getTodosList = () => {
		return todoList
	}

	const getInProgressList = () => {
		return inProgressList
	}

	const getDoneList = () => {
		return doneList
	}

	return { 
		tasks,
		todoList,
		inProgressList,
		doneList,
		create,
		remove,
		update,
		getTodosList,
		getInProgressList,
		getDoneList
	 }
})