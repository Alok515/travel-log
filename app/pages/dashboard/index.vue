<script setup lang="ts">
const isSideBarOpen = ref(true);

function toggleSideBar() {
  isSideBarOpen.value = !isSideBarOpen.value;
  localStorage.setItem("isSideBarOpen", isSideBarOpen.value.toString());
}

onMounted(() => {
  isSideBarOpen.value = localStorage.getItem("isSideBarOpen") === "true";
});
</script>

<template>
  <div class="flex-1 flex">
    <div class="bg-base-100 transition-all duration-600" :class="[isSideBarOpen ? 'w-64' : 'w-16']">
      <div
        class="flex hover:cursor-pointer hover:bg-base-200 p-2"
        :class="[isSideBarOpen ? 'justify-end' : 'justify-center']"
        @click="toggleSideBar"
      >
        <icon :name="isSideBarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'" size="26" />
      </div>
      <div class="flex flex-col gap-2">
        <SidebarButton
          label="Locations"
          icon="tabler:map"
          path="/dashboard"
          :show-label="isSideBarOpen"
        />
        <SidebarButton
          label="Add Location"
          icon="tabler:circle-plus-filled"
          path="/dashboard/add"
          :show-label="isSideBarOpen"
        />
        <div class="divider" />
        <SidebarButton
          label="Sign Out"
          icon="tabler:logout-2"
          path="/dashboard/sign-out"
          :show-label="isSideBarOpen"
        />
      </div>
    </div>
    <div class="flex-1">
      Hello
    </div>
  </div>
</template>
