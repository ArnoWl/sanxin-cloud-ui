<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.phone" :placeholder="$t('cash.phone')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.payCode" :placeholder="$t('cash.payCode')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('cash.phone')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.payCode')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.bankName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bankName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.bankCode')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bankCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.cashMoney')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cashMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.realMoney')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.cashType')" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 1" type="primary" size="small">{{ $t('cash.customer') }}</el-tag>
          <el-tag v-if="scope.row.type === 2" type="success" size="small">{{ $t('cash.business') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.statusName')" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="primary" size="small">{{ $t('status.apply') }}</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success" size="small">{{ $t('status.success') }}</el-tag>
          <el-tag v-if="scope.row.status === 3" type="danger" size="small">{{ $t('status.fail') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cash.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('status.handle')">
        <template v-if="scope.row.status == 1" slot-scope="scope">
          <el-button type="primary" @click="onSubmit(scope.row, 2)">{{ $t('status.pass') }}</el-button><br>
          <el-button type="danger" @click="onSubmit(scope.row, 3)">{{ $t('status.fail') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<script>

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { queryCashList, handleCashStatus } from '@/api/cash'
import waves from '@/directive/waves'

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
        phone: '',
        payCode: '',
        status: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryCashList(this.listQuery).then(response => {
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
    onSubmit(row, status) {
      const query = {
        id: row.id,
        status: status
      }
      // 然后通过下面的方式把内容通过axios来传到后台
      handleCashStatus(query).then(response => {
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
    }
  }
}
</script>

