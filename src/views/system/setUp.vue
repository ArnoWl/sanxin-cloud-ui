<template>
  <div class="app-container">
    <el-form ref="form" :model="postForm" label-width="180px">
      <el-tabs v-model="activeName" class="elTab">
        <el-tab-pane :label="$t('setUp.baseName')" name="baseSet">
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="postForm"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="key" min-width="60px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.kcode }}</span><br>
              </template>
            </el-table-column>
            <el-table-column label="value" min-width="60px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.kvalue }}</span><br>
              </template>
            </el-table-column>
            <el-table-column label="explain" min-width="60px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span><br>
              </template>
            </el-table-column>
            <el-table-column :label="$t('status.handle')" min-width="60px" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleUpdate(scope.row)">
                  {{ $t('status.edit') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待定" name="v-directive" />
      </el-tabs>
      <!--      <el-form-item>-->
      <!--        <el-button type="primary" @click="onSave">{{ $t('status.save') }}</el-button>-->
      <!--      </el-form-item>-->

      <!--弹出框-->
      <el-dialog :title="$t('address.editAddr')" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="key" prop="name">
            <el-input v-model="temp.kcode" readonly />
          </el-form-item>
          <el-form-item label="value" prop="name">
            <el-input v-model="temp.kvalue" />
          </el-form-item>
          <el-form-item label="explain" prop="name">
            <el-input v-model="temp.remark" />
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
    </el-form>
  </div>
</template>

<script>
import { getBaseSetList, editInfoParam } from '@/api/system'
import waves from '@/directive/waves' // waves directive
const defaultForm = {
}
export default {
  name: 'SetUp',
  directives: { waves },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      listLoading: true,
      activeName: 'baseSet',
      dialogFormVisible: false,
      temp: {
        kcode: '',
        kvalue: '',
        id: null,
        remark: ''
      },
      tableKey: 0
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
        case 'baseSet':
          this.baseSetList()
          break
        default:
          break
      }
    },
    baseSetList() {
      getBaseSetList().then(response => {
        this.postForm = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      }).catch(err => {
        console.log(err)
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            'id': this.temp.id,
            'kvalue': this.temp.kvalue,
            'remark': this.temp.remark
          }
          editInfoParam(params).then((res) => {
            const data = res
            if (data.status) {
              this.dialogFormVisible = false
              this.$notify({ title: 'SUCCESS', message: data.msg, type: 'success', duration: 2000 })
              this.getData()
            } else {
              this.$notify({ title: 'ERROR', message: data.msg, type: 'error', duration: 2000 })
            }
          })
        }
      })
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
