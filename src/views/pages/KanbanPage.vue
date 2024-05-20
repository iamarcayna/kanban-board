<template>
  <div class="flex gap-5 p-5 h-full">
    <VTaskList
      @delete="deleteTask"
      @form-submit="formSubmit"
      title="TODO"
      :tasks="todoList"
      class="flex-1 basic-[33%]"
    />
    <VTaskList
      @delete="deleteTask"
      @form-submit="formSubmit"
      title="IN PROGRESS"
      :tasks="inProgressList"
      class="flex-1 basic-[33%]"
    />
    <VTaskList
      @delete="deleteTask"
      @form-submit="formSubmit"
      title="DONE"
      :tasks="doneList"
      class="flex-1 basic-[33%]"
    />
  </div>
</template>

<script setup lang="ts">
import VTaskList from "@/components/VTaskList.vue";
import { ref, computed } from "vue";
import type { Task, FormData } from "@/types/Task";
import { TaskStatus } from "@/types/Task";
import { useTasks } from "@/stores/useTasks"

const taskStore = useTasks()
const todoList = taskStore.getTodosList()
const inProgressList = taskStore.getInProgressList()
const doneList = taskStore.getDoneList()

const deleteTask = (id: string) => {
  taskStore.remove(id)
};

const formSubmit = (formSubmit: {
  data: FormData;
  action: "Edit" | "Create";
  id?: string;
}) => {
  if (formSubmit.action === "Create") {
    const {name ,description, status} = formSubmit.data
    const task = {
      id: crypto.randomUUID(),
      name,
      description,
      status,
      createdAt: new Date().toISOString()
    }
    taskStore.create(task)
  } else if (formSubmit.action === "Edit") {
    if(formSubmit.id) {
      const {name ,description, status} = formSubmit.data
      taskStore.update(formSubmit.id,name,description,status)
    }
  }
};

</script>
