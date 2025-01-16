<template>
  <el-input
    type="textarea"
    v-model="localValue"
    placeholder="Type @ to mention a member"
    @input="onInput"
    @keydown.native="onKeydown"
    ref="editor"
    rows="4"
  >
    <el-dropdown
      v-if="dropdownVisible"
      ref="dropdown"
      :visible.sync="dropdownVisible"
      trigger="manual"
    >
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="member in filteredMembers"
          :key="member.id"
          @click.native="mentionMember(member)"
        >
          {{ member.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-input>
</template>

<script>
export default {
  props: {
    value: String,
    members: Array,
  },
  data() {
    return {
      localValue: this.value,
      dropdownVisible: false,
      filteredMembers: [],
      mentionTrigger: false,
      query: "",
    };
  },
  watch: {
    localValue(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    onInput(value) {
      const mentionMatch = /@(\w*)$/.exec(value);
      if (mentionMatch) {
        this.query = mentionMatch[1];
        this.filteredMembers = this.members.filter((member) =>
          member.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.dropdownVisible = this.filteredMembers.length > 0;
      } else {
        this.dropdownVisible = false;
      }
    },
    mentionMember(member) {
      const mentionText = `@${member.name} `;
      this.localValue = this.localValue.replace(/@\w*$/, mentionText);
      this.dropdownVisible = false;
    },
    onKeydown(event) {
      if (event.key === "Escape") {
        this.dropdownVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.el-dropdown-menu {
  position: absolute;
  z-index: 999;
}
</style>
