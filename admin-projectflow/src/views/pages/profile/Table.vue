<template>
    <div>
        <table class="table bg-white yt-carousel-table">
            <thead class="table-header">
                <tr>
                    <th scope="col">Youtube logo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">URL</th>
                    <th scope="col" class="created-date">Created date</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <draggable tag="tbody" v-model="list" class="table-body">
                <transition-group>
                    <tr v-for="element in list" :key="element.id">
                        <td>
                            <img src="@/assets/images/white-col-house.jpeg" class="table-img">
                        </td>
                        <td>{{ element.name }}</td>
                        <td>{{ element.title }}</td>
                        <td>{{ element.description }}</td>
                        <td>{{ element.url }}</td>
                        <td class="created-date">{{ element.createdDate }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <router-link class="me-2">
                                    <el-button size="small" class="btn btn-primary me-2">
                                        <el-icon>
                                            <EditPen />
                                        </el-icon>
                                    </el-button>
                                </router-link>
                                <el-button size="small" class="btn btn-primary">
                                    <i class="mdi mdi-delete" />
                                </el-button>
                            </div>
                        </td>
                    </tr>
                </transition-group>
            </draggable>
        </table>
    </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { defineComponent } from 'vue'
import { EditPen } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'DraggableList',
  components: {
    draggable: VueDraggableNext,
    EditPen
  },
  data() {
    return {
      enabled: true,
      list: [
        { id: 1, name: 'Teresa Kinney', title: 'CEO Miami Realtors second line new test', description: 'Its something that Miami Realtors was looking for years ', url: 'https://youtube.com/embed/VEAEe41oWo4', createdDate: '26/11/2011', actions: '' },
        { id: 2, name: 'Gotty', title: 'The beautiful Sky ', description: 'Its something for years ', url: 'https://youtube.com/fgfgyuembed/VEAEe41oWo4', createdDate: '26/6/2011', actions: '' },
        { id: 3, name: 'Kim', title: 'The great son', description: 'Miami Realtors was looking for years ', url: 'https://youtube.com/ghxembed/VEAEe4', createdDate: '16/11/2011', actions: '' }
      ],
      dragging: false
    }
  }
})
</script>
