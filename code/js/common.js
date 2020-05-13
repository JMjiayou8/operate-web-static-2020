
// 自定义设置下拉option
layui.selOptionExtraData = function (a, k,style) {
  null == k && (k = "select"); a("" + k).each(function () {
    if ("multiple" != a(this).attr("multiple")) {
      var e = a(this).find("option"), f = 0;
      null != e && 0 < e.length && ("" == a(e[0]).attr("value") || null == a(e[0]).attr("value")) && (f = 1);
      for (var d = a(this).siblings("div.layui-form-select").find("dd"), c = f, h = d.length; c < h; c++) {
        var b = a(e[f]).attr("extraData");
        null != b && "" != b && (b = eval("(" + b + ")"), null != b.data && "" != b.data && a(d[c]).append('<span style="vertical-align:middle;' +
        style + '">' + b.data + '</span>'));
      }
    }
  })
};

// 异动看板折线图
function renderLineChart (id, xAxisData, data) {
  var chart = echarts.init(document.getElementById(id))
  var grayColor = '#979797';
  //指定图表配置项和数据
  var option = {
    color: ['#5c9eff'],
    grid: {
      containLabel: true,
      top: 20,
      bottom: 0,
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'category',
      // boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        color: grayColor
      },
      axisLine: {
        lineStyle: {
          type: 'dotted',
          color: grayColor
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: grayColor
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
    series: [{
      data: data,
      type: 'line',
      showSymbol: false,
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#e7f1ff'
        }, {
          offset: 1,
          color: '#fff'
        }])
      },
    }]
  };
  chart.setOption(option, true);
}
// 异动特征柱状图
function renderFeatureBarChart (id, yAxisData, data) {
  var chart = echarts.init(document.getElementById(id))
  var grayColor = '#979797';
  //指定图表配置项和数据
  var option = {
    color: ['#5c9eff'],
    grid: {
      containLabel: true,
      top: 20,
      bottom: 0,
      left: 0,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: grayColor
      },
      axisLine: {
       lineStyle: {
          color: grayColor
        }
      },
      axisTick: {
        color: grayColor
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: grayColor
        }
      }
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLabel: {
        color: grayColor
      },
      axisLine: {
        lineStyle: {
          color: grayColor
        }
      },
      axisTick: {
        show: true
      }
    },
    series: [{
      data: data,
      type: 'bar',
      barMaxWidth:20,
      itemStyle: {
        barBorderRadius:10,
        //左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: '#d89a51'
        }, {
          offset: 1,
          color: '#f9b161'
        }])
      },
    }]
  };
  chart.setOption(option, true);
}
