<template>
  <div class="app-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="150px">
      <el-tabs v-model="activeName" class="elTab">
        <el-tab-pane :label="$t('payment.alipay')" name="alipay">
          <div class="app-container">
            <div class="form-box">
              <el-form-item :label="$t('payment.partner')" prop="partner">
                <el-input v-model="postForm.partner" />
              </el-form-item>
              <el-form-item :label="$t('payment.partnerAccount')" prop="partnerAccount">
                <el-input v-model="postForm.partnerAccount" />
              </el-form-item>
              <el-form-item :label="$t('payment.privateKey')" prop="privateKey">
                <el-input v-model="postForm.privateKey" />
              </el-form-item>
              <el-form-item :label="$t('payment.aliPublicKey')" prop="aliPublicKey">
                <el-input v-model="postForm.aliPublicKey" />
              </el-form-item>
              <el-form-item :label="$t('payment.aliPrivateKey')" prop="aliPrivateKey">
                <el-input v-model="postForm.aliPrivateKey" />
              </el-form-item>
              <el-form-item :label="$t('payment.returnUrl')" prop="returnUrl">
                <el-input v-model="postForm.returnUrl" />
              </el-form-item>
              <el-form-item :label="$t('payment.refundPublicKey')" prop="refundPublicKey">
                <el-input v-model="postForm.refundPublicKey" />
              </el-form-item>
              <el-form-item :label="$t('payment.refundPrivateKey')" prop="refundPrivateKey">
                <el-input v-model="postForm.refundPrivateKey" />
              </el-form-item>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待定" name="v-directive" />
      </el-tabs>
      <el-form-item>
        <el-button type="primary" @click="onSave">{{ $t('status.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAliPayDetail, editAliPay } from '@/api/payment'
const defaultForm = {
}
export default {
  name: 'Payment',
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      activeName: 'alipay'
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.id
    this.getData(this.id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    getData() {
      switch (this.activeName) {
        case 'alipay':
          this.aliPayDetail()
          break
        default:
          break
      }
    },
    aliPayDetail() {
      getAliPayDetail().then(response => {
        this.postForm = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    editAliPay() {
      this.listLoading = true
      editAliPay(this.postForm).then(response => {
        if (response.status) {
          this.$message({ message: response.msg, type: 'success' })
          this.getData()
        } else {
          this.$message({ message: response.msg, type: 'error' })
        }
      })
      this.listLoading = false
    },
    onSave() {
      switch (this.activeName) {
        case 'alipay':
          this.editAliPay()
          break
        default:
          break
      }
    }
  }
}
</script>
