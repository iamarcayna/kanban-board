<template>
  <li
    @mouseleave="closeOption()"
    class="border border-amber-800 px-4 pb-4 pt-5 rounded-md hover:bg-amber-100 transition-all group"
  >
    <div class="flex justify-between relative">
      <p class="text-amber-800 font-bold text-lg line-clamp-2 w-[95%]">
        {{ item.name }}
      </p>
      <button
        @click="openOption"
        class="-translate-y-1/3 translate-x-1/3 group-hover:block hidden"
      >
        <img src="@/assets/images/dots.svg" class="h-7 aspect-square" />
      </button>
      <div
        v-if="toggleOpen"
        class="absolute top-0 right-0 w-[150px] bg-amber-200 shadow-md rounded-md translate-y-5 flex flex-col gap-2 p-2 text-amber-800"
      >
        <button
          @click="closeOption('edit')"
          class="py-2 px-3 rounded-md hover:bg-amber-400/50 transition-all"
        >
          Edit
        </button>
        <button
          @click="closeOption('delete')"
          class="py-2 px-3 rounded-md hover:bg-amber-400/50 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
    <hr class="border-0 border-b border-b-amber-800 my-2" />
    <p v-if="item.description" class="text-amber-900 line-clamp-4">
      {{ item.description }}
    </p>
    <p class="text-end mt-4 text-sm text-amber-900 font-semibold">
      {{ formattedDate }}
    </p>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from "@/types/Task";
import { useDateFormatter } from "@/composables/useDateFormatter";
import { ref ,computed } from "vue";

const toggleOpen = ref(false);

const dateFormatter = useDateFormatter()

const formattedDate = computed(() => {
  return dateFormatter.format(props.item.createdAt)
})

const openOption = () => {
  toggleOpen.value = true;
};

const closeOption = (action?: string) => {
  if (action) {
    if (action === "edit") {
      emits("edit", props.item.id);
    } else {
      emits("delete", props.item.id);
    }
  }
  toggleOpen.value = false;
};

const emits = defineEmits<{
  edit: [value: string];
  delete: [value: string];
}>();

const props = defineProps<{
  item: Task;
}>();
</script>
