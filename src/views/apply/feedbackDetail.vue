<template>
  <div class="app-container">
    <div class="form-box">
      <el-form ref="form" :model="postForm" label-width="150px">
        <el-form-item :label="$t('feedback.bussinessName')">
          <span>{{ postForm.bussinessName }}</span>
        </el-form-item>
        <el-form-item :label="$t('feedback.realName')">
          <span>{{ postForm.realName }}</span>
        </el-form-item>
        <el-form-item :label="$t('feedback.content')">
          <span>{{ postForm.content }}</span>
        </el-form-item>
        <el-form-item :label="$t('feedback.backUrl')" style="margin-bottom: 20px;">
          <img :src="postForm.backUrl" width="165" height="110" class="head_pic">
        </el-form-item>
        <el-form-item :label="$t('feedback.statusName')">
          <el-tag v-if="postForm.status === 1" type="primary" size="small">{{ $t('status.apply') }}</el-tag>
          <el-tag v-if="postForm.status === 2" type="success" size="small">{{ $t('status.success') }}</el-tag>
          <el-tag v-if="postForm.status === 3" type="danger" size="small">{{ $t('status.fail') }}</el-tag>
        </el-form-item>
        <el-form-item :label="$t('feedback.createTime')">
          <span>{{ postForm.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
        <el-form-item v-if="postForm.status == 1">
          <el-button type="primary" @click="onSubmit(2)">{{ $t('status.pass') }}</el-button>
          <el-button type="danger" @click="onSubmit(3)">{{ $t('status.fail') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { handleFeedbackStatus, getFeedbackDetail } from '@/api/apply'

const defaultForm = {
  nickName: '', // 姓名
  phone: '', // 联系方式
  address: '', // 地区
  addressDetail: '', // 详细地址
  companyName: '', // 公司名称
  licenseCode: '', // 营业执照号
  licenseImg: '', // 营业执照地址
  companyImg: '', // 公司照片地址
  status: '', // 申请状态
  createTime: undefined,
  checkTime: undefined
}
export default {
  name: 'FeedbackDetail',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getData(this.id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData() {
      const query = {
        id: this.id
      }
      getFeedbackDetail(query).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit(status) {
      console.log(this.id)
      const query = {
        id: this.id,
        status: status
      }
      this.listLoading = true
      handleFeedbackStatus(query).then(response => {
        if (response.status) {
          this.$message({
            message: response.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        this.getData()
      })
    }
  }
}
</script>
