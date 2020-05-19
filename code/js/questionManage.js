//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'laydate', 'jquery', 'table'], function () {
  var table = layui.table,
    laydate = layui.laydate,
    $ = layui.jquery;
  var queryParam = {
    date: '',
    keywords: ''
  }
  // 渲染页面图表
  function renderTableWrap () {
    console.log('渲染参数===', queryParam)
    //todo 根据页面渲染参数，ajax请求后台数据
    table.render({
      elem: '#tableWrap',
      url: '/mockData/question.json',
      cols:[[
        { field: 'title', title: '问卷标题'},
        { field: 'createDate', title: '创建日期' },
        { field: 'num1', title: '调查人数' },
        { field: 'num2', title: '反馈人数' }
      ]],
    });
  }
  // 时间区间组件
  laydate.render({
    elem: '#rangeDate',
    type: 'date',
    range: true,
    done: function (value) {
      queryParam.date = value;
      renderTableWrap()
    }
  });

  $(function () {
    renderChartWrap()
  })
});