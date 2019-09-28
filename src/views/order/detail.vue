<template>
  <div class="app-container">
    <div class="form-box">
      <el-form ref="form" :model="postForm" label-width="150px">
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.orderCode')" prop="title">
              <el-button v-if="postForm.orderCode != null">{{ postForm.orderCode }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.orderStatus')" prop="title">
              <el-button v-if="postForm.orderStatus != null" type="success" size="small">{{ postForm.statusName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.orderFromChannel')" prop="title">
              <el-button v-if="postForm.orderFromChannel != null" type="primary" size="small">{{ postForm.orderFromChannel }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.payTypeName')">
              <el-button v-if="postForm.payTypeName != null" type="primary" size="small">{{ postForm.payTypeName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.bNickName')" prop="title">
              <el-button v-if="postForm.bNickName != null">{{ postForm.bNickName }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.terminalId')" prop="title">
              <el-button v-if="postForm.terminalId != null">{{ postForm.terminalId }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.cNickName')" prop="title">
              <el-button v-if="postForm.cNickName != null">{{ postForm.cNickName }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.phone')" prop="title">
              <el-button v-if="postForm.phone != null">{{ postForm.phone }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.transCode')" prop="title">
              <el-button v-if="postForm.transCode != null">{{ postForm.transCode }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.payCode')" prop="title">
              <el-button v-if="postForm.payCode != null">{{ postForm.payCode }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.payMoney')" prop="title">
              <el-button v-if="postForm.payMoney != null">{{ postForm.payMoney }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.realMoney')" prop="title">
              <el-button v-if="postForm.realMoney != null">{{ postForm.realMoney }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.rentMoney')" prop="title">
              <el-button v-if="postForm.rentMoney != null">{{ postForm.rentMoney }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.hour')" prop="title">
              <el-button v-if="postForm.hour != null">{{ postForm.hour }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.rentAddr')">
              <el-button v-if="postForm.rentAddr != null">{{ postForm.rentAddr }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.returnAddr')">
              <el-button v-if="postForm.returnAddr != null">{{ postForm.returnAddr }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col :span="8">
            <el-form-item :label="$t('corder.createTime')">
              <el-button>{{ postForm.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('corder.confirmTime')">
              <el-button v-if="postForm.confirmTime != null">{{ postForm.confirmTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col v-if="postForm.payTime != null" :span="8">
            <el-form-item :label="$t('corder.payTime')">
              <el-button>{{ postForm.payTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col v-if="postForm.returnTime != null" :span="8">
            <el-form-item :label="$t('corder.returnTime')">
              <el-button>{{ postForm.returnTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="16">
          <el-col v-if="postForm.payendTime != null" :span="8">
            <el-form-item :label="$t('corder.payendTime')">
              <el-button>{{ postForm.payendTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
          <el-col v-if="postForm.overTime != null" :span="8">
            <el-form-item :label="$t('corder.overTime')">
              <el-button>{{ postForm.overTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('corder.buy')" prop="title">
          <el-button v-if="postForm.buy === 1" type="danger" size="small">{{ $t('corder.buyed') }}</el-button>
          <el-button v-if="postForm.buy === 0" type="primary" size="small">{{ $t('corder.nobuy') }}</el-button>
        </el-form-item>
        <el-row v-if="postForm.buy === 1" :span="16">
          <el-col v-if="postForm.terminalMoney != null" :span="8">
            <el-form-item :label="$t('corder.terminalMoney')" prop="title">
              <el-button>{{ postForm.terminalMoney }}</el-button>
            </el-form-item>
          </el-col>
          <el-col v-if="postForm.depositMoney != null" :span="8">
            <el-form-item :label="$t('corder.depositMoney')" prop="title">
              <el-button>{{ postForm.depositMoney }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
import { orderDetail } from '@/api/order'

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
  name: 'OrderDetail',
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
      orderDetail(query).then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
