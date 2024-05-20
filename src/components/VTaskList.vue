<template>
  <section class="flex flex-col">
    <div
      class="flex items-center bg-amber-800 border-amber-700 border rounded-md gap-2 p-1"
    >
      <button @click="openModal" class="p-1">
        <img src="@/assets/images/add.svg" class="h-12 aspect-square" />
      </button>
      <p class="text-xl font-bold text-amber-100">
        {{ title }}
      </p>
    </div>
    <ul
      v-if="tasks.length !== 0"
      class="flex flex-col gap-4 my-5 overflow-y-scroll h-0 flex-1 p-3"
    >
      <VTaskListItem
        @edit="editTask"
        @delete="(id) => emits('delete', id)"
        v-for="task in tasks"
        :item="task"
        :key="task.id"
      />
    </ul>
    <Teleport to="body">
      <VTaskModal
        v-if="isModalOpen"
        :action="modalAction"
        @close="closeModal"
        v-model="taskModalData"
      />
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import type { Task, FormData } from "@/types/Task";
import VTaskListItem from "@/components/VTaskListItem.vue";
import VTaskModal from "@/components/VTaskModal.vue";
import { onMounted, ref } from "vue";

const isModalOpen = ref(false);
const modalAction = ref<"Edit" | "Create">("Create");
const itemToEdit = ref<string>("");

const openModal = () => {
  modalAction.value = "Create";
  taskModalData.value.name = "";
  taskModalData.value.description = "";
  taskModalData.value.status = props.title;
  isModalOpen.value = true;
};

const closeModal = (data: { isSubmit: boolean; action: "Edit" | "Create" }) => {
  if (data.isSubmit) {
    emits("formSubmit", {
      data: taskModalData.value,
      action: data.action,
      id: itemToEdit.value !== "" ? itemToEdit.value : undefined,
    });
  }
  isModalOpen.value = false;
};

const editTask = (id: string) => {
  const taskToEdit = props.tasks.find((t) => t.id === id);
  if (taskToEdit) {
    itemToEdit.value = id;
    taskModalData.value.name = taskToEdit.name;
    taskModalData.value.description = taskToEdit.description
      ? taskToEdit.description
      : "";
    taskModalData.value.status = taskToEdit.status;
    modalAction.value = "Edit";
    isModalOpen.value = true;
  }
};

const taskModalData = ref<FormData>({
  name: "",
  description: "",
  status: "",
});

interface TaskListProps {
  title: "TODO" | "IN PROGRESS" | "DONE";
  tasks: Task[];
}

const props = defineProps<TaskListProps>();

const emits = defineEmits<{
  formSubmit: [
    value: { data: FormData; action: "Edit" | "Create"; id?: string }
  ];
  delete: [value: string];
}>();

onMounted(() => {
  taskModalData.value.status = props.title;
});
</script>
