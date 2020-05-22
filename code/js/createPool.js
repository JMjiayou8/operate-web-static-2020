//一般直接写在一个js文件中
layui.use(['form', 'laytpl', 'jquery', 'table', 'element', 'layer', 'laydate','upload'], function () {
  var laytpl = layui.laytpl,
    $ = layui.jquery,
    element = layui.element,
    layer = layui.layer,
    laydate = layui.laydate,
    upload=layui.upload,
    form = layui.form;

  /******************************************************* 第一步 *******************************************************/
  window.nextPage1 = function () {
    element.tabChange('pageTab', '22');
    renderConfigUser()
  }
  /******************************************************* 第二步 *******************************************************/
  var configData = {
    configList1: [{
      option1: '0',
      option2: '1',
      option3: '',
      option4: '',
    }, {
      option1: '0',
      option2: '1',
      option3: '',
      option4: '',
    }],
    configList2: [{
      option1: '0',
      option2: '1',
      option3: '1'
    }, {
      option1: '0',
      option2: '1',
      option3: '1'
    }],
  }
  // 渲染配置页面
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
      configData: configData
    }
    var getTpl = configChooseUser.innerHTML, wrap = document.getElementById('configChooseUserWrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      form.render();
      data.configData.configList2.forEach(function (item, index) {
        laydate.render({
          elem: '#rangeDate' + index,
          type: 'date',
          range: true,
        });
      })
    });
  }
  window.addConfig1 = function () {
    configData.configList1.push({
      option1: '0',
      option2: '1',
      option3: '',
      option4: '',
    })
    renderConfigUser()
  }
  window.addConfig2 = function () {
    configData.configList2.push({
      option1: '0',
      option2: '1',
      option3: '1',
    })
    renderConfigUser()
  }
  window.delConfig1 = function (index) {
    if (configData.configList1.length > 2) {
      configData.configList1.splice(index, 1)
      renderConfigUser()
    } else {
      layer.msg('至少保留两条配置')
    }
  }
  window.delConfig2 = function (index) {
    if (configData.configList2.length > 2) {
      configData.configList2.splice(index, 1)
      renderConfigUser()
    } else {
      layer.msg('至少保留两条配置')
    }
  }
  $(document).on('click', '.real-icon', function (evt) {
    var text = $(evt.target).text();
    $(evt.target).text(text == '且' ? '或' : '且')
  })
  window.nextPage2 = function () {
    console.log('第二步数据===', configData)
    element.tabChange('pageTab', '33');
    renderConfigStep3()
  }
  window.firstPage=function(){
    element.tabChange('pageTab', '11');
  }
  upload.render({
    elem: '#uploadFile',
    // url: '/upload/',
    before: function (obj) {
      //预读本地文件示例，不支持ie8
      obj.preview(function (index, file, result) {
        console.log(file)
        // $('#demo1').attr('src', result); //图片链接（base64）
      });
    },
    done: function (res) {
      console.log(res)
    }
  });
  /******************************************************* 第三步 *******************************************************/

  var configStep3Data = [{
    option1: '1',
    option2: '1',
    option3: '',
    option4: '',
  }, {
    option1: '2',
    option2: '1',
    option3: '',
    option4: '',
  }];
  // 渲染配置页面
  function renderConfigStep3 () {
    var data = {
      optionList1: [
        {
          value: '1',
          text: '收入'
        },
        {
          value: '2',
          text: '离网率'
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
      configData: configStep3Data
    }
    var getTpl = configStep3.innerHTML, wrap = document.getElementById('configStep3Wrap');
    laytpl(getTpl).render(data, function (html) {
      wrap.innerHTML = html;
      form.render();
    });
  }
  window.addConfig3 = function () {
    configStep3Data.push({
      option1: '0',
      option2: '1',
      option3: '',
      option4: '',
    })
    renderConfigStep3()
  }
  window.delConfig3 = function (index) {
    if (configStep3Data.length > 2) {
      configStep3Data.splice(index, 1)
      renderConfigStep3()
    } else {
      layer.msg('至少保留两条配置')
    }
  }

  /******************************************************* tab操作 *******************************************************/
  element.on('tab(pageTab)', function (obj) {
    if (obj.index == 0) {
    } else if (obj.index == 1) {
      renderConfigUser()
    } else if (obj.index == 2) {
      renderConfigStep3()
    }
  });
  //默认打开tab
  element.tabChange('pageTab', '11');
});