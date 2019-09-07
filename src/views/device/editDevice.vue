<template>
  <div class="app-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="150px">
      <div class="app-container">
        <div class="form-box">
          <el-form-item :label="$t('device.code')" prop="code">
            <el-input v-model="postForm.code" />
          </el-form-item>
          <el-form-item :label="$t('device.typeName')" prop="type">
            <el-radio-group v-model="postForm.type" size="small">
              <el-radio label="1" border>{{ $t('device.large') }}</el-radio>
              <el-radio label="2" border>{{ $t('device.small') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('device.statusName')" prop="status">
            <el-switch
              v-model="statusState"
            />
          </el-form-item>
          <el-form-item :label="$t('device.businessName')" prop="status">
            <el-select v-model="postForm.bid" filterable>
              <el-option
                v-for="item in businessList"
                :key="item.id"
                :label="item.nickName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
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
              v-model="postForm.hourTime"
              is-range
              format="HH:mm"
              value-format="HH:mm"
            />
          </el-form-item>
          <el-form-item :label="$t('device.addressDetail')" prop="addressDetail">
            <el-input v-model="postForm.addressDetail" type="textarea" />
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
import { getDeviceDetail, handleEditDevice } from '@/api/device'
import { queryAllBusinessList } from '@/api/apply'
const defaultForm = {
  type: '1',
  hourTime: ['08:00', '20:00']
}
export default {
  name: 'EditDevice',
  data() {
    var checkNull = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Value cannot be empty'))
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0,
      param: {}, // 表单要提交的数据
      dateList: [
        { value: 0, name: this.$t('date.sunday') },
        { value: 1, name: this.$t('date.monday') },
        { value: 2, name: this.$t('date.tuesday') },
        { value: 3, name: this.$t('date.wednesday') },
        { value: 4, name: this.$t('date.thursday') },
        { value: 5, name: this.$t('date.friday') },
        { value: 6, name: this.$t('date.saturday') }
      ],
      businessList: {},
      statusState: false,
      rules: {
        code: [{ validator: checkNull, trigger: 'blur' }],
        type: [{ validator: checkNull, trigger: 'blur' }],
        addressDetail: [{ validator: checkNull, trigger: 'blur' }]
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
    this.queryBusinessList()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData() {
      const query = {
        id: this.id
      }
      getDeviceDetail(query).then(response => {
        this.postForm = response.data
        this.postForm.type = response.data.type.toString()
        this.postForm.hourTime = this.postForm.hourTime.split('-')
        this.statusState = this.postForm.status === 1
      }).catch(err => {
        console.log(err)
      })
    },
    queryBusinessList() {
      queryAllBusinessList().then(response => {
        this.businessList = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    onSave() {
      this.postForm.createTime = null
      if (this.postForm.hourTime == null) {
        this.$message({
          message: 'Time cannot be empty',
          type: 'error'
        })
        return
      }
      this.postForm.hourTime = this.postForm.hourTime[0] + '-' + this.postForm.hourTime[1]
      if (this.statusState) {
        this.postForm.status = 1
      } else {
        this.postForm.status = 0
      }
      handleEditDevice(this.postForm).then(response => {
        if (response.status) {
          // 判断是新增还是编辑
          if (typeof this.postForm.id === 'undefined') { // 编辑
            this.postForm = Object.assign({}, defaultForm)
          }
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
