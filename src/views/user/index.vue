<style scoped lang="scss">
.el-form-item__label {
  font-size: 1px;
  color: rgb(220, 220, 220);
  line-height: 40px;
  padding: 0 12px 0 0;
  font-weight: 300;
}
</style>

<template>
  <div class="home-container">
    <div class="t-p-content-10">
      <div class="t-container">
        <!-- 按钮 -->
        <div class="t-mini-buttom">
          <el-button
            size="mini"
            type="primary"
            @click="onAction('edit', 0)"
          >添加用户</el-button>
        </div>
        <!-- 搜索条件 -->
        <div class="t-search-content">
          <el-form
            :model="searchForm"
            label-position="right"
            class="demo-form-inline"
            size="mini"
            label-width="140px"
          >
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item
                  label="手机号："
                  prop="mobile"
                >
                  <el-input v-model="searchForm.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="状态："
                  prop="status"
                >
                  <el-select
                    v-model="searchForm.status"
                    placeholder="请选择状态"
                    style="width:100%"
                  >
                    <el-option
                      label="正常"
                      value="1"
                    ></el-option>
                    <el-option
                      label="禁用"
                      value="0"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期：">
                  <el-date-picker
                    type="daterange"
                    @change="dateChangebirthday"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="">
                  <el-button
                    type="primary"
                    @click="search"
                  >筛选</el-button>
                  <Reset :searchReserved="searchReserved"></Reset>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column
            :formatter="sequenceNum"
            label="编号"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号"
          ></el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
          ></el-table-column>
          <el-table-column
            prop="sign"
            label="个性签名"
          ></el-table-column>
          <el-table-column
            prop="real_name"
            label="真实姓名"
          ></el-table-column>
          <el-table-column
            prop="nick_name"
            label="昵称"
          ></el-table-column>
          <el-table-column
            prop="id_card"
            label="身份证号"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="stateFormat"
          ></el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            prop="updated_at"
            label="结束时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="onAction('edit',scope.row.id)"
              >编辑</el-button>
              <el-button
                size="mini"
                v-show="scope.row.status==0"
                type="success"
                @click="handleDisable(scope.$index, scope.row.id)"
              >正常</el-button>
              <el-button
                size="mini"
                v-show="scope.row.status==1"
                type="danger"
                @click="handleDisable(scope.$index, scope.row.id)"
              >禁用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :Paginationtotal="total"></Pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Reset from "@/components/reset/reset.vue";
import Pagination from "@/components/pagination/pagination.vue";
import { Component, Vue, Model, PropSync } from "vue-property-decorator";
import Utils from "@/utils/utils";
import { userLists, userList } from "@/api/user";
import { Message } from "element-ui";

interface commodity {
  mobile?: string;
  create_start?: string;
  create_end?: string;
}

@Component({
  components: {
    Reset,
    Pagination
  }
})
export default class User extends Vue {
  public searchForm: commodity = {};
  public loading: boolean = false;
  public page: number = 1;
  public total: number = 0; // table数据总条数
  public pageSize: number = 10;
  public tableData: any = [];
  public searchReserved = {
    name: "1111"
  };

  created() {
    this.userLists();
  }

  async userLists() {
    let response: any = await userLists(this.searchForm);
    this.loading = true;
    if (response.data.status == "success") {
      this.tableData = response.data.data;
      console.log(this.tableData);
      // this.total = response.data.data.total * 10
      this.total = 1;
      this.loading = false;
    } else {
      Message(response.data.message);
    }
  }

  public onAction(type: string, id: number): any {
    switch (type) {
      case "edit":
        this.$router.push({
          path: `/user/edit/${id}`
        });
        break;
    }
  }

  // 时间格式
  public dateChangebirthday(val: any) {
    this.searchForm.create_start = val[0];
    this.searchForm.create_end = val[1];
  }

  /**
   * 搜索
   */
  public search(): void {
    let _this = this;
    // let data = Utils.deep(this.searchForm);
    // this.$store.dispatch("paramsUrl", data).then((res: any) => {
    //   this.$router.push(`${this.$route.path}${res}`);
    // });
  }

  // 编号（从1开始自增长）
  public sequenceNum(row: any, column: any, cellValue: any, index: number) {
    let sequence;
    if (this.page > 1) {
      sequence = Number((this.page - 1) * this.pageSize + index + 1);
    } else {
      sequence = Number(index + 1);
    }
    return sequence;
  }

  public stateFormat(row: any, column: any) {
    if (row.status === 1) {
      return "正常";
    } else if (row.status === 0) {
      return "禁用";
    }
  }

  private activated() {
    console.log(2);
  }
  private deactivated() {
    console.log(4);
  }
}
</script>


