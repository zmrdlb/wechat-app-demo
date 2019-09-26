// pages/form/form.js
const FormValidator = require('../../app-utils/validation/weui-form-validator.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errors: [],

    radioItems: [
      { name: 'cell standard', value: '0', checked: true },
      { name: 'cell standard', value: '1' }
    ],
    checkboxItems: [
      { name: 'standard is dealt for u.', value: '0', checked: true },
      { name: 'standard is dealicient for u.', value: '1' }
    ],
    formData: {
      date: ''
    },
    rules: [{
      name: 'radio',
      rules: { required: true, message: '单选列表是必选项' },
    }, {
      name: 'checkbox',
      rules: { required: true, message: '多选列表是必选项' },
    }, {
      name: 'qq',
      rules: [{ required: true, message: 'qq必填' }, { qq: true, validator: FormValidator.qq, message: '请输入有效的qq号' }],
    }, { // 多个规则
      name: 'mobile',
      rules: [{ required: false, message: 'mobile必填' }, { mobile: true, message: 'mobile格式不对' }]
    }, {
      name: 'date',
      rules: { required: true }
    },{
      name: 'vcode',
      rules: [{ required: true, message: '验证码必填' }, { rangelength: true, param: [6,6], message: '请输入6位验证码' }],
    }, {
      name: 'idcard',
      rules: { required: true, message: 'idcard必填' },
    }],

    // 页面参数
    owner: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    //初始化 this.data.formData
    var radio = this.data.radioItems.find(item => item.checked).value;
    var checkbox = this.data.checkboxItems.filter(item => item.checked).map(item => item.value);
    this.setData({
      'formData.radio': radio,
      'formData.checkbox': checkbox,
      'owner': query.owner
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      'formData.radio': e.detail.value
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      'formData.checkbox': e.detail.value
    });
  },
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  dateChange(e){
    this.setData({
      'formData.date': e.detail.value
    })
  },
  submitForm() {
    console.log(this.data.formData);
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        this.setData({
          errors: errors.map((item,index) => {return {message:item.message,index:index}})
        })
      } else {
        this.setData({
          errors: []
        })
        wx.showToast({
          title: '校验通过'
        })
      }
    })
  }

})