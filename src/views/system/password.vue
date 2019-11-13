<template>
  <div class="app-container">
    <div class="form-box">
      <el-form ref="ruleForm" :model="postForm" label-width="150px" :rules="rules">
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item :label="$t('system.password')" prop="password">
              <el-input v-model="postForm.password" type="password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item :label="$t('system.confirmPassword')" prop="confirmPassword">
              <el-input v-model="postForm.confirmPassword" type="password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSave()">{{ $t('status.save') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user'
import store from '@/store'
const defaultForm = {
  password: '',
  confirmPassword: ''
}
export default {
  name: 'Password',
  data() {
    const checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('system.passwordEmpty')))
      }
      if (value.length < 6 || value.length > 20) {
        return callback(new Error(this.$t('system.passwordLength')))
      }
      return callback()
    }
    const checkConfirmPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('system.confirmPasswordEmpty')))
      }
      if (value.length < 6 || value.length > 20) {
        return callback(new Error(this.$t('system.passwordLength')))
      }
      if (value !== this.postForm.password) {
        return callback(new Error(this.$t('system.confirmPasswordError')))
      }
      return callback()
    }
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        password: [{ validator: checkPass, trigger: 'blur' }],
        confirmPassword: [{ validator: checkConfirmPass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSave() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          updatePassword(this.postForm).then(response => {
            if (response.status) {
              this.$message({ message: response.msg, type: 'success' })
              store.dispatch('user/resetToken').then(() => {
                this.$router.push({ path: '/login' })
              })
            } else {
              this.$message({ message: response.msg, type: 'error' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

