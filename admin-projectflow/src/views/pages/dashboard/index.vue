<template>
  <!-- Page Top Heading -->
  <section class="top-heading-bar">
    <div class="main-heading">
      <div class="container-fluid">
        <h1>Dashboard</h1>
      </div>
    </div>
  </section>
  <div class="container-fluid">
    <p>model</p>
    <el-button class="btn btn-primary" @click="showdialogVisible"
      >click to open the Dialog</el-button
    >
    <el-dialog title="Tips" v-model="dialogVisible" class="custom-dialog">
      <span>This is a message</span>
      <div class="text-center">
        <el-button class="btn btn-secondary" @click="closedialogVisible"
          >Cancel</el-button
        >
        <el-button class="btn btn-primary" @click="closedialogVisible"
          >Submit</el-button
        >
      </div>
    </el-dialog>
    <el-divider />
    <p>TextEditor</p>
    <TinyMCE ref="editor" />
  </div>
</template>
<script>
import TinyMCE from "@/components/Tinymce/Index.vue";
export default {
  components: {
    TinyMCE,
  },
  data() {
    return {
      pageTitle: "Dashboard",
      dialogVisible: false,
      description: "",
    };
  },
  methods: {
    showdialogVisible() {
      this.dialogVisible = true;
    },
    closedialogVisible() {
      this.dialogVisible = false;
    },
  },
};
</script>
