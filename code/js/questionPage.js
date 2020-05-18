//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'jquery', 'table', 'element', 'layer'], function () {
  var laytpl = layui.laytpl,
    $ = layui.jquery,
    table = layui.table,
    element = layui.element,
    layer = layui.layer,
    form = layui.form;

  /******************************************************* 选择客户群 *******************************************************/
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
  window.nextPage1 = function () {
    element.tabChange('pageTab', '22');
  }
  /******************************************************* 创建问卷 *******************************************************/
  //保存第二步数据
  var questPageData = {
    questTitle: "",  // 问卷标题
    questList: []  // 问卷列表数据
  };
  // //测试数据
  // var questPageData = {
  //   questTitle: "客户满意度调查",  // 问卷标题
  //   questList: [{
  //     itemType: 'radio', //类型
  //     itemCode: '', //编码
  //     itemDesc: '问题一', //名称
  //     isRequired: true, //是否必填
  //     options: [{ //描述
  //       optionDes: '选项0',
  //       optionId: '0'
  //     }, {
  //       optionDes: '选项1',
  //       optionId: '1'
  //     }, { //描述
  //       optionDes: '选项2',
  //       optionId: '2'
  //     }, {
  //       optionDes: '选项3',
  //       optionId: '3'
  //     }, { //描述
  //       optionDes: '选项4',
  //       optionId: '4'
  //     }, {
  //       optionDes: '选项5',
  //       optionId: '5'
  //     }],
  //     itemGrade: '1', //级别
  //   }, {
  //     itemType: 'checkbox', //类型
  //     itemCode: '', //编码
  //     itemDesc: '问题二', //名称
  //     isRequired: true, //是否必填
  //     options: [{ //描述
  //       optionDes: '选项0',
  //       optionId: '0'
  //     }, {
  //       optionDes: '选项1',
  //       optionId: '1'
  //     }],
  //     itemGrade: '1', //级别
  //   }, {
  //     itemType: 'text', //类型
  //     itemCode: '', //编码
  //     itemDesc: '问题三', //名称
  //     isRequired: true, //是否必填
  //     itemGrade: '1', //级别
  //   }, {
  //     itemType: 'rateSingle', //类型
  //     itemCode: '', //编码
  //     itemDesc: '问题四', //名称
  //     isRequired: false, //是否必填
  //     options: [{ //描述
  //       optionDes: '选项0',
  //       optionId: '0',
  //       rateNum: 1
  //     }, {
  //       optionDes: '选项1',
  //       optionId: '1',
  //       rateNum: 2
  //     }],
  //     itemGrade: '1', //级别
  //   },
  //   {
  //     itemType: 'rateMulti', //类型
  //     itemCode: '', //编码
  //     itemDesc: '问题五', //名称
  //     isRequired: false, //是否必填
  //     options: [{ //描述
  //       optionDes: '选项0',
  //       optionId: '0',
  //       rateNum: 1
  //     }, {
  //       optionDes: '选项1',
  //       optionId: '1',
  //       rateNum: 2
  //     }],
  //     itemGrade: '1', //级别
  //   }]  // 问卷列表数据
  // };
  // 问卷类型映射关系
  var questItemMap = {
    radio: {
      itemType: 'radio', //类型
      itemCode: '', //编码
      itemDesc: '', //名称
      isRequired: true, //是否必填
      options: [{ //描述
        optionDes: '选项0',
        optionId: '0'
      }, {
        optionDes: '选项1',
        optionId: '1'
      }],
      itemGrade: '1', //级别
    },
    checkbox: {
      itemType: 'checkbox', //类型
      itemCode: '', //编码
      itemDesc: '', //名称
      isRequired: true, //是否必填
      options: [{ //描述
        optionDes: '',
        optionId: '0'
      }, {
        optionDes: '',
        optionId: '1'
      }],
      itemGrade: '1', //级别
    },
    text: {
      itemType: 'text', //类型
      itemCode: '', //编码
      itemDesc: '', //名称
      isRequired: true, //是否必填
      itemGrade: '1', //级别
    },
    rateSingle: {
      itemType: 'rateSingle', //类型
      itemCode: '', //编码
      itemDesc: '', //名称
      isRequired: false, //是否必填
      options: [{ //描述
        optionDes: '选项0',
        optionId: '0',
        rateNum: 1
      }, {
        optionDes: '选项1',
        optionId: '1',
        rateNum: 2
      }],
      itemGrade: '1', //级别
    },
    rateMulti: {
      itemType: 'rateMulti', //类型
      itemCode: '', //编码
      itemDesc: '', //名称
      isRequired: false, //是否必填
      options: [{ //描述
        optionDes: '选项0',
        optionId: '0',
        rateNum: 1
      }, {
        optionDes: '选项1',
        optionId: '1',
        rateNum: 2
      }],
      itemGrade: '1', //级别
    }
  }
  // 渲染创建问卷
  function renderStepPage2 () {
    var getTpl = questBodyHtml.innerHTML, wrap = document.getElementById('questBodyWrap');
    laytpl(getTpl).render(questPageData, function (html) {
      wrap.innerHTML = html;
      form.render()
    });
  }
  window.getQuestTitleInput = function (obj) {
    questPageData.questTitle = $(obj).val()
    renderStepPage2()
  }
  // 获取题型标题
  window.getTitleInput = function (obj, index) {
    questPageData.questList[index].itemDesc = $(obj).val()
    renderStepPage2()
    renderOutLine()
  }
  //题型选择
  window.addQuestItem = function (type) {
    questPageData.questList.push(questItemMap[type])
    renderStepPage2()
  }
  // 删除题目
  window.delItem = function (itemIndex) {
    questPageData.questList.splice(itemIndex, 1)
    renderStepPage2()
  }
  // 上下移动题目
  window.exchangeItem = function (index1, index2) {
    if (index1 > -1 && index2 > -1 && index2 < questPageData.questList.length) {
      var temp = questPageData.questList[index1];
      questPageData.questList[index1] = questPageData.questList[index2];
      questPageData.questList[index2] = temp;
      renderStepPage2()
    } else {
      layer.msg('不可移动了')
    }
  }
  // 获取选项标题
  window.getOptionInput = function (obj, index, optionIndex) {
    questPageData.questList[index].options[optionIndex].optionDes = $(obj).val()
    renderStepPage2()
  }
  // 添加选项
  window.addOption = function (itemIndex) {
    var option = {
      optionDes: "选项",
      optionId: ""
    }
    if (['rateSingle', 'rateMulti'].indexOf(questPageData.questList[itemIndex].itemType) > -1) {
      option.rateNum = 0;
    }
    questPageData.questList[itemIndex].options.push(option)
    renderStepPage2()
  }
  // 删除选项
  window.delOption = function (itemIndex, optionIndex) {
    questPageData.questList[itemIndex].options.splice(optionIndex, 1)
    renderStepPage2()
  }
  // 上下移动选项
  window.exchangeOption = function (itemIndex, index1, index2) {
    if (index1 > -1 && index2 > -1 && index2 < questPageData.questList[itemIndex].options.length) {
      var temp = questPageData.questList[itemIndex].options[index1];
      questPageData.questList[itemIndex].options[index1] = questPageData.questList[itemIndex].options[index2];
      questPageData.questList[itemIndex].options[index2] = temp;
      renderStepPage2()
    } else {
      layer.msg('不可移动了')
    }
  }
  // 评分项获取分值设置
  window.getRateInput = function (obj, index, optionIndex) {
    questPageData.questList[index].options[optionIndex].rateNum = parseInt($(obj).val())
    renderStepPage2()
  }
  // 必答选项交互渲染
  window.changeRequired = function (obj, index) {
    questPageData.questList[index].isRequired = $(obj).prop("checked")
    renderStepPage2()
  }
  // 渲染问题大纲
  function renderOutLine () {
    var titles = []
    questPageData.questList.forEach(function (item) {
      titles.push(item.itemDesc)
    })
    var getTpl = outlineHtml.innerHTML, wrap = document.getElementById('outlineWrap');
    laytpl(getTpl).render(titles, function (html) {
      wrap.innerHTML = html;
    });
  }
  element.on('tab(tabBrief)', function (obj) {
    //问题大纲
    if (obj.index == 1) {
      renderOutLine()
    }
  })
  window.nextPage2 = function () {
    console.log('第二步数据===', questPageData)
    element.tabChange('pageTab', '33');
    renderPhone()
  }
  /******************************************************* 问卷预览 *******************************************************/
  function renderComputer () {
    var getTpl = computerHtml.innerHTML, wrap = document.getElementById('computerWrap');
    laytpl(getTpl).render(questPageData, function (html) {
      wrap.innerHTML = html;
      form.render()
    });
  }
  function renderPhone () {
    var getTpl = phoneHtml.innerHTML, wrap = document.getElementById('phoneWrap');
    laytpl(getTpl).render(questPageData, function (html) {
      wrap.innerHTML = html;
      form.render()
    });
  }
  window.nextPage3 = function () {
    element.tabChange('pageTab', '44');
  }
  element.on('tab(tabPhoneComputer)', function (obj) {
    if (obj.index == 0) {
      renderPhone()
    } else if (obj.index == 1) {
      renderComputer()
    }
  });
  /******************************************************* tab操作 *******************************************************/
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