//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'laydate', 'jquery', 'laytpl'], function () {
  var laytpl = layui.laytpl,
    laydate = layui.laydate,
    $ = layui.jquery;
  var queryParam = {
    date: '',
    keywords: ''
  }
  // 渲染页面图表
  window.renderChartWrap = function () {
    queryParam.keywords=$('#keywords').val()||''
    console.log('渲染参数===', queryParam)
    //todo 根据页面渲染参数，ajax请求后台数据
    var data = [
      {
        title: '高价值-信号问题',
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
        title: '高价值-资费问题',
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
        title: '低价值-信号问题',
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
        title: '低价值-资费问题',
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
      renderTableWrap()
    }
  });
  $(function () {
    renderChartWrap()
  })
});