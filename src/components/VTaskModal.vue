<template>
  <div
    @click.self.stop="emits('close', { isSubmit: false, action: props.action })"
    @keyup="escapePressed"
    class="fixed inset-0 bg-slate-900/50 top-0 left-0 flex items-center justify-center z-50"
  >
    <form
      @submit.prevent="validateInputs"
      class="flex flex-col gap-3 w-[600px] p-6 bg-amber-800 rounded-md"
    >
      <p class="text-3xl font-bold text-amber-50 my-1">{{ action }} Task</p>
      <div>
        <label class="text-sm text-amber-50 font-semibold block my-1">
          Name<span class="text-amber-400 text-xs">
            ( {{ inputChars.name }}/ 250 )</span
          >
        </label>
        <input
          required
          v-model.trim="model.name"
          class="w-full py-3 px-5 rounded-md outline-none border-2 font-semibold border-amber-400 focus:border-amber-500 hover:border-amber-500 bg-amber-100 text-amber-900"
          type="text"
          name="name"
          ref="nameInput"
        />
      </div>
      <div>
        <label class="text-sm text-amber-50 font-semibold block my-1"
          >Description<span class="text-amber-400 text-xs">
            ( {{ inputChars.description }}/ 1000 )</span
          ></label
        >
        <textarea
          v-model.trim="model.description"
          class="w-full py-3 px-5 rounded-md outline-none border-2 font-semibold max-h-[25vh] min-h-[25vh] border-amber-400 focus:border-amber-500 hover:border-amber-500 bg-amber-100 text-amber-900"
          name="description"
        ></textarea>
      </div>
      <div>
        <label class="text-sm text-amber-50 font-semibold block my-1"
          >Status</label
        >
        <select
          v-model="model.status"
          required
          class="w-full py-[13px] px-5 rounded-md outline-none border-2 font-semibold border-amber-400 focus:border-amber-500 hover:border-amber-500 bg-amber-100 text-amber-900"
        >
          <option value="TODO">Todo</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div class="flex items-center justify-end gap-5 mt-5">
        <button
          @click="emits('close', { isSubmit: false, action: props.action })"
          type="button"
          class="py-3 px-7 transition-all bg-amber-950/50 hover:bg-amber-950 text-amber-50 rounded-md font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="py-3 px-7 bg-amber-500 rounded-md text-amber-50 font-semibold"
        >
          {{ action === "Create" ? "Add" : "Update" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { FormData } from "@/types/Task";

const escapePressed = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emits("close", { isSubmit: false, action: props.action });
  }
};

const inputChars = computed<{ name: number; description: number }>(() => {
  return {
    name: model.value.name.length,
    description: model.value.description.length,
  };
});

const validateInputs = () => {
  if (inputChars.value.name > 250 || inputChars.value.description > 1000)
    return;

  emits("close", { isSubmit: true, action: props.action });
};

const nameInput = ref<HTMLInputElement | null>(null);

const model = defineModel<FormData>({
  default: { name: "", description: "", status: "" },
});

const props = defineProps<{
  action: "Edit" | "Create";
}>();

const emits = defineEmits<{
  close: [value: { isSubmit: boolean; action: "Edit" | "Create" }];
}>();

onMounted(() => {
  if (nameInput.value) {
    nameInput.value.focus();
  }
});
</script>
