<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" :placeholder="$t('permission.rolename')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.status" :placeholder="$t('permission.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('permission.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">
        {{ $t('permission.addRole') }}
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('permission.id')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.rolename')">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('permission.status')"
        width="100"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
          >{{ scope.row.status === 1 ? 'OPEN' : 'CLOSE' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.createtime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template v-if="row.id !=1" slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('permission.edituser') }}
          </el-button>
          <el-button size="mini" :type="row.status === 1 ? 'danger' : 'success'" @click="updateRoleStatus(row)">
            {{ row.status === 1 ? 'CLOSE' : 'OPEN' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹出框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rulesAdd" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="temp.id" type="hidden" readonly />
        <el-form-item :label="$t('permission.rolename')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('permission.menu')" prop="menuids">
          <el-tree
            ref="tree"
            :data="menusList"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="checkData"
            :props="defaultProps"
          />
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
import { updateRoles, queryRoleList, updateRoleStatus, queryMenus } from '@/api/role'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

const statusTypeOptions = [
  { key: '1', display_name: 'OPEN' },
  { key: '0', display_name: 'CLOSE' }
]
// arr to obj, such as { CN : "China", US : "USA" }
const statusTypeKeyValue = statusTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': 'Open',
        '0': 'close'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return statusTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        name: '',
        status: ''
      },
      showReviewer: false,
      temp: {
        id: null,
        name: ''
      },
      statusTypeOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Add'
      },
      dialogPvVisible: false,
      rulesAdd: {
        name: [{ required: true, message: 'Role name cannot be empty', trigger: 'blur' }]
      },
      menusList: [],
      checkData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      downloadLoading: false
    }
  },
  computed: {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryRoleList(this.listQuery).then(response => {
        if (response.status) {
          this.list = response.data
        } else {
          this.$notify({
            title: 'ERROR',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getAllMenus(roleid) {
      queryMenus(roleid).then(response => {
        console.log(response)
        if (response.status) {
          this.menusList = response.data.menusList
          this.checkData = response.data.checkData
        } else {
          this.$notify({
            title: 'ERROR',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.getAllMenus(row.id)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAdd() {
      this.getAllMenus(null)
      this.temp = Object.assign({}, [])
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        const menuids = this.$refs.tree.getCheckedKeys()
        if (valid) {
          const params = {
            'id': this.temp.id,
            'name':this.temp.name,
            'menuids': menuids.join(',')
          }
          console.log(params)
          updateRoles(params).then((res) => {
            const data = res
            if (data.status) {
              this.$notify({
                title: 'SUCCESS',
                message: data.msg,
                type: 'success',
                duration: 2000
              })
              this.listQuery.page = 1
              this.getList()
            } else {
              this.$notify({
                title: 'ERROR',
                message: data.msg,
                type: 'error',
                duration: 2000
              })
            }
            this.dialogFormVisible = false
          })
        }
      })
    },
    updateRoleStatus(row) {
      const status = row.status == 1 ? 0 : 1
      const params = {
        'id': row.id,
        'status': status
      }
      updateRoleStatus(params).then(data => {
        if (data.status) {
          this.$notify({
            title: 'SUCCESS',
            message: data.msg,
            type: 'success',
            duration: 2000
          })
          this.listQuery.page = 1
          this.getList()
        } else {
          this.$notify({
            title: 'ERROR',
            message: data.msg,
            type: 'error',
            duration: 2000
          })
        }
        this.dialogFormVisible = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
