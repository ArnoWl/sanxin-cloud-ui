<template>
  <div class="app-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="150px">
      <el-tabs v-model="activeName" class="elTab">
        <el-tab-pane :label="$t('business.baseMsg')" name="directly">
          <div class="app-container">
            <div class="form-box">
              <el-form-item :label="$t('advert.nickName')" prop="nickName">
                <el-input v-model="postForm.nickName" />
              </el-form-item>
              <el-form-item :label="$t('advert.phone')" prop="phone">
                <el-input v-model="postForm.phone" />
              </el-form-item>
              <el-form-item :label="$t('advert.address')">
                <el-input v-model="postForm.address" />
              </el-form-item>
              <el-form-item :label="$t('advert.addressDetail')" prop="addressDetail">
                <el-input v-model="postForm.addressDetail" />
              </el-form-item>
              <el-form-item :label="$t('advert.companyName')" prop="companyName">
                <el-input v-model="postForm.companyName" />
              </el-form-item>
              <el-form-item :label="$t('advert.licenseCode')" prop="licenseCode">
                <el-input v-model="postForm.licenseCode" />
              </el-form-item>
              <el-form-item :label="$t('advert.statusName')">
                <el-tag v-if="postForm.status === 1" type="info" size="small">{{ $t('status.apply') }}</el-tag>
                <el-tag v-if="postForm.status === 2" type="success" size="small">{{ $t('status.success') }}</el-tag>
                <el-tag v-if="postForm.status === 3" type="danger" size="small">{{ $t('status.fail') }}</el-tag>
              </el-form-item>
              <el-form-item :label="$t('advert.createTime')">
                <span>{{ postForm.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('business.businessMsg')" name="v-directive">
          <el-form-item :label="$t('business.cardType')">
            <el-radio-group v-model="postForm.cardType" size="small">
              <el-radio label="1" border>身份证</el-radio>
              <el-radio label="2" border>护照</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row v-if="postForm.cardType == 1" :span="12">
            <el-col :span="6">
              <el-form-item :label="$t('business.cardFront')" :inline-message="true" style="margin-bottom: 20px;">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleCardFrontSuccess"
                  :before-upload="beforeUpload"
                >
                  <img v-if="postForm.cardFront" :src="postForm.cardFront" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('business.cardBack')" style="margin-bottom: 20px;">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleCardBackSuccess"
                  :before-upload="beforeUpload"
                >
                  <img v-if="postForm.cardBack" :src="postForm.cardBack" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else-if="postForm.cardType == 2">
            <el-form-item :label="$t('business.passPort')" :inline-message="true" style="margin-bottom: 20px;">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handlePassPortSuccess"
                :before-upload="beforeUpload"
              >
                <img v-if="postForm.cardFront" :src="postForm.cardFront" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-row>
          <el-form-item :label="$t('advert.licenseImg')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleLicenseSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="postForm.licenseImg" :src="postForm.licenseImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('advert.companyImg')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleCompanySuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="postForm.companyImg" :src="postForm.companyImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item v-if="postForm.status == 1">
        <el-button type="primary" @click="onSubmit(2)">{{ $t('status.pass') }}</el-button>
        <el-button type="danger" @click="onSubmit(3)">{{ $t('status.fail') }}</el-button>
      </el-form-item>
      <el-form-item v-if="postForm.status == 2">
        <el-button type="primary" @click="onSave('form')">{{ $t('status.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { handleBusinessStatus, getBusinessDetail, handleEditBusiness } from '@/api/apply'
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
  name: 'AdvertDetail',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入姓名'))
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入联系方式'))
      }
    }
    var checkAddressDetail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入详细地址'))
      }
    }
    var checkCompanyName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入公司名称'))
      }
    }
    var checkLicenseCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入营业执照号'))
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0,
      activeName: 'directly',
      param: {}, // 表单要提交的数据
      ruleForm: {
        nickName: '',
        phone: '',
        companyName: '',
        licenseCode: ''
      },
      rules: {
        nickName: [{ validator: checkName, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        addressDetail: [{ validator: checkAddressDetail, trigger: 'blur' }],
        companyName: [{ validator: checkCompanyName, trigger: 'blur' }],
        licenseCode: [{ validator: checkLicenseCode, trigger: 'blur' }]
      }
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
      getBusinessDetail(query).then(response => {
        this.postForm = response.data
        this.postForm.cardType = response.data.cardType.toString()
      }).catch(err => {
        console.log(err)
      })
    },
    handleCardFrontSuccess(res, file) {
      this.postForm.card = URL.createObjectURL(file.raw)
    },
    handleCardBackSuccess(res, file) {
      this.postForm.card = URL.createObjectURL(file.raw)
    },
    handleLicenseSuccess(res, file) {
      this.postForm.licenseImg = URL.createObjectURL(file.raw)
    },
    handleCompanySuccess(res, file) {
      this.postForm.licenseImg = URL.createObjectURL(file.raw)
    },
    handlePassPortSuccess(res, file) {
      this.postForm.passPort = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onSubmit(status) {
      const query = {
        id: this.id,
        status: status
      }
      this.listLoading = true
      handleBusinessStatus(query).then(response => {
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
    },
    onSave(formName) {
      // 下面append的东西就会到form表单数据的fields中；
      // this.param.append('message', formName)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.postForm.createTime = null
      this.postForm.checkTime = null
      // 然后通过下面的方式把内容通过axios来传到后台
      handleEditBusiness(this.postForm, config).then(response => {
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
