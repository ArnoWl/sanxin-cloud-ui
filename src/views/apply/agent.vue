<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.nickName" :placeholder="$t('advert.nickName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" :placeholder="$t('advert.statusName')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option :key="1" :label="$t('status.apply')" :value="1" />
        <el-option :key="2" :label="$t('status.success')" :value="2" />
        <el-option :key="3" :label="$t('status.fail')" :value="3" />
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
      <el-table-column :label="$t('advert.nickName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.phone')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.address')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.companyName')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.licenseCode')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.licenseCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.createTime')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('advert.statusName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="info" size="small">{{ $t('status.apply') }}</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success" size="small">{{ $t('status.success') }}</el-tag>
          <el-tag v-if="scope.row.status === 3" type="danger" size="small">{{ $t('status.fail') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')" width="150px" align="center">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              {{ $t('status.handle') }}<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="'/apply/agentDetail/'+scope.row.id">
                  {{ $t('advert.detail') }}
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span v-if="scope.row.status == 2" @click="showUpdateLogin(scope.row)">{{ $t('business.editLoginPass') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { agentList, resetAgentLoginPass } from '@/api/apply'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Advert',
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
      agentList(this.listQuery).then(response => {
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
    showUpdateLogin(row) {
      this.$confirm(this.$t('business.sureReset'), 'Tips', {
        confirmButtonText: this.$t('status.confirm'),
        cancelButtonText: this.$t('status.cancel'),
        type: 'info'
      }).then(() => {
        const data = {
          id: row.id
        }
        resetAgentLoginPass(data).then(response => {
          if (response.status) {
            this.$message({ type: 'success', message: response.msg })
          } else {
            this.$message({ type: 'error', message: response.msg })
          }
        })
      }).catch(() => {
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

