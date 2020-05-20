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
  window.renderTableWrap = function () {
    queryParam.keywords = $('#keywords').val() || ''
    console.log('渲染参数===', queryParam)
    //todo 根据页面渲染参数，ajax请求后台数据
    table.render({
      elem: '#tableWrap',
      url: '/mockData/pool.json',
      where: queryParam,
      page: true,
      cols: [[
        { field: 'tel', title: '手机号码' },
        { field: 'name', title: '姓名' },
        { field: 'package', title: '主套餐' },
        { field: 'prop1', title: '平均三个月APRU' },
        {
          field: 'status', title: '状态', templet: function (d) {
            var statusMap = {
              1: '已离网',
              2: '已稳定'
            }
            return statusMap[d.status]
          }
        },
        { field: 'prop2', title: '行为特征' },
        {
          field: 'rate', title: '健康度', templet: function (d) {
            var arr=new Array(d.rate)
            for(var i=0;i<arr.length;i++){
              arr[i]='<i class="layui-icon layui-icon-rate-solid" style="color:#89c5a5;"></i>'
            }
            return arr.join('')
          }
        },
        { title: '接触轨迹', width: 178, align: 'center', toolbar: '#tableBar' }
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
  table.on('tool(tableWrap)', function (obj) {
    if (obj.event === 'detail') {
      layer.open({
        type: 1,
        title: '接触轨迹',
        area: '1000px',
        offset: '100px',
        skin: 'detail-layer',
        shadeClose: true,
        content: $('#detail-wrap'),
        success: function () {
        }
      });
    }
  });
  window.config=function(){
    layer.open({
      type: 1,
      title: '配置维系策略',
      area: '1000px',
      offset: '100px',
      skin: 'detail-layer',
      shadeClose: true,
      content: $('#config-wrap'),
      success: function () {
      }
    });
  }
  $(function () {
    renderTableWrap()
  })
});