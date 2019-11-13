<template>
  <div class="components-container">
    <pan-thumb :image="postForm.headurl" />
    <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      Change Avatar
    </el-button>
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      field="file"
      :width="300"
      :height="300"
      :url="actionUrl"
      :headers="headers"
      :lang-type="headers.languageToken"
      @close="close"
      @crop-upload-success="cropSuccess"
    />

    <el-button type="primary" style="position: absolute;bottom: -100px;" @click="onSave()">{{ $t('status.save') }}</el-button>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { getLanguage, getToken } from '@/utils/auth'
import { getInfo, updateHeadUrl } from '@/api/user'
const defaultConfig = require('@/api/globalconfig.js')
const defaultForm = {
  headurl: ''
}
export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      actionUrl: defaultConfig.baseURL + 'uploadOne',
      postForm: Object.assign({}, defaultForm),
      headers: {
        'languageToken': getLanguage(),
        'sanxinToken': getToken()
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.postForm.headurl = resData
    },
    getData() {
      getInfo().then(response => {
        this.postForm = response.data
      })
    },
    onSave() {
      updateHeadUrl(this.postForm).then(response => {
        if (response.status) {
          this.$message({ message: response.msg, type: 'success' })
        } else {
          this.$message({ message: response.msg, type: 'error' })
        }
      })
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

