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
  window.renderTableWrap=function () {
    queryParam.keywords=$('#keywords').val()||''
    console.log('渲染参数===', queryParam)
    //todo 根据页面渲染参数，ajax请求后台数据
    table.render({
      elem: '#tableWrap',
      url: '/mockData/question.json',
      where: queryParam,
      page: true,
      cols: [[
        { field: 'title', title: '问卷标题' },
        { field: 'createDate', title: '创建日期' },
        { field: 'num1', title: '调查人数' },
        { field: 'num2', title: '反馈人数' },
        { fixed: 'right', title: '操作', width: 178, align: 'center', toolbar: '#tableBar' }
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
        title: '问卷详情',
        area: '1000px',
        offset: '100px',
        skin: 'detail-layer',
        shadeClose: true,
        content: $('#detail-wrap'),
        success: function () {
          $('#detail-wrap').removeClass('layui-hide')
          var xAxisData = ['02/19', '02/20', '02/21', '02/22', '02/23']
          var barData = [100, 80, 37, 20, 10]
          renderBarChart(xAxisData, barData)
          var pieData =[
            { value: 335, name: '很满意' },
            { value: 310, name: '满意' },
            { value: 234, name: '不满意' }
          ]

          renderPieChart(pieData)
        }
      });
    }
  });

  function renderBarChart (xAxisData, data) {
    var chart = echarts.init(document.getElementById('chart1'))
    var grayColor = '#ebebeb';
    //指定图表配置项和数据
    var option = {
      color: ['#5c9eff'],
      grid: {
        containLabel: true,
        top: 20,
        bottom: 0,
        left: 20,
        right: 20
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#999999'
        },
        axisLine: {
          show: false

        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: grayColor
          }
        }
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          color: '#999999'
        },
        axisLine: {
          lineStyle: {
            color: grayColor
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        data: data,
        type: 'bar',
        barMaxWidth: 20,
        itemStyle: {
          barBorderRadius: 10,
          //左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#feada1'
          }, {
            offset: 1,
            color: '#fd7371'
          }])
        },
      }]
    };
    chart.setOption(option, true);
  }
  function renderPieChart (pieData) {
    var chart = echarts.init(document.getElementById('chart2'))
    var legendData=pieData.map(item=>item.name)
    //指定图表配置项和数据
    var option = {
      color: ['#fd7270', '#2fb6da', '#fcb609'],
      legend: {
        x: 'center',
        y: 'bottom',
        data: legendData,
        itemGap:15,
        formatter: function(name) {
          var data = option.series[0].data;
          var total = 0;
          var tarValue;
          for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          var p = parseInt((tarValue / total) * 100);
          return name + " " + " " + p + "%";
        },
      },
      series: [
        {
          name: '满意度',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,

            }
          },
          labelLine: {
            show: false
          },
          data: pieData
        }
      ]
    };
    chart.setOption(option, true);
  }

  $(function () {
    renderTableWrap()
  })
});