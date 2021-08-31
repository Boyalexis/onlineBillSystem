<template>
  <div class="add-account">
    
    <!-- <div style="margin: 20px;"></div> -->
    <!-- <el-card
      class="card"
      body-style="{ padding: '30px' }"
    > -->
      <el-form
      class="addAccount_form"
      label-position="right"
      label-width="60px"
      :model="form"
      :rules="accountRule"
      hide-required-asterisk
    >
    <el-radio-group
      v-model="form.type"
      size="small"
      @change="handle"
      class="inexp"
      fill="#E3DC62"
    >
      <el-radio-button 
        label="支出"
      >支出</el-radio-button>
      <el-radio-button 
        label="收入"
      >收入</el-radio-button>
    </el-radio-group>
      <el-form-item
        label="金额"
        prop="money"
      >
        <el-input
          v-model="form.money"
          type="number"
          placeholder="0.00"
          :min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
          
        ></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.use" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.desc"
          placeholder="简要备注说明"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="edit" type="primary" @click="onEdit" class="submitButton" :loading="loading">编辑</el-button>
        <el-button v-else type="primary" @click="onSubmit" class="submitButton" :loading="loading">确认</el-button>
      </el-form-item>
    </el-form>
    <!-- </el-card> -->
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "addAccount",
  data() {
    const validateNumber = (rule, value, callback) => {
       if(!value){
            callback(new Error('金额不能为空'))
         }else if(value.indexOf(".") != -1 && value.split('.').length > 2){
            callback(new Error('最多保留两位小数')) //防止输入多个小数点
         }else if(value.indexOf(".") != -1 && value.split('.')[1].length > 2){
           callback(new Error('最多保留两位小数')) //小数点后两位
        }else{
          callback();
        }
    }
    return {
      options: [{
          value: '餐饮',
          label: '餐饮'
        }, {
          value: '出行',
          label: '出行'
        }, {
          value: '生活用品',
          label: '生活用品'
        },
        {
          value: '储值',
          label: '储值'
        },
        {
          value: '红包',
          label: '红包'
        },
        {
          value: '工资',
          label: '工资'
        },
        {
          value: '服饰',
          label: '服饰'
        }, {
          value: '医疗',
          label: '医疗'
        }],
      choice: '支出',
      income: false,
      pay: true,
      loading: false,
      form: {
        type: '支出',
        money: '',
        use: '',
        date: '',
        desc: ''
      },
      accountRule: {
        money: [
          { required: true,
            validator: validateNumber,
            trigger: 'blur' }
        ]
      },
      edit: false
    };
  },
  components: {},
  methods: {
    handle(value) {
      if(value == 'income') {
        this.income = true,
        this.pay = false
        console.log(this.income,this.pay);
      }else if(value == 'pay') {
        this.income = false,
        this.pay = true
        console.log(this.income,this.pay);
      }
    },
    onSubmit() {
      const form = {
        type: this.form.type,
        money: Number(this.form.money),
        use: this.form.use,
        date: this.form.date,
        desc: this.form.desc
      }
      // console.log(form)
      this.loading = true
      axios.post('https://qc76o2.fn.thelarkcloud.com/addAccount', form).then(() => {
        // console.log(res);
        this.loading = false
        this.$router.push('/accountList')
        this.$message({
          message: '添加成功',
          type: 'success',
          center: true
        });
      })
    },
    onEdit() {
      const form = {
        id: this.$route.params.billId,
        type: this.form.type,
        money: Number(this.form.money),
        use: this.form.use,
        date: this.form.date,
        desc: this.form.desc
      }
      // console.log(form)
      this.loading = true
      axios.post('https://qc76o2.fn.thelarkcloud.com/editAccount', form).then(() => {
        // console.log(res);
        this.loading = false
        this.$router.push('/accountList')
        this.$message({
          message: '编辑成功',
          type: 'success',
          center: true
        });
      })
    }
  },
  mounted() {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth()+1).padStart(2,0)
    const day = String(new Date().getDate()).padStart(2,0)
    this.form.date = year + '-' + month + '-' + day  // 添加账单页日期默认当天
    // console.log(this.$route.params.billId)
    if(this.$route.params.billId) {
      this.edit = true
      const params = {
        id: this.$route.params.billId
      }
      axios.post('https://qc76o2.fn.thelarkcloud.com/getAccountItemById',params).then(res => {
        const AccountItem = res.data
        this.form.type = AccountItem.type
        this.form.money = AccountItem.money
        this.form.use = AccountItem.use
        this.form.date = AccountItem.date
        this.form.desc = AccountItem.desc
        if(AccountItem.type === '支出') {
          this.income = false
          this.pay = true
        }else {
          this.income = true
          this.pay = false
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.add-account {
  margin: 60px 15px;
  padding-bottom: 30px;
  .addAccount_form {
    // padding: 30px;
    .inexp {
      margin: 0 0 15px 60px;
    }
    .el-form-item {
      margin-bottom: 17px;
      .submitButton {
        width: 100%;
      }
    }
}
}

</style>
