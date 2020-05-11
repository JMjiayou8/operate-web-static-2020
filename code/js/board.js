//一般直接写在一个js文件中
layui.use(['layer', 'form'], function () {
  var layer = layui.layer,
    form = layui.form;
  function renderChart (id, xAxisData, data) {
    var chart = echarts.init(document.getElementById(id))
    //指定图表配置项和数据
    var option = {
      grid: {
        containLabel: true,
        top: 20,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLabel: {

        },
        axisLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {

        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        data: data,
        type: 'line',
        showSymbol: false,
        smooth: true,
        areaStyle: {}
      }]
    };
    chart.setOption(option, true);
  }
  function getData () {
    renderChart('chart1', ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'], [820, 932, 901, 934, 1290, 1330, 1320])
    renderChart('chart2', ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'], [820, 932, 901, 934, 1290, 1330, 1320])
    renderChart('chart3', ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'], [820, 932, 901, 934, 1290, 1330, 1320])
    renderChart('chart4', ['2020/01', '2020/02', '2020/03', '2020/04', '2020/05'], [820, 932, 901, 934, 1290, 1330, 1320])
  }
  getData();

  // layer.msg('Hello World');
});