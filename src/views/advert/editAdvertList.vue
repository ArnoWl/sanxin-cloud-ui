<template>
  <div class="app-container">
    <el-form ref="dataForm" :model="postForm" :rules="rules" label-width="150px">
      <div class="app-container">
        <div class="form-box">
          <el-form-item :label="$t('advert.eventName')" prop="eventName">
            <el-select v-model="postForm.event" :placeholder="$t('advert.eventName')" class="filter-item">
              <el-option
                v-for="item in eventType"
                :key="item.url"
                :label="item.url"
                :value="item.url"
              >
                <span>{{ item.url }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="postForm.event === 'externalLink'" :label="$t('advert.url')" prop="url">
            <el-input v-model="postForm.url" />
          </el-form-item>
          <el-form-item :label="$t('advert.eventName')" prop="eventName">
            <el-select v-model="postForm.type" class="filter-item" placeholder="Please select">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('advert.frameImg')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              name="file"
              :show-file-list="false"
              :on-success="handleImgSuccess"
              :headers="headers"
            >
              <img v-if="postForm.img" :src="postForm.img" class="avatar-img">
              <i v-else class="el-icon-plus avatar-uploader-img" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('advert.sort')" prop="sort">
            <el-input v-model="postForm.sort" type="number" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave()">{{ $t('status.save') }}</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getAdvertFindDetail, queryEventType, handleEditAdvertFind } from '@/api/advert'
import { getLanguage, getToken } from '@/utils/auth'
const defaultConfig = require('@/api/globalconfig.js')
const defaultForm = {
}
export default {
  name: 'AdvertDetail',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      typeList: [
        {
          id: 0,
          name: 'transverse'
        },
        {
          id: 1,
          name: 'portrait'
        }
      ],
      loading: false,
      id: 0,
      param: {}, // 表单要提交的数据
      eventType: {},
      dataForm: {
        cnTitle: '',
        enTitle: '',
        thaiTitle: '',
        cnContent: '',
        enContent: '',
        thaiContent: '',
        url: ''
      },
      headers: {
        'languageToken': getLanguage(),
        'sanxinToken': getToken()
      },
      actionUrl: defaultConfig.baseURL + 'uploadOne',
      rules: {
        cnTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 20, message: '最多输入20位字符', trigger: 'blur' }
        ],
        enTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 20, message: '最多输入20位字符', trigger: 'blur' }
        ],
        thaiTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 0, max: 20, message: '最多输入20位字符', trigger: 'blur' }
        ],
        cnContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 100, message: '最多输入100位字符', trigger: 'blur' }
        ],
        enContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 100, message: '最多输入100位字符', trigger: 'blur' }
        ],
        thaiContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 0, max: 100, message: '最多输入100位字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入链接', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    if (this.id !== '-1') {
      this.getData(this.id)
    } else {
      this.id = null
    }
    this.getTypeValue()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData() {
      const query = {
        id: this.id
      }
      getAdvertFindDetail(query).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    getTypeValue() {
      queryEventType().then(response => {
        this.eventType = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleRemove(file, fileList) {
      this.coverUrlList = fileList
    },
    handleImgSuccess(res, file) {
      this.postForm.img = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onSave() {
      this.postForm.createTime = null
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          handleEditAdvertFind(this.postForm).then(response => {
            if (response.status) {
              this.$message({
                message: response.msg,
                type: 'success'
              })
              this.getData()
            } else {
              this.$message({
                message: response.msg,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-frame {
    font-size: 28px;
    color: #8c939d;
    width: 345px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar-frame {
    width: 345px;
    height: 150px;
    display: block;
  }
  .avatar-uploader-img {
    font-size: 28px;
    color: #8c939d;
    width: 266px;
    height: 342px;
    line-height: 342px;
    text-align: center;
  }
  .avatar-img {
    width: 266px;
    height: 342px;
    display: block;
  }
</style>
