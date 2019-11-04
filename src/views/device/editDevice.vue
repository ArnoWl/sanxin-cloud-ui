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
          <el-form-item :label="$t('device.terminalPrice')" prop="code">
            <el-input v-model="postForm.terminalPrice" type="number" />
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
  type: '1'
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
