<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.nickName" :placeholder="$t('customer.nickName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" :placeholder="$t('customer.statusName')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option :key="1" :label="$t('status.effective')" :value="1" />
        <el-option :key="0" :label="$t('status.invalid')" :value="0" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column :label="$t('customer.phone')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.nickName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.email')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.money')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.account != null">{{ scope.row.account.money }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.hour')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.account != null">{{ scope.row.account.hour }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.deposit')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.account != null">{{ scope.row.account.deposit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.areaCode')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.areaCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.isReal')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isReal == 1" type="success">{{ $t('status.yes') }}</el-tag>
          <el-tag v-if="scope.row.isReal == 0" type="info">{{ $t('status.no') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customer.statusName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">{{ $t('status.effective') }}</el-tag>
          <el-tag v-if="scope.row.status == 0" type="info">{{ $t('status.invalid') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              {{ $t('status.handle') }}
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.status == 1" @click.native="handleEditStatus(scope.row, 0)">{{ $t('customer.freeze') }}</el-dropdown-item>
              <el-dropdown-item v-else-if="scope.row.status == 0" @click.native="handleEditStatus(scope.row, 1)">{{ $t('customer.unfreeze') }}</el-dropdown-item>
              <el-dropdown-item @click.native="showUpdatePay(scope.row)">{{ $t('customer.resetPass') }}</el-dropdown-item>
              <el-dropdown-item @click.native="showUpdatePass(scope.row)">{{ $t('customer.restPay') }}</el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'/customer/amountDetails/'+scope.row.id">{{ $t('customer.amountDetails') }}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--修改交易密码-->
    <el-dialog :visible.sync="updatePayVisible">
      <el-form ref="updateForm" :model="updateForm" :rules="updateRules" label-width="80px" label-position="left">
        <el-form-item :label="$t('customer.payWord')" prop="payWord">
          <el-input v-model="updateForm.payWord" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="updatePayVisible=false,updateForm.id=null">
          {{ $t('status.cancel') }}
        </el-button>
        <el-button type="primary" @click="updatePay">
          {{ $t('status.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <!--修改登录密码-->
    <el-dialog :visible.sync="updatePassVisible">
      <el-form ref="updateForm" :model="updateForm" :rules="updateRules" label-width="80px" label-position="left">
        <el-form-item :label="$t('customer.passWord')" prop="passWord">
          <el-input v-model="updateForm.passWord" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="updatePassVisible=false,updateForm.id=null">
          {{ $t('status.cancel') }}
        </el-button>
        <el-button type="primary" @click="updatePass">
          {{ $t('status.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { customerList, handleCustomerStatus, handleUpdatePayWord, handleUpdatePassWord } from '@/api/customer'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Customer',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        nickName: undefined,
        status: ''
      },
      showReviewer: false,
      dialogPvVisible: false,
      updateForm: {
        id: null,
        passWord: '',
        payWord: ''
      },
      updatePayVisible: false,
      updatePassVisible: false,
      updateRules: {
        payWord: [
          { required: true, message: 'The payword cannot be empty', trigger: 'blur' },
          { min: 6, max: 6, message: 'The payword can not be less than 6 digits', trigger: 'blur' },
          { type: 'number', message: 'The payword can only be numbers', trigger: 'blur' }
        ],
        passWord: [{ required: true, message: 'The password cannot be empty', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      customerList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    handleEditStatus(row, status) {
      this.$confirm(this.$t('customer.handleStatusTip'), 'Tips', {
        confirmButtonText: this.$t('status.confirm'),
        cancelButtonText: this.$t('status.cancel'),
        type: 'info'
      }).then(() => {
        const data = {
          id: row.id,
          status: status
        }
        handleCustomerStatus(data).then(response => {
          if (response.status) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            row.status = status
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
      }).catch(() => { // 取消
      })
    },
    showUpdatePay(row) {
      this.updateForm.id = row.id
      this.updatePayVisible = true
    },
    showUpdatePass(row) {
      this.updateForm.id = row.id
      this.updatePassVisible = true
    },
    updatePay() {
      const data = {
        id: this.updateForm.id,
        payWord: this.updateForm.payWord
      }
      this.$refs['updateForm'].validate((valid) => {
        if (valid) {
          handleUpdatePayWord(data).then(response => {
            if (response.status) {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.updatePayVisible = false
              this.updateForm.payWord = null
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updatePass() {
      const data = {
        id: this.updateForm.id,
        passWord: this.updateForm.passWord
      }
      this.$refs['updateForm'].validate((valid) => {
        if (valid) {
          handleUpdatePassWord(data).then(response => {
            if (response.status) {
              this.$message({
                type: 'success',
                message: response.msg
              })
              this.updatePassVisible = false
              this.updateForm.passWord = null
            } else {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
