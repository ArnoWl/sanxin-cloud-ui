<template>
  <div class="app-container">
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
      <el-table-column :label="$t('gift.money')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('gift.hour')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hour }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('gift.discount')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.discountMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showUpdate(scope.row)">
            {{ $t('status.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="deleteRow(scope.row)">
            {{ $t('status.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="dataForm.id" type="hidden" readonly />
        <el-form-item :label="$t('gift.money')" prop="money">
          <el-input v-model="dataForm.money" type="number" />
        </el-form-item>
        <el-form-item :label="$t('gift.hour')" prop="hour">
          <el-input v-model="dataForm.hour" type="number" />
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
import { queryGiftHourList, deleteGiftHour, updateGiftHour } from '@/api/system'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Agreement',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      dataForm: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Add'
      },
      rules: {
        money: [{ required: true, message: 'Money cannot be empty', trigger: 'blur' }],
        hour: [{ required: true, message: 'Hour cannot be empty', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryGiftHourList(this.listQuery).then(response => {
        this.list = response.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    showUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dataForm = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    deleteRow(row) {
      this.$confirm(this.$t('status.deleteMsg'), 'Tips', {
        confirmButtonText: this.$t('status.confirm'),
        cancelButtonText: this.$t('status.cancel'),
        type: 'info'
      }).then(() => {
        const data = {
          id: row.id
        }
        deleteGiftHour(data).then(response => {
          if (response.status) {
            this.$message({
              type: 'success',
              message: response.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: response.msg
            })
          }
        })
        this.getList()
      }).catch(() => {
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.dataForm.id,
            money: this.dataForm.money,
            hour: this.dataForm.hour
          }
          updateGiftHour(data).then(response => {
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
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }
  }
}
</script>
<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
</style>
