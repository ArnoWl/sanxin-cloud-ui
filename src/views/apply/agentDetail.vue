<template>
  <div class="app-container">
    <div class="form-box">
      <el-form ref="form" :model="postForm" label-width="150px">
        <el-form-item :label="$t('advert.nickName')">
          <span>{{ postForm.realName }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.phone')">
          <span>{{ postForm.phone }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.address')">
          <span>{{ postForm.address }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.addressDetail')">
          <span>{{ postForm.addressDetail }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.companyName')">
          <span>{{ postForm.companyName }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.licenseCode')">
          <span>{{ postForm.licenseCode }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.licenseImg')" style="margin-bottom: 20px;">
          <img :src="postForm.licenseImg" width="165" height="110" class="head_pic">
        </el-form-item>
        <el-form-item :label="$t('advert.companyImg')" style="margin-bottom: 20px;">
          <img :src="postForm.companyImg" width="165" height="110" class="head_pic">
        </el-form-item>
        <el-form-item :label="$t('advert.statusName')">
          <el-button v-if="postForm.status === 1" type="primary" size="small">{{ $t('status.apply') }}</el-button>
          <el-button v-if="postForm.status === 2" type="success" size="small">{{ $t('status.success') }}</el-button>
          <el-button v-if="postForm.status === 3" type="danger" size="small">{{ $t('status.fail') }}</el-button>
        </el-form-item>
        <el-form-item :label="$t('advert.createTime')">
          <span>{{ postForm.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
        <el-form-item :label="$t('advert.checkTime')">
          <span v-if="postForm.status != 1">{{ postForm.checkTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
        <el-form-item v-if="postForm.status == 1">
          <el-button type="primary" @click="handleAddPass(2)">{{ $t('status.pass') }}</el-button>
          <el-button type="danger" @click="onSubmit(3)">{{ $t('status.fail') }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="postForm" label-width="80px" label-position="left">
        <el-form-item :label="$t('agent.pass')">
          <el-input v-model="postForm.passWord" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('status.cancel') }}
        </el-button>
        <el-button type="primary" @click="onSubmit(2)">
          {{ $t('status.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { handleAgentStatus, getAgentDetail } from '@/api/apply'

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
  checkTime: undefined,
  passWord: ''
}
export default {
  name: 'AdvertDetail',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0,
      dialogVisible: false
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
      getAgentDetail(query).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleAddPass() {
      this.dialogVisible = true
    },
    onSubmit(status) {
      const query = {
        id: this.id,
        status: status,
        passWord: this.postForm.passWord
      }
      this.listLoading = true
      handleAgentStatus(query).then(response => {
        if (response.status) {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          this.dialogVisible = false
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
