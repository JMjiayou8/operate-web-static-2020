//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'jquery', 'element', 'table'], function () {
  var laytpl = layui.laytpl,
    $ = layui.jquery,
    element = layui.element,
    table = layui.table,
    form = layui.form;
  var queryParam = {
    userType: ''
  }
  var choosedData = [];
  //当前tab序列
  var activeIndex = 0;
  // 表格配置
  var tableConfig = [
    {
      url: '/mockData/feature1.json',
      cols: [[
        { type: 'checkbox' },
        { field: 'param1', title: '主套餐' },
        { field: 'param2', title: '异动数' },
        { field: 'param3', title: '预计降收' },
        { field: 'param4', title: '流失率' },
        { field: 'param5', title: '占比' },
      ]]
    },
    {
      url: '/mockData/feature2.json',
      cols: [[
        { type: 'checkbox' },
        { field: 'param1', title: '异动原因' },
        { field: 'param2', title: '异动数' },
        { field: 'param3', title: '预计降收' },
        { field: 'param4', title: '流失率' },
        { field: 'param5', title: '占比' },
      ]]
    }, {
      url: '/mockData/feature3.json',
      cols: [[
        { type: 'checkbox' },
        { field: 'param1', title: '余额' },
        { field: 'param2', title: '异动数' },
        { field: 'param3', title: '预计降收' },
        { field: 'param4', title: '流失率' },
        { field: 'param5', title: '占比' },
      ]]
    }, {
      url: '/mockData/feature4.json',
      cols: [[
        { type: 'checkbox' },
        { field: 'param1', title: '在网时长' },
        { field: 'param2', title: '异动数' },
        { field: 'param3', title: '预计降收' },
        { field: 'param4', title: '流失率' },
        { field: 'param5', title: '占比' },
      ]]
    }, {
      url: '/mockData/feature5.json',
      cols: [[
        { type: 'checkbox' },
        { field: 'param1', title: '套餐使用' },
        { field: 'param2', title: '异动数' },
        { field: 'param3', title: '预计降收' },
        { field: 'param4', title: '流失率' },
        { field: 'param5', title: '占比' },
      ]]
    }
  ]


  //选择全量用户
  window.setUserType = function (obj, param) {
    $('.filter-user .layui-select-title input').removeClass('active')
    $(obj).addClass('active')
    queryParam.userType = param
  }
  // 渲染看管用户下拉框
  function renderSelect () {
    var data = {
      abnormalNum: 20,
      list: [{
        id: '1',
        title: '看管池一',
        data: 10
      }, {
        id: '2',
        title: '看管池二',
        data: 30
      }, {
        id: '3',
        title: '看管池三',
        data: 20
      }]
    }
    var getTpl = filterUserHtml.innerHTML, wrap = document.getElementById('filter-user');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      form.render();
      layui.selOptionExtraData($, 'select[name=userType2]', 'color:#3394d2;margin-left:50px;')
    });
  }
  //监听下拉变化
  form.on('select(userType2)', function (data) {
    if (data.value) {
      queryParam.userType = data.value
      $('.filter-user .layui-select-title input').addClass('active')
      $('.layui-btn-user').removeClass('active')
    } else {
      queryParam.userType = ''
      $('.filter-user .layui-select-title input').removeClass('active')
    }
  })
  // 监听tab切换
  element.on('tab(tabBrief)', function (elem) {
    activeIndex = elem.index;
    renderTabContent()
  });
  function renderTabContent () {
    var data = {
      list: [
        {
          desc: '数据摘要：取数为12月31日用户，目标数据为12月出帐202001月不出帐用户。'
        },
        {
          desc: '数据摘要：取数为12月31日用户，目标数据为12月出帐202001月不出帐用户。'
        },
        {
          desc: '数据摘要：取数为12月31日用户，目标数据为12月出帐202001月不出帐用户。'
        },
        {
          desc: '数据摘要：取数为12月31日用户，目标数据为12月出帐202001月不出帐用户。'
        },
        {
          desc: '数据摘要：取数为12月31日用户，目标数据为12月出帐202001月不出帐用户。'
        }],
      activeIndex: activeIndex
    }
    var getTpl = tabContentHtml.innerHTML, wrap = document.getElementById('tabContent');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      renderBody(data.activeIndex)
    });
  }
  // 渲染表格和图表
  function renderBody (index) {
    table.render({
      id: 'table' + index,
      elem: '#table' + index,
      url: tableConfig[index].url,
      cols: tableConfig[index].cols,
      parseData: function (res) {//将已选中的数据重新渲染未选中状态
        res.data.forEach(function (item) {
          var flag = choosedData.find(function (obj) {
            return obj.param1 == item.param1
          })
          item.LAY_CHECKED = !!flag
        })
        return res
      },
      done: function (res) {//数据加载完绘制图表及监听选中时间
        var chartData = res.data || []
        var yAxisData = chartData.map(function (item) { return item.param1 })
        var data = chartData.map(function (item) { return item.param2 })
        renderFeatureBarChart('chart' + index, yAxisData, data)
        table.on('checkbox()', function () {
          renderChoosedWrap()
        });
      }
    });
  }
  // 选中的目标数据
  function renderChoosedWrap () {
    choosedData = []
    for (var i = 0; i < 5; i++) {
      var item = table.checkStatus('table' + i).data || []
      choosedData = choosedData.concat(item)
    }
    var data = {
      list: choosedData,
      total: 2000
    }
    var getTpl = choosedHtml.innerHTML, wrap = document.getElementById('choosedWrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
    });
  }

  $(function () {
    renderSelect()
    renderTabContent()
  })
});