<script setup></script>

<template>
  <form
    id="form"
    class="font-sans max-w-lg mx-auto space-y-6 theme.surface p-6 theme.border border-1 rounded shadow-lg shadow-gray/20"
    action="/api/csv"
    method="POST"
    enctype="multipart/form-data"
  >
    <BaseInput id="file" type="file" label="File" name="file" />
    <div class="flex justify-end">
      <button class="theme.button rounded">Submit</button>
    </div>
  </form>
</template>

<style></style>
