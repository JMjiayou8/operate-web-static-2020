//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'jquery', 'table', 'element'], function () {
  var laytpl = layui.laytpl,
    $ = layui.jquery,
    table = layui.table,
    element = layui.element,
    form = layui.form;
    var questList=[]

  // 渲染选择客户群
  function renderStepPage1 () {
    //todo 根据页面渲染参数，ajax请求后台数据
    var data = [
      {
        id: '1',
        title: '主套餐特征',
        url: '/mockData/feature1.json',
        cols: [[
          { type: 'checkbox' },
          { field: 'param1', title: '主套餐' },
          { field: 'param2', title: '异动数' }
        ]]
      },
      {
        id: '2',
        title: '异动原因特征',
        url: '/mockData/feature2.json',
        cols: [[
          { type: 'checkbox' },
          { field: 'param1', title: '异动原因' },
          { field: 'param2', title: '异动数' }
        ]]
      },
      {
        id: '3',
        title: '余额特征',
        url: '/mockData/feature3.json',
        cols: [[
          { type: 'checkbox' },
          { field: 'param1', title: '余额特征(元)' },
          { field: 'param2', title: '异动数' }
        ]]
      },
      {
        id: '4',
        title: '在网时长特征',
        url: '/mockData/feature4.json',
        cols: [[
          { type: 'checkbox' },
          { field: 'param1', title: '在网时长特征' },
          { field: 'param2', title: '异动数' }
        ]]
      }
    ]
    var getTpl = dataBoxHtml.innerHTML, wrap = document.getElementById('dataBoxWrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      form.render()
      data.forEach(function (item) {
        table.render({
          id: 'table' + item.id,
          elem: '#table' + item.id,
          url: item.url,
          cols: item.cols
        });
      })
    });
  }

  function renderStepPage2 () {
    var data = [
      // {
      //   itemType: 'radio', //类型
      //   itemCode: '1', //编码
      //   itemDesc: 'radioTest', //名称
      //   isRequired: false, //是否必填
      //   options: [{ //描述
      //     optionDes: '',
      //     optionId: '0'
      //   }, {
      //     optionDes: '',
      //     optionId: '1'
      //   }],
      //   itemGrade: '1', //级别
      // },
      // {
      //   itemType: 'checkbox', //类型
      //   itemCode: '2', //编码
      //   itemDesc: 'checkboxTest', //名称
      //   isRequired: true, //是否必填
      //   options: [{ //描述
      //     optionDes: '',
      //     optionId: '0'
      //   }, {
      //     optionDes: '',
      //     optionId: '1'
      //   }],
      //   itemGrade: '1', //级别
      // },
      // {
      //   itemType: 'text', //类型
      //   itemCode: '3', //编码
      //   itemDesc: 'textTest', //名称
      //   isRequired: true, //是否必填
      //   itemGrade: '1', //级别
      // },
      // {
      //   itemType: 'rate-single', //类型
      //   itemCode: '4', //编码
      //   itemDesc: '', //名称
      //   isRequired: false, //是否必填
      //   options: [{ //描述
      //     optionDes: '',
      //     optionId: '0'
      //   }],
      //   itemGrade: '1', //级别
      // },
      // {
      //   itemType: 'rate-multi', //类型
      //   itemCode: '5', //编码
      //   itemDesc: '', //名称
      //   isRequired: false, //是否必填
      //   options: [{ //描述
      //     optionDes: '',
      //     optionId: '0'
      //   }],
      //   itemGrade: '1', //级别
      // }
    ]
    var getTpl = questBodyHtml.innerHTML, wrap = document.getElementById('questBodyWrap');
    laytpl(getTpl).render(questList, function (html) {
      wrap.innerHTML = html;
      form.render()

    });
  }
  element.on('tab(pageTab)', function (obj) {
    if (obj.index == 0) {
      renderStepPage1()
    } else if (obj.index == 1) {
      renderStepPage2()
    }
  });
  //默认打开tab
  element.tabChange('pageTab', '11');

 
});