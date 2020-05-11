//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'laydate', 'jquery'], function () {
  var laytpl = layui.laytpl,
    form = layui.form,
    laydate = layui.laydate,
    $ = layui.jquery;
  var queryParam = {
    date: '',
    userType: ''
  }
  // 渲染页面图表
  function renderChartWrap () {
    console.log('渲染参数===', queryParam)
    //todo 根据页面渲染参数，ajax请求后台数据
    var data = [
      {
        title: '携号转网',
        date: '2020/04/20',
        param: {
          param1: 30,
          param2: 1.59,
          trend: 'down',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart1',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [820, 932, 90, 934, 190]
        }
      },
      {
        title: '离网异动',
        date: '2020/04/20',
        param: {
          param1: 10,
          param2: 1.59,
          trend: 'up',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart2',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [82, 932, 901, 934, 129]
        }
      },
      {
        title: '停机保号',
        date: '2020/04/20',
        param: {
          param1: 50,
          param2: 2.9,
          trend: 'up',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart3',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [820, 932, 90, 934, 1290]
        }
      },
      {
        title: '降套',
        date: '2020/04/20',
        param: {
          param1: 20,
          param2: 1.59,
          trend: 'up',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart4',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [820, 32, 201, 934, 1290]
        }
      },
      {
        title: '宽带未续约',
        date: '2020/04/20',
        param: {
          param1: 20,
          param2: 1.59,
          trend: 'up',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart5',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [820, 32, 21, 934, 120]
        }
      },
      {
        title: '套餐未续约',
        date: '2020/04/20',
        param: {
          param1: 20,
          param2: 1.59,
          trend: 'up',
          param3: 300,
          param4: 200
        },
        chartData: {
          chartId: 'chart6',
          xAxisData: ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'],
          data: [20, 312, 201, 934, 1290]
        }
      }
    ]
    var getTpl = dataBoxHtml.innerHTML, wrap = document.getElementById('dataBoxWrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      data.forEach(function (item) {
        var chartData = item.chartData || {};
        renderLineChart(chartData.chartId, chartData.xAxisData, chartData.data)
      })
    });
  }
  // 时间区间组件
  laydate.render({
    elem: '#rangeDate',
    type: 'date',
    range: true,
    done: function (value) {
      queryParam.date = value;
      renderChartWrap()
    }
  });
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
    renderChartWrap()
  })
  //选择全量用户
  window.setUserType = function (obj, param) {
    $('.filter-user .layui-select-title input').removeClass('active')
    $(obj).addClass('active')
    queryParam.userType = param
    renderChartWrap()
  }
  $(function () {
    renderSelect()
    renderChartWrap()
  })
});