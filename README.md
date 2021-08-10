# 字节校园实践项目一---在线记账系统



## 简介

---

该项目是完成字学前端实践项目之一---在线记账系统的源码，项目启动于7.10，完成于7.28，奈何我在做第二个实践项目(掘金客户端)的时候忘记了提交，结果拖到8.10提交...

## 技术栈

---

* Vue @2.6
* Vuex @3.4
* Vue-Router @ 3.2
* Sass
* Axios
* JWT
* Echarts
* ElementUI
* Better-scroll
* Swiper

## Demo

---

<img src="http://img.jhdee.top/img/image-20210810131658188.png" alt="image-20210810131658188" style="zoom:50%;" />

<img src="http://img.jhdee.top/img/image-20210810131632338.png" alt="image-20210810131632338" style="zoom:50%;" />

<img src="http://img.jhdee.top/img/image-20210810131610443.png" alt="image-20210810131610443" style="zoom:50%;" />

<img src="http://img.jhdee.top/img/image-20210810131610443.png" alt="image-20210810131610443" style="zoom:50%;" />

<img src="http://img.jhdee.top/img/image-20210810131525600.png" alt="image-20210810131525600" style="zoom:50%;" />![image-20210810131544259](http://img.jhdee.top/img/image-20210810131544259.png)

## 完成功能

---

* 简易登录
* 账单页---查看账单
  * 以日历形式展示每日账单
  * 加入骨架屏Loading效果
* 添加账单页
  * 提交收入/支出记账表单
* 统计页
  * 折线图展示近七日收入支出图表
  * 柱状图展示今年收入支出图表
  * 饼状图展示这一月收入支出所占比例以及分类

## To do List

---

* 账单页触底加载更多
* 添加账单页根据收入/支出切换表单，并切换radio颜色
* echarts自动居中到有数据的一栏
* 加入预算管理和省钱计划

## 个人评估

---

个人对这个项目觉得中规中矩，只完成了基本的功能，但是没有进阶功能，对这个项目完成度不太满意的地方有下面几点：

* 图表tab页切换时会与echarts的x轴移动重叠，影响用户体验
* 完成功能较少，后续应加入添加预算功能和省钱计划
* 没有引入TypeScript做类型检查，需要在后面做掘金客户端的时候引入