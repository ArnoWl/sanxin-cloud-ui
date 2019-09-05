<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="showAdd">
        {{ $t('cash.addBankType') }}
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
      <el-table-column label="logo" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.logo" width="40" height="40">
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.bankName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bankName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.statusName')" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="info" size="small">{{ $t('status.invalid') }}</el-tag>
          <el-tag v-if="scope.row.status === 1" type="success" size="small">{{ $t('status.effective') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')">
        <template slot-scope="scope">
          <el-button type="primary" @click="showEdit(scope.row)">{{ $t('status.edit') }}</el-button>
          <el-button v-if="scope.row.status == 1" type="info" @click="onUpdate(scope.row, 0)">{{ $t('status.invalid') }}</el-button>
          <el-button v-if="scope.row.status == 0" type="success" @click="onUpdate(scope.row, 1)">{{ $t('status.effective') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="dataForm.id" type="hidden" readonly />
        <el-form-item label="logo" prop="logo">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="dataForm.logo" :src="dataForm.logo" width="60" height="60" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('cash.bankName')" prop="bankName">
          <el-input v-model="dataForm.bankName" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="createData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { queryBankTypeList, handleBankTypeStatus, handleBankType } from '@/api/cash'
import waves from '@/directive/waves'

export default {
  name: 'BankType',
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
        phone: '',
        payCode: '',
        status: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dataForm: {
      },
      textMap: {
        update: 'Edit',
        create: 'Add'
      },
      rules: {
        bankName: [{ required: true, message: 'Bank name cannot be empty', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryBankTypeList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
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
    handleLogoSuccess(res, file) {
      this.dataForm.logo = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    onUpdate(row, status) {
      const query = {
        id: row.id,
        status: status
      }
      this.listLoading = true
      handleBankTypeStatus(query).then(response => {
        if (response.status) {
          this.$message({
            message: response.msg,
            type: 'success'
          })
          row.status = status
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
    showEdit(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dataForm = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    showAdd(row) {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dataForm = {
        id: '',
        bankName: '',
        logo: ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          handleBankType(this.dataForm).then(response => {
            if (response.status) {
              this.$message({
                message: response.msg,
                type: 'success'
              })
              this.dialogFormVisible = false
              this.getList()
            } else {
              this.$message({
                message: response.msg,
                type: 'error'
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
    font-size: 14px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
