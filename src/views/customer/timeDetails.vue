<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.payCode" :placeholder="$t('timeDetails.payCode')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.isout" :placeholder="$t('timeDetails.isout')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option :key="1" :label="$t('timeDetails.income')" :value="1" />
        <el-option :key="0" :label="$t('timeDetails.expenditure')" :value="0" />
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
      <el-table-column :label="$t('timeDetails.payCode')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.nickName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.type')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 1" type="info">{{ $t('status.yes') }}</el-tag>
          <el-tag v-if="scope.row.type == 2" type="info">{{ $t('status.no') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.isout')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isout == 1" type="success">{{ $t('timeDetails.income') }}</el-tag>
          <el-tag v-if="scope.row.isout == 0" type="info">{{ $t('timeDetails.expenditure') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.original')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.original }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.cost')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cost }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.last')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.last }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.remark')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('timeDetails.createTime')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { customerTimeDetails } from '@/api/customer'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'CustomerTime',
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
        payCode: undefined,
        isout: null,
        cid: null
      },
      showReviewer: false,
      dialogPvVisible: false
    }
  },
  created() {
    this.id = this.$route.params && this.$route.params.cid
    this.listQuery.cid = this.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      customerTimeDetails(this.listQuery).then(response => {
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
