<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.code" :placeholder="$t('device.code')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" :placeholder="$t('advert.statusName')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option :key="1" :label="$t('status.apply')" :value="1" />
        <el-option :key="2" :label="$t('status.success')" :value="2" />
        <el-option :key="3" :label="$t('status.fail')" :value="3" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button type="primary" icon="el-icon-edit">
        <router-link :to="'/device/editDevice/-1'">
          {{ $t('device.addDevice') }}
        </router-link>
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
      <el-table-column :label="$t('device.businessName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.businessName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('device.code')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('device.terminalPrice')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.terminalPrice }} / h</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('device.typeName')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">{{ $t('device.large') }}</span>
          <span v-if="scope.row.type == 2">{{ $t('device.small') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('device.statusName')" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="changeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" align="center">
        <template slot-scope="scope">
          <router-link :to="'/device/editDevice/'+scope.row.id">
            <el-button type="primary" size="small">
              {{ $t('status.edit') }}
            </el-button>
          </router-link>
          <router-link :to="'/device/deviceDetail/'+scope.row.id">
            <el-button type="primary" size="small">
              {{ $t('status.detail') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { deviceList, handleDeviceStatus } from '@/api/device'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Device',
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
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      deviceList(this.listQuery).then(response => {
        this.list = response.data.records
        this.list.forEach(function(l) {
          l.status = l.status.toString()
        })
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeStatus(row) {
      const query = {
        id: row.id,
        status: row.status
      }
      this.listLoading = true
      handleDeviceStatus(query).then(response => {
        if (response.status) {
          this.$message({
            message: response.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      })
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
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

