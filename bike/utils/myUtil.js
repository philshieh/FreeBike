//查找内存里的数据信息
function get(key){
  //先在内存中取
  var value = wx.getStorageSync(key);
  
  if (!value) {
    //在内存中没取到，取默认值
     value = getApp().globalData[key];
  }
  return value;
}

module.exports ={
  get
}