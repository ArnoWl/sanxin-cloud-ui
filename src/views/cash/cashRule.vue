<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="elTab">
      <el-tab-pane :label="$t('cash.customerCash')" name="directly">
        <div class="app-container">
          <div class="form-box">
            <el-form ref="customerForm" :model="customerForm" :rules="customerRules" label-width="150px">
              <el-form-item :label="$t('cash.num')" prop="num">
                <el-input v-model="customerForm.num" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.scale')" prop="scale">
                <el-input v-model="customerForm.scale" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.minVal')" prop="minVal">
                <el-input v-model="customerForm.minVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.maxVal')" prop="maxVal">
                <el-input v-model="customerForm.maxVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.multiple')" prop="multiple">
                <el-input v-model="customerForm.multiple" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.isOpen')" prop="isOpen">
                <el-radio-group v-model="customerForm.isOpen" size="small">
                  <el-radio label="1" border>{{ $t('status.yes') }}</el-radio>
                  <el-radio label="0" border>{{ $t('status.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('cash.type')" prop="type">
                <el-radio-group v-model="customerForm.type" size="small">
                  <el-radio label="0" border>不限制</el-radio>
                  <el-radio label="1" border>限制每日提现次数</el-radio>
                  <el-radio label="2" border>限制每周提现次数</el-radio>
                  <el-radio label="3" border>限制每月提现次数</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave('customerForm')">{{ $t('status.save') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('cash.businessCash')" name="v-directive">
        <div class="app-container">
          <div class="form-box">
            <el-form ref="businessForm" :model="businessForm" :rules="businessRules" label-width="150px">
              <el-form-item :label="$t('cash.num')" prop="num">
                <el-input v-model="businessForm.num" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.scale')" prop="scale">
                <el-input v-model="businessForm.scale" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.minVal')" prop="minVal">
                <el-input v-model="businessForm.minVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.maxVal')" prop="maxVal">
                <el-input v-model="businessForm.maxVal" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.multiple')" prop="multiple">
                <el-input v-model="businessForm.multiple" type="number" />
              </el-form-item>
              <el-form-item :label="$t('cash.isOpen')" prop="isOpen">
                <el-radio-group v-model="businessForm.isOpen" size="small">
                  <el-radio label="1" border>{{ $t('status.yes') }}</el-radio>
                  <el-radio label="0" border>{{ $t('status.no') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('cash.type')" prop="type">
                <el-radio-group v-model="businessForm.type" size="small">
                  <el-radio label="0" border>不限制</el-radio>
                  <el-radio label="1" border>限制每日提现次数</el-radio>
                  <el-radio label="2" border>限制每周提现次数</el-radio>
                  <el-radio label="3" border>限制每月提现次数</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row :span="12">
                <el-col :span="6">
                  <el-form-item :label="$t('cash.tax')" prop="tax">
                    <el-input v-model="businessForm.taxOne" type="number" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="tax">
                    <el-input v-model="businessForm.taxTwo" type="number" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="onSave('businessForm')">{{ $t('status.save') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { customerCashRule, businessCashRule, updateCashRule } from '@/api/cash'
const defaultForm = {
}
export default {
  name: 'AdvertDetail',
  data() {
    const validateNull = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入值，该项不能为空'))
      } else {
        callback()
      }
    }
    return {
      customerForm: Object.assign({}, defaultForm),
      businessForm: Object.assign({}, defaultForm),
      loading: false,
      id: 0,
      activeName: 'directly',
      customerRules: {
        num: [{ validator: validateNull }],
        scale: [{ validator: validateNull }],
        minVal: [{ validator: validateNull }],
        maxVal: [{ validator: validateNull }],
        multiple: [{ validator: validateNull }]
      },
      businessRules: {
        num: [{ validator: validateNull }],
        scale: [{ validator: validateNull }],
        minVal: [{ validator: validateNull }],
        maxVal: [{ validator: validateNull }],
        multiple: [{ validator: validateNull }],
        tax: [{ validator: validateNull }]
      }
    }
  },
  created() {
    this.getData()
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData() {
      customerCashRule().then(response => {
        this.customerForm = response.data
        this.customerForm.isOpen = response.data.isOpen.toString()
        this.customerForm.type = response.data.type.toString()
      }).catch(err => {
        console.log(err)
      })
      businessCashRule().then(response => {
        this.businessForm = response.data
        this.businessForm.isOpen = response.data.isOpen.toString()
        this.businessForm.type = response.data.type.toString()
      }).catch(err => {
        console.log(err)
      })
    },
    onSave(type) {
      var form = {}
      var validStatus = false
      if (type === 'customerForm') {
        form = this.customerForm
        this.$refs.customerForm.validate(valid => {
          validStatus = valid
        })
      } else if (type === 'businessForm') {
        form = this.businessForm
        this.$refs.businessForm.validate(valid => {
          validStatus = valid
        })
      }
      if (validStatus) {
        updateCashRule(form).then(response => {
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
