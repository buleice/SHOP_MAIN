
const needHideWxApiList=['ReceiveCourse','receiveSuccess']
function hideMenus(){
    window.wx.hideMenuItems({
        menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    });
}
function onBridgeReady(){
    if (typeof WeixinJSBridge == "undefined"){  
        if( document.addEventListener ){  
            document.addEventListener('WeixinJSBridgeReady', hideMenus, false);  
        }else if (document.attachEvent){  
            document.attachEvent('WeixinJSBridgeReady', hideMenus);   
            document.attachEvent('onWeixinJSBridgeReady', hideMenus);  
        }  
    }else{  
        hideMenus();  
    }  
}
export function shareControl(current){
  if(needHideWxApiList.includes(current)){
    onBridgeReady
  }else{
    window.wx.showAllNonBaseMenuItem();
  }
}