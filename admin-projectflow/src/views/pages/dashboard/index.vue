<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="stat">
        <h2>Users</h2>
        <p>{{ userCount }}</p>
      </div>
      <div class="stat">
        <h2>Projects</h2>
        <p>{{ projectCount }}</p>
      </div>
      <div class="stat">
        <h2>Tasks</h2>
        <p>{{ taskCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCount: 0,
      projectCount: 0,
      taskCount: 0,
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      this.userCount = 100;
      this.projectCount = 50;
      this.taskCount = 200;
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats {
  display: flex;
  justify-content: space-around;
}

.stat {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat h2 {
  margin-bottom: 10px;
}

.stat p {
  font-size: 24px;
  font-weight: bold;
}
</style>