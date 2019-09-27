<template>
  <div class="app-container">
    <!--查询条件-->
    <div class="filter-container">
      <el-input v-model="listQuery.phone" :placeholder="$t('corder.phone')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.cNickName" :placeholder="$t('corder.cNickName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.bNickName" :placeholder="$t('corder.bNickName')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.orderCode" :placeholder="$t('corder.orderCode')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.terminalId" :placeholder="$t('corder.terminalId')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.payTypeName" :placeholder="$t('corder.payTypeName')" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option :key="1" :label="$t('corder.payTypeName')" :value="1" />
        <el-option :key="0" :label="$t('corder.payTypeName')" :value="0" />
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
      <el-table-column :label="$t('corder.phone')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.cNickName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cNickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.bNickName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bNickName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.terminalId')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.terminalId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.orderCode')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.orderFromChannel')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderFromChannel }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.payTypeName')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.orderStatus')" min-width="60px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.orderStatus == 1" type="info">{{ $t('status.yes') }}</el-tag>
          <el-tag v-if="scope.row.orderStatus == 2" type="info">{{ $t('status.no') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('corder.createTime')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
                <router-link :to="'/order/detail/'+scope.row.id">{{ $t('corder.detail') }}</router-link>
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
import { orderList } from '@/api/order'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'OrderList',
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
        phone: undefined,
        CNickName: undefined,
        BNickName: undefined,
        orderCode: undefined,
        terminalId: undefined,
        payType: null
      },
      showReviewer: false,
      dialogPvVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderList(this.listQuery).then(response => {
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
