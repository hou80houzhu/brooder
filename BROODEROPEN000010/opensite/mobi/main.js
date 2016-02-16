/*!
 * @packet opensite.mobi.main; 
 * @require opensite.mobi.util.touch;
 * @require opensite.mobi.form;
 * @template opensite.mobi.template.template;
 * @json opensite.mobi.data.menu;
 * @css opensite.mobi.style.main;
 * @css opensite.mobi.style.style;
 * @css lib.prism;
 * @js lib.prism;
 */Module({name:"main",extend:"viewgroup",className:"main",init:function(){this.addChild({type:"@.menu"}).done(function(t){this._menu=t,this.setMenu()}),this.addChild({type:"@.mainwindow",container:this.dom}).done(function(t){t.addChild({type:"@.mainpage",container:t.container})});var t=this;$(window).bind("online",function(){t.removeOffline()}).bind("offline",function(){t.setOffline()})},setMenu:function(){var t=this;this.dom.touch(function(i){"down"===i.action?i.xis<=10&&(t._menu.show(),t._menu.resetContainer(),t._menu.setContainerOffset(i.xis),i.stopPropagation(),i.preventDefault()):"move"===i.action?t._menu.setContainerOffset(i.offsetX):t._menu.setContainerEnd(i.offsetX,i.timeLast,i.direction)})},event_menu:function(){this._menu.open()},event_menuclick:function(t){this.addChild({type:t.data.view,option:{title:t.data.info.title,list:{url:basePath+"pages/"+t.data.info.page+".html"}}}),this._menu.close()},event_editicon:function(t){this.getChildAt(0).editicon(t.data),t.stopPropagation()},setOffline:function(){var t="<div class='offline'><div class='offline-desc'><i class='fa fa-globe'></i> 没有网络连接，请检查网络连接</div></div>";$("body").append(t)},removeOffline:function(){$(".offline").remove()}}),Module({name:"menu",extend:"view",className:"menu",template:module.getTemplate("@template","menu"),option:{width:290},init:function(){this.render({option:this.option,data:module.getJson("@menu").data}),this._container=this.finders("container"),this._container.transform().x(-this.option.width)},find_mask:function(t){this._mask=t;var i=this;t.bind("touchstart",function(){i.setContainerEnd(0)})},find_quit:function(t){this._quit=t},find_container:function(t){var i=this;t.touch(function(t){"down"===t.action?i.resetContainer():"move"===t.action?("left"===t.direction||"right"===t.direction)&&i.setContainerOffsetp(t.offsetX):("left"===t.direction||"right"===t.direction)&&i.setContainerEnd(t.offsetX,t.timeLast,t.direction)})},group_item:function(t){var i=this;t.button(function(){var t=$(this).attr("num").split("-"),n=module.getJson("@menu").data,o={};n&&(o=n[t[0]].list[t[1]]),i.dispatchEvent("menuclick",o)})},show:function(){this.dom.show()},hide:function(){this.dom.hide()},open:function(){this.show();var t=this;setTimeout(function(){t._container.transition().all().scope().transform().x(0)},10)},close:function(){var t=this;this._container.transition().all().done(function(){t.hide()}).scope().transform().x(-this.option.width)},resetContainer:function(){this._container.transition().removeAll()},setContainerOffset:function(t){t>this.option.width&&(t=this.option.width),this._container.transform().x(t-this.option.width)},setContainerOffsetp:function(t){t>0&&(t=0),this._container.transform().x(t)},setContainerEnd:function(t,i,n){var o=this;120>i?"right"===n?this._container.transition().all().scope().transform().x(0):this._container.transition().all().done(function(){o.hide()}).scope().transform().x(-this.option.width):t>0?t<this.option.width/2?this._container.transition().all().done(function(){o.hide()}).scope().transform().x(-this.option.width):this._container.transition().all().scope().transform().x(0):0>t?(t=this.option.width-Math.abs(t),t<this.option.width/2?this._container.transition().all().done(function(){o.hide()}).scope().transform().x(-this.option.width):this._container.transition().all().scope().transform().x(0)):this._container.transition().all().done(function(){o.hide()}).scope().transform().x(-this.option.width)},editicon:function(t){this.dom.find("img").attr("src",t)}}),Module({name:"mainwindow",extend:"viewgroup",className:"win",option:{leftBtns:[{action:"menu",icon:"fa fa-menu"}],rightBtns:[],title:"Packet",inner:"",option:""},layout:module.getTemplate("@template","mainwindow"),init:function(){$.loader().js("https://buttons.github.io/buttons.js",null,null,{id:"github-bjs"})},group_btns:function(t){var i=this;t.items().each(function(){$(this).button(function(){i.dispatchEvent($(this).item().name,{btn:$(this)})})})},find_container:function(t){this.container=t},refreshList:function(){this.getChildAt(0).refreshList()}}),Module({name:"subwin",extend:"viewgroup",className:"subwin",option:{btns:[],title:"sub window"},layout:module.getTemplate("@template","subwin"),init:function(){var t=this;this._ismove=!1,this.dom.transition().all().done(function(){t.winin&&t.winin()}).scope().transform().x(0)},group_btns:function(t){var i=this;t.items().each(function(t){$(this).button(function(){i.dispatchEvent($(this).item().name,{btn:$(this)})})})},find_container:function(t){this._container=t;var i=this;t.touch(function(t){if("down"===t.action)t.xis<=20&&(i.dom.transition().removeAll(),i._xis=i.dom.transform().x(),i._ismove=!0);else if("move"===t.action){if(i._ismove&&("left"===t.direction||"right"===t.direction)){var n=i._xis+t.offsetX;0>n&&(n=0),i.dom.transform().x(n),t.stopPropagation(),t.preventDefault()}}else if(i._ismove)if(i._ismove=!1,Math.abs(t.offsetX/t.timeLast>1))"right"===t.direction&&i.dom.transition().all().done(function(){this.remove()}).scope().transform().x("100%");else{var n=i.dom.transform().x();n>$(window).width()/2?i.dom.transition().all().done(function(){this.remove()}).scope().transform().x("100%"):i.dom.transition().all().scope().transform().x(0)}})},close:function(){this.dom.transition().all().done(function(){this.remove()}).scope().transform().x("100%")},event_close:function(t){this.close(),t.stopPropagation()}}),Module({name:"datalist",extend:"view",className:"datalist",option:{url:"data/datalist.json",id:null},template:module.getTemplate("@template","datalist"),init:function(){this.offset=0,this.loading=!1,this.istop=!0,this.isend=!1,this.doty=0,this.render(),this.setBaseContainer(),this.finders("nodata").hide(),this.setDefaultParameter&&this.setDefaultParameter(),this.getData(),this.firstloading=!0},setBaseContainer:function(){var t=this,i=this.finders("dot");this.finders("baseContainer").bind("scroll",function(i){var n=$(this).scrollTop();0===n?(t.istop=!0,t.dispatchEvent("scrolltop")):n>=t.offset?(t.istop=!1,t.dispatchEvent("scrollbottom")):t.istop=!1,i.stopPropagation(),i.preventDefault()}),this.finders("baseContainer").touch(function(n){if("down"===n.action)t.istop===!0&&(t.doty=i.transform().y(),i.transition().removeAll());else if("move"===n.action){if(t.istop===!0&&"bottom"===n.direction){var o=t.doty+n.offsetY/2;o>70&&(o=70),i.transform().y(o),n.stopPropagation(),n.preventDefault()}}else i.transform().y()>=70?(i.children(0).addClass("fa-spin"),t.refresh(function(){i.children(0).removeClass("fa-spin"),i.transition().all().scope().transform().y(-60)},function(){i.children(0).removeClass("fa-spin"),i.transition().all().scope().transform().y(-60)})):i.transition().all().scope().transform().y(-60);t.dispatchEvent("touchlist")})},refresh:function(t){this.firstloading=!0,this.finders("container").empty(),this.current=0,this.isend=!1,this.finders("loading").show(),this.finders("nodata").hide(),this.getData(t)},getData:function(t,i){var n=this;this.loading||this.isend||(this.loading=!0,$.loader().text(this.option.url,function(i){var o=i.match(/<body>[\S\s]*?<\/body>/);if(o&&(i="<div class='content-p-code'>"+o[0].substring(6,o[0].length-7)+"</div>"),n.loading=!1,n.firstloading=!1,n.finders("nodata").hide(),n.finders("container").show(),n.finders("loading").hide(),n.finders("container").html(i),n.delegate(),null!==n.option.id){var e=n.dom.find("h2").eq(n.option.id);e.length>0&&n.finders("baseContainer").scrollTop(e.get(0).offsetTop)}n.dispatchEvent("datalistlitedone"),t&&t(i)}))}}),Module({name:"sublistwin",extend:"@.subwin",option:{btns:[],title:"sub list window",listType:"@.datalist",list:{url:"data/datalist.json"}},init:function(){this.superClass("init")},winin:function(){this.addChild({type:this.option.listType,option:this.option.list,container:this.finders("container")}).done(function(){this.listend&&this.listend()})}}),Module({name:"mainpage",extend:"viewgroup",className:"mainpage",option:{listType:"@.datalist"},layout:module.getTemplate("@template","mainpage"),onbeforeinit:function(){this.option[this.option.listType]={url:basePath+"pages/about.html"}},refreshList:function(){this.getChildByType("@.datalist").refresh()},event_refreshlist:function(t){this.getChildByType("@.datalist").refresh()},event_touchlist:function(t){t.stopPropagation()}}),Module({name:"todo",extend:"@.sublistwin",init:function(){this.superClass("init")},event_datalistlitedone:function(){this.dom.find(".language-scss").each(function(){Prism.highlightElement($(this).get(0))}),this.dom.find(".language-javascript").each(function(){Prism.highlightElement($(this).get(0))}),this.dom.find(".language-html").each(function(){Prism.highlightElement($(this).get(0))}),this.addChild({type:"demo.todolist.todolist.todolist",container:this.dom.find(".demoshow")}).done(function(){this.dom.find(".demoshowloading").remove()})}}),Module({name:"api",extend:"@.subwin",option:{title:"sub list window",listType:"@.datalist",list:{url:"data/datalist.json"}},onbeforeinit:function(){this.option.list.override={find_link:function(t){var i=this;t.button(function(){i.dispatchEvent("click",{title:$(this).parent(2).children(0).html(),page:$(this).parent(2).dataset("href"),id:$(this).index()})})}}},init:function(){this.superClass("init")},winin:function(){this.addChild({type:this.option.listType,option:this.option.list,container:this.finders("container")}).done(function(){this.listend&&this.listend()})},event_click:function(t){this.addChild({type:"@.sublistwin",option:{title:t.data.title,list:{url:basePath+"pages/api/"+t.data.page+".html",id:t.data.id}}}),t.stopPropagation()}}),$.toast=function(t){$("<div class='toast'><div class='toast_text'>"+t+"</div></div>").appendTo("body").transition().set("-all-transform").done(function(){this.transition().removeAll().set("opacity",{time:1e3}).delay(2e3).then(function(){this.css("opacity",0)}).delay(1e3).done(function(){this.remove()}).resolve()}).scope().transform().y(-150)},$.loadingbar=function(){var t=$("#loadingbar");return 0===t.length&&(t=$("<div id='loadingbar'><div class='loadingbar-bg'></div><div class='loadingbar-desc'></div></div>").appendTo("body")),new loadingbar(t)};var loadingbar=function(t){this.dom=t};loadingbar.prototype.showLoading=function(t){return this.dom.children(1).html("<i class='fa fa-repeat fa-spin'></i> "+(t||"Loading...")),this},loadingbar.prototype.showError=function(t){var i=$.promise(),n=this;return setTimeout(function(){n.close(),i.resolve()},2e3),this.dom.children(1).html("<i class='fa fa-circle-cross'></i> "+(t||"操作错误")),i},loadingbar.prototype.showSuccess=function(t){var i=$.promise(),n=this;return setTimeout(function(){n.close(),i.resolve()},2e3),this.dom.children(1).html("<i class='fa fa-circle-check'></i> "+(t||"操作成功")),i},loadingbar.prototype.close=function(){this.dom.remove()};