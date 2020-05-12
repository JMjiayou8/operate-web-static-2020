layui.use(['form', 'laytpl', 'laydate', 'jquery', 'table'], function () {
  var laytpl = layui.laytpl,
    form = layui.form,
    laydate = layui.laydate,
    $ = layui.jquery,
    table = layui.table;
  function renderTable () {
    table.render({
      elem: '#table1',
      url: '/mockData/area.json',
      cols: [[
        { field: 'areaName', title: '地市', sort: true },
        { field: 'data', title: '异动数', sort: true }
      ]],
      done: function (res) {
        renderMap(res.data)
      }
    });
  }
  function renderMap (data) {
    var areaData = [], mapData = []
    data.forEach(function (item) {
      for (let j = 0; j < 3; j++) {
        areaData.push(item.cp.concat(item.data))
      }
      mapData.push({
        name: item.areaName,
        value: item.data
      })
    })
    var mapMax = Math.max(...data.map(item => item.data));
    var mapMin = Math.min(...data.map(item => item.data));
    $.get('/js/third/echarts/province/guangdong.json', function (mapJson) {
      echarts.registerMap("guangdong", mapJson)
      var myChart = echarts.init(document.getElementById('hotMap'))
      var option = {
        tooltip: {
          trigger: "item",
          position: function (point, params, dom, rect, size) {
            var item = data.find(function (obj) { return obj.areaName == params.name })
            var html = '<div class="mapTooltip">' +
              '<p>地市：<span class="data">' + item.areaName + '</span></p>' +
              '<p>离网用户：<span class="data">' + item.param1 + '</span></p>' +
              '<p>月累计：<span class="data">' + item.param2 + '</span></p>' +
              '<p>预计降收：<span class="data">' + item.param3 + '万元</span></p>' +
              '</div>'
            $(dom).html(html)
          },
          backgroundColor: '#f0f4f8',
          textStyle: {
            color: '#666',
            fontSize: 14
          },
          extraCssText: 'padding:20px;'
        },
        visualMap: {
          top: "bottom",
          right: 300,
          color: ["#ff4600", "#fffc00", "#87cffa"],
          min: mapMin,
          max: mapMax,
          calculable: true,
          seriesIndex: 0,
          textStyle: {
            color: "#333",
            fontSize: 12
          }
        },
        geo: {
          map: "guangdong",
          top: 10,
          left: 0,
          bottom: 10,
          right: 300,
          label: {
            show: true,
            color: "#fff"
          },
          itemStyle: {
            areaColor: "#71b3dc",
            borderColor: "#fff"
          },
          emphasis: {
            label: {
              show: true,
              color: "#fff"
            },
            itemStyle: {
              areaColor: "#71b3dc",
              borderColor: "#fff",
              opacity: 0.8
            }
          }
        },
        series: [
          {
            name: "异动热力",
            type: "heatmap",
            geoIndex: 0,
            coordinateSystem: "geo",
            blurSize: 50,
            data: areaData,
          },
          {
            type: 'map',
            map: 'guangdong',
            geoIndex: 0,
            data: mapData
          }

        ]
      };
      myChart.setOption(option);
    })
  }
  $(function () {
    renderTable()
  })
})