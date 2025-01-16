<template>
  <div class="task-view">
    <section class="task-details">
      <el-card>
        <el-form ref="taskForm" :model="taskForm" :rules="rules" label-width="auto">
          <el-row :gutter="20">
            <el-col :md="12">
              <el-form-item label="Task Title" prop="title">
                <el-input v-model="taskForm.title" />
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="Priority" prop="priority">
                <el-select v-model="taskForm.priority" placeholder="Select priority">
                  <el-option
                    v-for="priority in priorityList"
                    :key="priority"
                    :label="priority"
                    :value="priority"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :md="24">
              <el-form-item label="Description" prop="description">
                <el-input
                  v-model="taskForm.description"
                  type="textarea"
                  rows="5"
                  placeholder="Enter task description"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="d-flex justify-content-end">
            <el-button type="primary" @click="updateTask">Save</el-button>
          </div>
        </el-form>
      </el-card>
    </section>

    <section class="task-comments mt-4">
      <el-card>
        <h3>Comments</h3>
        <div v-for="comment in comments" :key="comment.id" class="comment">
          <strong>{{ comment.author }}</strong>: {{ comment.text }}
        </div>
        <mention-editor
          v-model="newComment"
          :members="membersList"
          placeholder="Add a comment..."
        />
        <div class="mt-2 d-flex justify-content-end">
          <el-button type="success" @click="addComment">Add Comment</el-button>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
import MentionEditor from "@/components/MentionEditor.vue"; // Custom mention editor component
import { getTaskDetails, updateTask, getComments, addComment } from "@/api/task";

export default {
  components: {
    MentionEditor,
  },
  data() {
    return {
      taskForm: {
        id: "",
        title: "",
        description: "",
        priority: "Medium",
      },
      priorityList: ["Low", "Medium", "High"],
      rules: {
        title: [{ required: true, message: "Title is required", trigger: "blur" }],
        priority: [{ required: true, message: "Priority is required", trigger: "change" }],
      },
      comments: [],
      newComment: "",
      membersList: [],
    };
  },
  created() {
    const taskId = this.$route.params.id;

    // Fetch task details
    getTaskDetails(taskId).then((response) => {
      this.taskForm = { ...response.data };
    });

    // Fetch comments
    getComments(taskId).then((response) => {
      this.comments = response.data;
    });

    // Fetch members
    // Assuming `getMembers` fetches project members
    getMembers().then((response) => {
      this.membersList = response.data.map((member) => ({
        id: member._id,
        name: member.name,
      }));
    });
  },
  methods: {
    updateTask() {
      updateTask(this.taskForm.id, this.taskForm)
        .then(() => {
          this.$message.success("Task updated successfully!");
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    addComment() {
      if (!this.newComment.trim()) {
        this.$message.warning("Comment cannot be empty!");
        return;
      }

      addComment(this.taskForm.id, this.newComment)
        .then((response) => {
          this.comments.push(response.data);
          this.newComment = "";
          this.$message.success("Comment added!");
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style scoped>
.task-view {
  padding: 20px;
}

.task-details,
.task-comments {
  margin-bottom: 20px;
}

.comment {
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
}
</style>
