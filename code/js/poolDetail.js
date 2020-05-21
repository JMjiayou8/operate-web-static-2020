//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'laydate', 'jquery', 'table', 'laytpl'], function () {
  var table = layui.table,
  form=layui.form,
    laydate = layui.laydate,
    laytpl = layui.laytpl,
    $ = layui.jquery;
  var queryParam = {
    date: '',
    keywords: ''
  }
  var configData={
    configList1: [{
      option1: '0',
      option2: '1',
      option3:'',
      option4:'',
    }],
    configList2: [{
      option1: '0',
      option2: '1',
      option3:'1'
    }],
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
            var arr = new Array(d.rate)
            for (var i = 0; i < arr.length; i++) {
              arr[i] = '<i class="layui-icon layui-icon-rate-solid" style="color:#89c5a5;"></i>'
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
          $('#detail-wrap').removeClass('layui-hide')
        }
      });
    }
  });
  window.configDialog = function () {
    layer.open({
      type: 1,
      title: '配置维系策略',
      area: '1000px',
      offset: '100px',
      skin: 'detail-layer',
      shadeClose: true,
      content: $('#config-wrap'),
      success: function () {
        $('#config-wrap').removeClass('layui-hide')
        renderConfigUser()
      }
    });
  }
  function renderConfigUser () {
    var data = {
      optionList1: [
        {
          value: '0',
          text: 'ARPU'
        }
      ],
      optionList2: [
        {
          value: '0',
          text: '小于'
        },
        {
          value: '1',
          text: '大于'
        },
        {
          value: '2',
          text: '等于'
        }
      ],
      optionList3: [
        {
          value: '0',
          text: '办理过'
        },
        {
          value: '1',
          text: '未办理'
        }
        
      ],
      optionList4: [
        {
          value: '1',
          text: '携号转网'
        }
      ],
      configData:configData
    }
    var getTpl = configChooseUser.innerHTML, wrap = document.getElementById('configChooseUserWrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      form.render();
    });
  }
  window.addConfig1=function(){
    configData.configList1.push({
      option1: '0',
      option2: '1',
      option3:'',
      option4:'',
    })
    renderConfigUser()
  }
  window.addConfig2=function(){
    configData.configList2.push({
      option1: '0',
      option2: '1',
      option3:'1',
    })
    renderConfigUser()
  }
  window.delConfig1=function(index){
    configData.configList1.splice(index,1)
    renderConfigUser()
  }
  window.delConfig2=function(index){
    configData.configList2.splice(index,1)
    renderConfigUser()
  }
  $(function () {
    renderTableWrap()
  })
});