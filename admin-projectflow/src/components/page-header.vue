<template>

  <!-- start page title -->
<div class="row">
  <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 class="mb-sm-0">{{ title }}</h4>
      </div>
  </div>
</div>
<!-- end page title -->
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
