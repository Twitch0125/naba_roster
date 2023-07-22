<script setup></script>

<template>
  <ACard
    class="max-w-lg mx-auto space-y-6 p-6 border-1 rounded shadow-lg shadow-gray/20"
  >
    <div class="a-card-body a-card-spacer">
      <ATypography title="Upload CSV"></ATypography>
      <form
        id="form"
        class=""
        action="/api/csv"
        method="POST"
        enctype="multipart/form-data"
      >
        <BaseInput id="file" type="file" label="File" name="file" />
      </form>
      <ABtn form="form" type="submit" color="primary">Upload</ABtn>
    </div>
  </ACard>
</template>

<style></style>
