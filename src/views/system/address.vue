<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.proId" :placeholder="$t('status.proName')" filterable clearable class="filter-item" style="width: 130px" @change="proChange()">
        <el-option v-for="item in proList" :key="item.id" :label="item.translation" :value="item.id" />
      </el-select>
      <el-select v-model="listQuery.cityId" :placeholder="$t('status.cityName')" filterable clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in cityList" :key="item.id" :label="item.translation" :value="item.id" />
      </el-select>
      <!--      <el-select :placeholder="$t('status.areaName')" v-model="listQuery.areaId" filterable clearable class="filter-item" style="width: 130px">-->
      <!--        <el-option v-for="item in areaList" :key="item.id" :label="item.translation" :value="item.id" />-->
      <!--      </el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('permission.search') }}
      </el-button>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleFirstAdd()">
        {{ $t('address.addTopAddress') }}
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
      <el-table-column :label="$t('address.zhName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.thaiName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nameThai }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.enName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nameEn }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('address.level')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span><br>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleUpdate(scope.row)">
            {{ $t('status.edit') }}
          </el-button>
          <el-button v-if="scope.row.status == 1" size="small" type="info" @click="handleStatus(scope.row, 0)">
            {{ $t('status.invalid') }}
          </el-button>
          <el-button v-if="scope.row.status == 0" size="small" type="success" @click="handleStatus(scope.row, 1)">
            {{ $t('status.effective') }}
          </el-button>
          <el-button v-if="scope.row.level > 0 && scope.row.level < 3" size="small" type="success" @click="handleAdd(scope.row)">
            {{ $t('address.addChild') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--弹出框-->
    <el-dialog v-loading="loading" :title="$t('address.editAddr')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="temp.id" type="hidden" readonly />
        <el-form-item :label="$t('address.zhName')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('address.thaiName')" prop="name">
          <el-input v-model="temp.nameThai" />
        </el-form-item>
        <el-form-item :label="$t('address.enName')" prop="name">
          <el-input v-model="temp.nameEn" />
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

    <el-dialog v-loading="loading" :title="$t('address.addChild')" :visible.sync="dialogAddFormVisible">
      <el-form ref="dataAddForm" :model="addTemp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-input v-model="addTemp.id" type="hidden" readonly />
        <el-form-item :label="$t('address.zhName')" prop="name">
          <el-input v-model="addTemp.name" />
        </el-form-item>
        <el-form-item :label="$t('address.thaiName')" prop="name">
          <el-input v-model="addTemp.nameThai" />
        </el-form-item>
        <el-form-item :label="$t('address.enName')" prop="name">
          <el-input v-model="addTemp.nameEn" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="addData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { addressList, handleAddressStatus } from '@/api/system'
import { addressListByPid, editAddress, addAddress } from '@/api/address'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Address',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      loading: false,
      listQuery: {
        page: 1,
        limit: 20,
        proId: null,
        cityId: null,
        areaId: null
      },
      temp: {
        id: null,
        name: '',
        nameThai: '',
        nameEn: ''
      },
      addTemp: {
        parentid: null,
        name: '',
        nameThai: '',
        nameEn: ''
      },
      dialogFormVisible: false,
      dialogAddFormVisible: false,
      proList: [],
      cityList: [],
      areaList: []
    }
  },
  created() {
    this.getList()
    this.getProList()
  },
  methods: {
    getList() {
      this.listLoading = true
      addressList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    proChange() {
      const config = {
        pid: this.listQuery.proId
      }
      addressListByPid(config).then(response => {
        this.cityList = response.data
      })
    },
    cityChange() {
      const config = {
        pid: this.listQuery.cityId
      }
      addressListByPid(config).then(response => {
        debugger
        this.areaList = response.data
      })
    },
    getProList() {
      addressListByPid().then(response => {
        this.proList = response.data
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAdd(row) {
      this.addTemp.parentid = row.id // copy obj
      this.dialogAddFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataAddForm'].clearValidate()
      })
    },
    handleFirstAdd() {
      this.addTemp.parentid = 0 // copy obj
      this.dialogAddFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataAddForm'].clearValidate()
      })
    },
    handleStatus(row, status) {
      const query = {
        id: row.id,
        status: status
      }
      handleAddressStatus(query).then(response => {
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
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            'id': this.temp.id,
            'name': this.temp.name,
            'nameThai': this.temp.nameThai,
            'nameEn': this.temp.nameEn
          }
          this.loading = true
          editAddress(params).then((res) => {
            const data = res
            if (data.status) {
              this.$notify({ title: 'SUCCESS', message: data.msg, type: 'success', duration: 2000 })
              this.getList()
            } else {
              this.$notify({ title: 'ERROR', message: data.msg, type: 'error', duration: 2000 })
            }
            this.loading = false
            this.dialogFormVisible = false
          })
        }
      })
    },
    addData() {
      this.$refs['dataAddForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          addAddress(this.addTemp).then((res) => {
            const data = res
            if (data.status) {
              this.$notify({ title: 'SUCCESS', message: data.msg, type: 'success', duration: 2000 })
              this.getList()
            } else {
              this.$notify({ title: 'ERROR', message: data.msg, type: 'error', duration: 2000 })
            }
            this.loading = false
            this.dialogAddFormVisible = false
          })
        }
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
    }
  }
}
</script>
