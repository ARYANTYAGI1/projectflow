<template>
    <img class="el-upload-list__item-thumbnail" :src="getFileThumbnail(file)" alt="" />
</template>

<script>
import ExcelImage from '@/assets/images/excel.png'
import PdfImage from '@/assets/images/pdf.png'
import DocsImage from '@/assets/images/docs.png'
export default {
  props: {
    file: Object
  },
  methods: {
    getFileThumbnail(file) {
      if (file && file.raw) {
        if (file.raw.type === 'application/pdf') {
          return PdfImage
        } else if (file.raw.type === 'text/csv') {
          return ExcelImage
        } else if (
          file.raw.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                    file.raw.type === 'application/msword'
        ) {
          return DocsImage
        }
      }
      return file.url
    }

  }
}
</script>
