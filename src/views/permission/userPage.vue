<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.login" :placeholder="$t('permission.login')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.status" :placeholder="$t('permission.status')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('permission.search') }}
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">
        {{ $t('permission.adduser') }}
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
      <el-table-column :label="$t('permission.login')">
        <template slot-scope="scope">
          <span>{{ scope.row.login }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.phone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.nickname')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.rolename')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
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
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('permission.edituser') }}
          </el-button>
          <el-button size="mini" :type="row.status === 1 ? 'danger' : 'success'" @click="updateUserStatus(row)">
            {{ row.status === 1 ? 'CLOSE' : 'OPEN' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--弹出框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="dialogStatus==='create'?rulesAdd:rulesUpdate" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="temp.id" type="hidden" readonly />
        <el-form-item :label="$t('permission.login')" prop="login">
          <el-input v-model="temp.login" />
        </el-form-item>
        <el-form-item :label="$t('permission.password')" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item :label="$t('permission.rolename')" prop="roleid">
          <el-select v-model="temp.roleid" class="filter-item" placeholder="Please select">
            <el-option v-for="item in rolelist" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('permission.nickname')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('permission.phone')" prop="phone">
          <el-input v-model="temp.phone" />
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
import { queryUserList, queryRoleList, addUser, updateUserStatus } from '@/api/role'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
  components: { Pagination },
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
      rolelist: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        login: '',
        status: ''
      },
      showReviewer: false,
      temp: {
        id: null,
        login: '',
        password: '',
        roleid: null,
        name: '',
        phone: ''
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
        login: [{ required: true, message: 'login cannot be empty', trigger: 'blur' }],
        password: [{ required: true, message: 'password cannot be empty', trigger: 'blur' }],
        roleid: [{ required: true, message: 'please select roles', trigger: 'blur' }]
      },
      rulesUpdate: {
        login: [{ required: true, message: 'login cannot be empty', trigger: 'blur' }],
        roleid: [{ required: true, message: 'please select roles', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {

  },
  created() {
    this.getList()
    this.getRolelist()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryUserList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getRolelist() { // 初始化下拉框动态数据
      const obj = []
      queryRoleList().then(res => {
        // 关键的是将后台返回的数据进行遍历，并封装好
        res.data.forEach((item, index) => {
          obj.push({
            id: item.id,
            name: item.name
          })
        })
        this.rolelist = obj
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      row.password = ''
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAdd() {
      this.temp = Object.assign({}, [])
      this.dialogStatus = 'create'
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
            'login': this.temp.login,
            'password': this.temp.password,
            'roleid': this.temp.roleid,
            'name': this.temp.name,
            'phone': this.temp.phone
          }
          addUser(params).then((res) => {
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
    updateUserStatus(row) {
      const status = row.status == 1 ? 0 : 1
      const params = {
        'id': row.id,
        'status': status
      }
      updateUserStatus(params).then(data => {
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
      })
      console.log(params)
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
