<template>
  <div class="app-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="150px">
      <el-tabs v-model="activeName" class="elTab">
        <el-tab-pane :label="$t('business.baseMsg')" name="directly">
          <div class="app-container">
            <div class="form-box">
              <el-form-item :label="$t('business.nickName')" prop="nickName">
                <el-input v-model="postForm.nickName" />
              </el-form-item>
              <el-form-item :label="$t('business.code')" prop="code">
                <el-input v-model="postForm.code" />
              </el-form-item>
              <el-form-item :label="$t('business.scale')" prop="scale">
                <el-input v-model="postForm.scale" type="number" />
              </el-form-item>
              <el-form-item :label="$t('business.realName')" prop="realName">
                <el-input v-model="postForm.realName" />
              </el-form-item>
              <el-form-item :label="$t('advert.phone')" prop="phone">
                <el-input v-model="postForm.phone" />
              </el-form-item>
              <el-form-item :label="$t('advert.address')">
                <el-select v-model="postForm.proId" :placeholder="$t('status.proName')" filterable clearable class="filter-item" style="width: 130px" @change="proChange()">
                  <el-option v-for="item in proList" :key="item.id" :label="item.translation" :value="item.id" />
                </el-select>
                <el-select v-model="postForm.cityId" :placeholder="$t('status.cityName')" filterable clearable class="filter-item" style="width: 130px" @change="cityChange()">
                  <el-option v-for="item in cityList" :key="item.id" :label="item.translation" :value="item.id" />
                </el-select>
                <el-select v-model="postForm.areaId" :placeholder="$t('status.areaName')" filterable clearable class="filter-item" style="width: 130px">
                  <el-option v-for="item in areaList" :key="item.id" :label="item.translation" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('advert.addressDetail')" prop="addressDetail">
                <el-input v-model="postForm.addressDetail" />
              </el-form-item>
              <el-form-item :label="$t('business.lon')" prop="addressDetail">
                <el-input v-model="postForm.lonVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('business.lat')" prop="addressDetail">
                <el-input v-model="postForm.latVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('advert.companyName')" prop="companyName">
                <el-input v-model="postForm.companyName" />
              </el-form-item>
              <el-form-item :label="$t('advert.licenseCode')" prop="licenseCode">
                <el-input v-model="postForm.licenseCode" />
              </el-form-item>
              <el-form-item :label="$t('business.email')" prop="email">
                <el-input v-model="postForm.email" />
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
        <el-tab-pane :label="$t('business.businessTime')" name="timeDire">
          <div class="app-container">
            <div class="form-box">
              <el-form-item :label="$t('device.businessHours')" prop="status">
                <el-select v-model="postForm.startDay">
                  <el-option
                    v-for="item in dateList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
                <el-select v-model="postForm.endDay">
                  <el-option
                    v-for="item in dateList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  />
                </el-select>
                <el-time-picker
                  v-model="hourTime"
                  is-range
                  format="HH:mm"
                  value-format="HH:mm"
                />
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('business.businessMsg')" name="v-directive">
          <el-form-item :label="$t('business.cardType')">
            <el-radio-group v-model="postForm.cardType" size="small">
              <el-radio label="1" border>{{ $t('business.idCard') }}</el-radio>
              <el-radio label="2" border>{{ $t('business.passPort') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row v-if="postForm.cardType == 1" :span="12">
            <el-col :span="6">
              <el-form-item :label="$t('business.cardFront')" :inline-message="true" style="margin-bottom: 20px;">
                <el-upload
                  class="avatar-uploader"
                  :action="actionUrl"
                  name="file"
                  :show-file-list="false"
                  :on-success="handleCardFrontSuccess"
                  :before-upload="beforeCardFrontUpload"
                  :headers="headers"
                >
                  <img v-if="postForm.cardFront" :src="postForm.cardFront" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                  <loadingAnimation ref="cardFront" :animation-type="2" class="loadingAnimation" />
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('business.cardBack')" style="margin-bottom: 20px;">
                <el-upload
                  class="avatar-uploader"
                  :action="actionUrl"
                  name="file"
                  :show-file-list="false"
                  :on-success="handleCardBackSuccess"
                  :before-upload="beforeCardBackUpload"
                  :headers="headers"
                >
                  <img v-if="postForm.cardBack" :src="postForm.cardBack" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                  <loadingAnimation ref="cardBack" :animation-type="2" class="loadingAnimation" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else-if="postForm.cardType == 2">
            <el-form-item :label="$t('business.passPort')" :inline-message="true" style="margin-bottom: 20px;">
              <el-upload
                class="avatar-uploader"
                :action="actionUrl"
                name="file"
                :show-file-list="false"
                :on-success="handlePassPortSuccess"
                :before-upload="beforePassPortUpload"
                :headers="headers"
              >
                <img v-if="postForm.passPort" :src="postForm.passPort" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
                <loadingAnimation ref="passPort" :animation-type="2" class="loadingAnimation" />
              </el-upload>
            </el-form-item>
          </el-row>
          <el-form-item :label="$t('advert.licenseImg')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              name="file"
              :show-file-list="false"
              :on-success="handleLicenseSuccess"
              :before-upload="beforeLicenseUpload"
              :headers="headers"
            >
              <img v-if="postForm.licenseImg" :src="postForm.licenseImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <loadingAnimation ref="license" :animation-type="2" class="loadingAnimation" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('advert.companyImg')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              name="file"
              :show-file-list="false"
              :on-success="handleCompanySuccess"
              :before-upload="beforeCompanyUpload"
              :headers="headers"
            >
              <img v-if="postForm.companyImg" :src="postForm.companyImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <loadingAnimation ref="company" :animation-type="2" class="loadingAnimation" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('business.headUrl')" style="margin-bottom: 20px;">
            <el-upload
              class="avatar-uploader"
              :action="actionUrl"
              name="file"
              :show-file-list="false"
              :on-success="handleHeadUrlSuccess"
              :before-upload="beforeHeadUrlUpload"
              :headers="headers"
            >
              <img v-if="postForm.headUrl" :src="postForm.headUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <loadingAnimation ref="headUrl" :animation-type="2" class="loadingAnimation" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('business.coverUrl')">
            <el-upload
              :action="actionUrl"
              multiple
              accept="image/*"
              list-type="picture-card"
              :file-list="coverUrlList"
              :on-success="handlePictureCardPreview"
              :on-remove="handleRemove"
              :headers="headers"
            >
              <i class="el-icon-plus" />
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
import { handleBusinessStatus, getBusinessDetail, handleEditBusiness, validCode } from '@/api/apply'
import { getLanguage, getToken } from '@/utils/auth'
import { addressListByPid } from '@/api/address'
import loadingAnimation from '@/components/loading/loadingAnimation'
const defaultConfig = require('@/api/globalconfig.js')
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
  components: {
    loadingAnimation
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入姓名'))
      }
    }
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮件'))
      }
    }
    var checkNickName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入昵称'))
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
    var numberVal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入编号'))
      }
      validCode({ bid: this.postForm.id, code: value }).then(res => {
        if (res.status && res.data > 0) {
          return callback(new Error('门店编号被使用'))
        }
      })
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0,
      activeName: 'directly',
      param: {}, // 表单要提交的数据
      coverUrlList: [],
      hourTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      proList: [],
      cityList: [],
      areaList: [],
      dateList: [
        { value: 7, name: this.$t('date.sunday') },
        { value: 1, name: this.$t('date.monday') },
        { value: 2, name: this.$t('date.tuesday') },
        { value: 3, name: this.$t('date.wednesday') },
        { value: 4, name: this.$t('date.thursday') },
        { value: 5, name: this.$t('date.friday') },
        { value: 6, name: this.$t('date.saturday') }
      ],
      ruleForm: {
        realName: '',
        nickName: '',
        phone: '',
        companyName: '',
        licenseCode: ''
      },
      actionUrl: defaultConfig.baseURL + 'uploadOne',
      rules: {
        realName: [{ validator: checkName, trigger: 'blur' }],
        nickName: [{ validator: checkNickName, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        addressDetail: [{ validator: checkAddressDetail, trigger: 'blur' }],
        companyName: [{ validator: checkCompanyName, trigger: 'blur' }],
        licenseCode: [{ validator: checkLicenseCode, trigger: 'blur' }],
        code: [{ validator: numberVal, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      headers: {
        'languageToken': getLanguage(),
        'sanxinToken': getToken()
      }
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getData(this.id)
    this.tempRoute = Object.assign({}, this.$route)
    this.getProList()
    this.proChange()
    this.cityChange()
  },
  methods: {
    getData() {
      this.coverUrlList = []
      const query = {
        id: this.id
      }
      getBusinessDetail(query).then(response => {
        this.postForm = response.data
        this.postForm.cardType = response.data.cardType.toString()
        this.$set(this.hourTime, 0, this.postForm.startTime)
        this.$set(this.hourTime, 1, this.postForm.endTime)
        for (let t = 0; t < this.postForm.coverUrlList.length; t++) {
          this.coverUrlList.push({ name: this.postForm.coverUrlList[t], url: this.postForm.coverUrlList[t] })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    beforeCardFrontUpload(file) {
      this.$refs.cardFront.show()
    },
    handleCardFrontSuccess(res, file) {
      this.postForm.cardFront = file.response.data
      this.$refs.cardFront.close()
    },
    beforeCardBackUpload(file) {
      this.$refs.cardBack.show()
    },
    handleCardBackSuccess(res, file) {
      this.postForm.cardBack = file.response.data
      this.$refs.cardBack.close()
    },
    beforeLicenseUpload(file) {
      this.$refs.license.show()
    },
    handleLicenseSuccess(res, file) {
      this.postForm.licenseImg = file.response.data
      this.$refs.license.close()
    },
    beforeCompanyUpload(file) {
      this.$refs.company.show()
    },
    handleCompanySuccess(res, file) {
      this.postForm.companyImg = file.response.data
      this.$refs.company.close()
    },
    beforePassPortUpload(file) {
      this.$refs.passPort.show()
    },
    handlePassPortSuccess(res, file) {
      this.postForm.passPort = file.response.data
      this.$refs.passPort.close()
    },
    beforeHeadUrlUpload(file) {
      this.$refs.headUrl.show()
    },
    handleHeadUrlSuccess(res, file) {
      this.postForm.headUrl = file.response.data
      this.$refs.headUrl.close()
    },
    handleRemove(file, fileList) {
      this.coverUrlList = fileList
    },
    handlePictureCardPreview(file) {
      this.coverUrlList.push({ name: file.data, url: file.data })
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
    getProList() {
      addressListByPid().then(response => {
        this.proList = response.data
      })
    },
    proChange() {
      const config = {
        pid: this.postForm.proId
      }
      addressListByPid(config).then(response => {
        this.cityList = response.data
      })
    },
    cityChange() {
      const config = {
        pid: this.postForm.cityId
      }
      addressListByPid(config).then(response => {
        this.areaList = response.data
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
      this.param = Object.assign({}, this.postForm)
      this.param.coverUrlList = []
      this.param.coverUrl = null
      this.param.startTime = this.hourTime[0]
      this.param.endTime = this.hourTime[1]
      this.param.hourTime = null
      for (let t = 0; t < this.coverUrlList.length; t++) {
        if (t === 0) {
          this.param.coverUrlList = this.coverUrlList[0].url
        } else {
          this.param.coverUrlList += ',' + this.coverUrlList[t].url
        }
      }
      handleEditBusiness(this.param, config).then(response => {
        if (response.status) {
          this.$message({ message: response.msg, type: 'success' })
          this.getData()
        } else {
          this.$message({ message: response.msg, type: 'error' })
        }
      })
    }
  }
}
</script>

<style>
  .loadingAnimation{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
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

  .el-upload-list--picture .el-upload-list__item{
    width: 375px;
    height: 255px;
  }

  .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
  }

  .el-upload-list .el-upload-list--picture li{
    display:inline
  }
</style>
