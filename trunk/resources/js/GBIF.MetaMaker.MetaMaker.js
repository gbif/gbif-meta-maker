/*
 * MetaMaker
 * Copyright(c) 2010, SilverBiology.
 * 
 * This code is licensed under Apache License 2.0. Use it as you wish, but keep this copyright intact.
 * Source found at: http://code.google.com/p/gbif-meta-maker/
 */


Ext.override(Ext.Tip,{showAt:function(xy){Ext.Tip.superclass.show.call(this);if(this.isVisible()){if(this.measureWidth!==false&&(!this.initialConfig||typeof this.initialConfig.width!='number')){this.doAutoWidth();}
if(this.constrainPosition){xy=this.el.adjustForConstraints(xy);}
this.setPagePosition(xy[0],xy[1]);}}});Ext.override(Ext.ToolTip,{show:function(){if(this.anchor){this.showAt([-1000,-1000]);this.origConstrainPosition=this.constrainPosition;this.constrainPosition=false;this.anchor=this.origAnchor;}
this.showAt(this.getTargetXY());if(this.isVisible()){if(this.anchor){this.syncAnchor();this.anchorEl.show();this.constrainPosition=this.origConstrainPosition;}else{this.anchorEl.hide();}}}});Ext.ux.DataTip=Ext.extend(Ext.ToolTip,(function(){function onHostRender(){var e=this.body||this.el;if(this.dataTip.renderToTarget){this.dataTip.render(e);}
this.dataTip.initTarget(e);}
function updateTip(tip,data){if(tip.rendered){tip.update(data);}else{if(Ext.isString(data)){tip.html=data;}else{tip.data=data;}}}
function beforeTreeTipShow(tip){var e=Ext.fly(tip.triggerElement).findParent('div.x-tree-node-el',null,true),node=e?tip.host.getNodeById(e.getAttribute('tree-node-id','ext')):null;switch(node.attributes.type){case'extension':updateTip(tip,node.attributes);break;case'attribute':updateTip(tip,node.attributes);break;default:return false;}}
function beforeGridTipShow(tip){var rec=this.host.getStore().getAt(this.host.getView().findRowIndex(tip.triggerElement));if(rec){updateTip(tip,rec.data);}else{return false;}}
function beforeViewTipShow(tip){var rec=this.host.getRecord(tip.triggerElement);if(rec){updateTip(tip,rec.data);}else{return false;}}
function beforeFormTipShow(tip){var el=Ext.fly(tip.triggerElement).child('input,textarea'),field=el?this.host.getForm().findField(el.id):null;if(field&&(field.tooltip||tip.tpl)){updateTip(tip,field.tooltip||field);}else{return false;}}
function beforeComboTipShow(tip){var rec=this.host.store.getAt(this.host.selectedIndex);if(rec){updateTip(tip,rec.data);}else{return false;}}
return{init:function(host){host.dataTip=this;this.host=host;if(host instanceof Ext.tree.TreePanel){this.delegate=this.delegate||'div.x-tree-node-el';this.on('beforeshow',beforeTreeTipShow);}else if(host instanceof Ext.grid.GridPanel){this.delegate=this.delegate||host.getView().rowSelector;this.on('beforeshow',beforeGridTipShow);}else if(host instanceof Ext.DataView){this.delegate=this.delegate||host.itemSelector;this.on('beforeshow',beforeViewTipShow);}else if(host instanceof Ext.FormPanel){this.delegate='div.x-form-item';this.on('beforeshow',beforeFormTipShow);}else if(host instanceof Ext.form.ComboBox){this.delegate=this.delegate||host.itemSelector;this.on('beforeshow',beforeComboTipShow);}
if(host.rendered){onHostRender.call(host);}else{host.onRender=host.onRender.createSequence(onHostRender);}}};})());

Ext.namespace('Ext.ux.dd');Ext.ux.dd.GridReorderDropTarget=function(grid,config){this.target=new Ext.dd.DropTarget(grid.getEl(),{ddGroup:grid.ddGroup||'GridDD',grid:grid,gridDropTarget:this,notifyDrop:function(dd,e,data){var t=Ext.lib.Event.getTarget(e);var rindex=this.grid.getView().findRowIndex(t);if(rindex===false)return false;if(rindex==data.rowIndex)return false;if(this.gridDropTarget.fireEvent(this.copy?'beforerowcopy':'beforerowmove',this.gridDropTarget,data.rowIndex,rindex,data.selections)===false)return false;var ds=this.grid.getStore();if(!this.copy){for(i=0;i<data.selections.length;i++){ds.remove(ds.getById(data.selections[i].id));}}
ds.insert(rindex,data.selections);var sm=this.grid.getSelectionModel();if(sm)sm.selectRecords(data.selections);this.gridDropTarget.fireEvent(this.copy?'afterrowcopy':'afterrowmove',this.gridDropTarget,data.rowIndex,rindex,data.selections);return true;},notifyOver:function(dd,e,data){var t=Ext.lib.Event.getTarget(e);var rindex=this.grid.getView().findRowIndex(t);if(rindex==data.rowIndex)rindex=false;return(rindex===false)?this.dropNotAllowed:this.dropAllowed;}});if(config){Ext.apply(this.target,config);if(config.listeners)Ext.apply(this,{listeners:config.listeners});}
this.addEvents({"beforerowmove":true,"afterrowmove":true,"beforerowcopy":true,"afterrowcopy":true});Ext.ux.dd.GridReorderDropTarget.superclass.constructor.call(this);};Ext.extend(Ext.ux.dd.GridReorderDropTarget,Ext.util.Observable,{getTarget:function(){return this.target;},getGrid:function(){return this.target.grid;},getCopy:function(){return this.target.copy?true:false;},setCopy:function(b){this.target.copy=b?true:false;}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.Center=function(config){this.metaMakerCenterTab=new GBIF.MetaMaker.CenterTab({region:'center'});this.extensionsTree=new GBIF.MetaMaker.ExtensionsTree({region:'west',width:250,minWidth:250,maxWidth:250,split:true,listeners:{dblclick:this.loadExtension,checkchange:this.checkchange,click:this.activateTab,scope:this}},this);Ext.apply(this,config,{layout:'border',defaults:{border:false},items:[this.extensionsTree,this.metaMakerCenterTab]});GBIF.MetaMaker.Center.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.Center,Ext.Panel,{loadExtension:function(node){},activateTab:function(node){if(this.metaMakerCenterTab.findById("extension-"+node.id)){this.metaMakerCenterTab.setActiveTab("extension-"+node.id);}},checkchange:function(node,state){switch(node.attributes.type){case'core':if(state==false){this.extensionsTree.suspendEvents();node.getUI().toggleCheck(true);this.extensionsTree.resumeEvents();return;}
var previousCoreItem=this.extensionsTree.toggleCore(node.id,state);this.metaMakerCenterTab.hideTabStripItem("core-"+previousCoreItem);this.metaMakerCenterTab.getComponent("core-"+previousCoreItem).skip=true;this.metaMakerCenterTab.unhideTabStripItem("core-"+node.id);this.metaMakerCenterTab.getComponent("core-"+node.id).skip=false;this.metaMakerCenterTab.setActiveTab("core-"+node.id);node.expand();break;case'extension':if(state){if(this.metaMakerCenterTab.findById("extension-"+node.id)){this.metaMakerCenterTab.unhideTabStripItem("extension-"+node.id);this.metaMakerCenterTab.getComponent("extension-"+node.id).skip=false;this.metaMakerCenterTab.setActiveTab("extension-"+node.id);}else{this.metaMakerCenterTab.add(new GBIF.MetaMaker.ExtensionPanel({id:"extension-"+node.id,title:node.text,type:'ext',skip:false,identifier:node.attributes.identifier}));this.metaMakerCenterTab.setActiveTab("extension-"+node.id);node.expand();}}else{this.metaMakerCenterTab.hideTabStripItem("extension-"+node.id);this.metaMakerCenterTab.getComponent("extension-"+node.id).skip=true;if(this.metaMakerCenterTab.getActiveTab().id=="meta"){this.metaMakerCenterTab.checkTab(this.metaMakerCenterTab,this.metaMakerCenterTab.getComponent("meta"));}else{this.metaMakerCenterTab.setActiveTab("meta");}}
break;case'attribute':if(node.attributes.required=="true"&&state==false){node.suspendEvents();node.getUI().toggleCheck(true);node.resumeEvents();return(false);}
var prefix=node.parentNode.attributes.type;if(!node.parentNode.attributes.checked){node.parentNode.getUI().toggleCheck();}
var tmpTab=this.metaMakerCenterTab.findById(prefix+"-"+node.parentNode.id);if(tmpTab){this.metaMakerCenterTab.unhideTabStripItem(prefix+"-"+node.parentNode.id);this.metaMakerCenterTab.setActiveTab(prefix+"-"+node.parentNode.id);}else{tmpTab=new GBIF.MetaMaker.ExtensionPanel({id:"ext-"+node.parentNode.id,title:node.parentNode.text,type:'ext',identifier:node.parentNode.attributes.identifier});this.metaMakerCenterTab.add(tmpTab);this.metaMakerCenterTab.setActiveTab(tmpTab.id);}
if(state){tmpTab.extension.store.loadData([[node.attributes.term,node.attributes.dataType,node.attributes.required,node.attributes.static,node.attributes.description,node.attributes.qualName,node.attributes.namespace,node.attributes.relation]],true);}else{var index=tmpTab.extension.store.find("term",node.attributes.term);if(index>=0){tmpTab.extension.store.remove(tmpTab.extension.store.getAt(index));}}
break;default:break;}}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.CenterTab=function(config){this.metaPanel=new GBIF.MetaMaker.MetaPanel();this.aboutPanel=new Ext.Panel({title:'About',autoLoad:'resources/docs/about.html',padding:5,bodyStyle:'font-size: 12px'});this.coreSpecimensPanel=new GBIF.MetaMaker.ExtensionPanel({id:'core-taxon',title:'Taxon',type:'core',skip:false,identifier:'http://rs.tdwg.org/dwc/terms/Taxon'});this.coreObservationsPanel=new GBIF.MetaMaker.ExtensionPanel({id:'core-occurrences',title:'Occurrences',type:'core',skip:true,identifier:'http://rs.tdwg.org/dwc/terms/Occurrence'});Ext.apply(this,config,{width:400,height:400,activeTab:0,items:[this.aboutPanel,this.metaPanel,this.coreSpecimensPanel,this.coreObservationsPanel],listeners:{tabchange:this.checkTab,render:function(){this.hideTabStripItem("core-occurrences");}}});GBIF.MetaMaker.CenterTab.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.CenterTab,Ext.TabPanel,{checkTab:function(tp,panel){if(panel){switch(panel.type){case'meta':panel.metaData.core=[];panel.metaData.extensions=[];tp.items.each(function(tab){if(!tab.skip){if(tab.type=='ext'){var tmpRec={name:tab.title,rowType:tab.identifier,filename:tab.extension.filename.getValue(),fileSettings:tab.fileSettings.prop.getSource(),fields:[]}
tab.extension.store.each(function(rec){tmpRec.fields.push({term:rec.data.term,dataType:rec.data.dataType,required:rec.data.required,static:rec.data.static,qualName:rec.data.qualName,rIndex:rec.data.rIndex,global:rec.data.global});});panel.metaData.extensions.push(tmpRec);delete(tmpRec);panel.generateXML();}
if(tab.type=='core'){var tmpProp=tab.fileSettings.prop.getSource();if(Ext.isEmpty(tmpProp)){tmpProp={'File Encoding':'UTF-8','Field Delimiter':',','Fields enclosed by':'"','Line ending':'\\r\\n','Ignore header row':true}}
var tmpRec={name:tab.title,rowType:tab.identifier,filename:tab.extension.filename.getValue(),fileSettings:tmpProp,fields:[]}
tab.extension.store.each(function(rec){tmpRec.fields.push({term:rec.data.term,dataType:rec.data.dataType,required:rec.data.required,static:rec.data.static,qualName:rec.data.qualName,rIndex:rec.data.rIndex,global:rec.data.global});});panel.metaData.core.push(tmpRec);delete(tmpRec);panel.generateXML();}}});break;default:break;}}}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.Details=function(config){Ext.apply(this,config,{height:100,title:'Details',split:true,padding:10,border:false})
GBIF.MetaMaker.Details.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.Details,Ext.Panel,{});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.Extension=function(config){var store=new Ext.data.ArrayStore({fields:[{name:'term'},{name:'dataType'},{name:'required'},{name:'static'},{name:'description'},{name:'qualName'},{name:'namespace'},{name:'relation'},{name:'global'},{name:'rIndex'}],listeners:{load:this.reindex,remove:{fn:this.reindex,delay:50},scope:this}});this.offset=0;this.filename=new Ext.form.TextField({width:250,emptyText:"{your filename here} Ex: myfile.csv"});Ext.apply(this,config,{store:store,columns:[{header:'&nbsp;',width:25,sortable:false,dataIndex:'',renderer:this.renderReorder},{header:'&nbsp;',width:25,sortable:false,dataIndex:'rIndex',renderer:this.renderIndex,scope:this,tooltip:'Related column index based on your file.'},{header:'Term',width:160,sortable:false,dataIndex:'term'},{header:'Required',width:60,sortable:false,dataIndex:'required',renderer:this.renderCheckbox},{header:'Default Value',width:200,dataIndex:'static',editor:new Ext.form.TextField(),tooltip:'Click row cell to add default value.'},{header:'Global',width:44,dataIndex:'global',editor:new Ext.form.Checkbox(),tooltip:'Check row cell to provide default without column index.',renderer:this.renderCheckbox}],stripeRows:true,tbar:[{text:'Add Spacer',handler:this.addSpacer,scope:this},"->","Filename:",this.filename],enableDragDrop:true,sm:new Ext.grid.RowSelectionModel({singleSelect:true}),autoScroll:true,clicksToEdit:1,enableColumnHide:false,enableColumnMove:false,enableHdMenu:false,listeners:{render:function(g){if(this.ownerCt.type=="ext"){this.store.loadData([["Core ID","",true]],true);}else{this.store.loadData([["ID","",true]],true);}
var ddrow=new Ext.ux.dd.GridReorderDropTarget(g,{copy:false,listeners:{beforerowmove:function(objThis,oldIndex,newIndex,records){},afterrowmove:function(objThis,oldIndex,newIndex,records){},beforerowcopy:function(objThis,oldIndex,newIndex,records){},afterrowcopy:function(objThis,oldIndex,newIndex,records){}}},this);Ext.dd.ScrollManager.register(g.getView().getEditorParent());},beforedestroy:function(g){Ext.dd.ScrollManager.unregister(g.getView().getEditorParent());},beforeedit:function(e){if((e.record.data.term=="Spacer")||(e.record.data.term=="ID")||(e.record.data.term=="Core ID")){return(false);}},afteredit:function(e){e.grid.reindex();},rowcontextmenu:this.rightClickMenu},view:new Ext.grid.GridView({getRowClass:function(record,index){var cls='';if(record.data.required=="true"){cls='row-required';}
if((record.data.term=='ID')||(record.data.term=='Core ID')){cls='row-required';}
if(record.data.term=='Spacer'){cls='row-spacer';}
return cls;}})});GBIF.MetaMaker.Extension.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.Extension,Ext.grid.EditorGridPanel,{addSpacer:function(){this.store.loadData([["Spacer","",false]],true);},renderReorder:function(value){var html='<img qtip="Click and drag row to reorder." src="resources/images/icons/vert.png">';return(html);},renderCheckbox:function(value){return(value==true||value=="true")?"<img src=\"resources/images/icons/accept.png\">":"";},renderIndex:function(value,e,record,index){if(record.data.rIndex!=-1){return(record.data.rIndex);}else{return('');}},reindex:function(){var i=0;this.offset=1;this.store.data.each(function(){if(!this.data.global){this.data.rIndex=i;i++;}else{this.offset++;this.data.rIndex=-1;}});this.getView().refresh();},rightClickMenu:function(grid,row,e){grid.getSelectionModel().selectRow(row);var record=grid.getSelectionModel().getSelected().data;if(record.term!="Spacer"){return(false);}
var items=[{text:'Remove Spacer',scope:this,handler:function(a,b,c){grid.store.remove(grid.getSelectionModel().getSelected());}}];var menu=new Ext.menu.Menu({items:items});var xy=e.getXY();menu.showAt(xy);}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.ExtensionPanel=function(config){this.fileSettings=new GBIF.MetaMaker.FileSettings({region:'east',width:250,minWidth:250,maxWidth:250,split:true},this);this.extension=new GBIF.MetaMaker.Extension({region:'center'},this);Ext.apply(this,config,{layout:'border',defaults:{border:false},items:[this.fileSettings,this.extension]});GBIF.MetaMaker.ExtensionPanel.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.ExtensionPanel,Ext.Panel,{});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.ExtensionsTree=function(config){this.oldCore="";Ext.apply(this,config,{root:new Ext.tree.AsyncTreeNode({text:'Root Node',draggable:false,expanded:true,type:'root',children:[{text:'Core',type:'root',expanded:true,iconCls:'iconBook',children:[{text:'Taxon',id:'taxon',leaf:false,checked:true,type:'core',url:'http://rs.gbif.org/core/dwc_taxon.xml'},{text:'Occurrences',id:'occurrences',leaf:false,checked:false,type:'core',url:'http://rs.gbif.org/core/dwc_occurrence.xml'}]},{text:'Extensions',type:'root',expanded:true,iconCls:'iconBook'}]}),useArrows:true,rootVisible:false,autoScroll:true,plugins:new Ext.ux.DataTip({tpl:'<tpl if="type == \'extension\'">'
+'<b>Identifier:</b> {identifier}<br><br>'
+'<b>Subject:</b> {subject}<br><br>'
+'<b>Description:</b> {description}'
+'</tpl>'
+'<tpl if="type == \'attribute\'">'
+'<b>Description:</b> {description}<br><br><b>Examples:</b> {examples}'
+'</tpl>'}),loader:new Ext.tree.TreeLoader({dataUrl:'resources/api/proxy.php?url=http://gbrds.gbif.org/registry/extensions.json&type=json&hide=true',listeners:{beforeload:this.testNodeUri,scope:this},processResponse:this.extensionsResponse})});GBIF.MetaMaker.ExtensionsTree.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.ExtensionsTree,Ext.tree.TreePanel,{testNodeUri:function(loader,node){switch(node.attributes.type){case'root':break;case'core':case'extension':loader.dataUrl='resources/api/proxy.php?url='+node.attributes.url;loader.processResponse=this.extensionResponse;break;}},toggleCore:function(id,state){if(state==false)return(false);this.suspendEvents();if(id=='taxon'){this.getNodeById('occurrences').getUI().toggleCheck();this.oldCore="occurrences";}else{this.getNodeById('taxon').getUI().toggleCheck();this.oldCore="taxon";}
this.resumeEvents();return(this.oldCore);},extensionsResponse:function(response,node,callback){var json=response.responseText;try{var o=eval("("+json+")");o=o.extensions;node.beginUpdate();for(var i=0,len=o.length;i<len;i++){var n=this.createNode(o[i]);n.text=o[i].title;n.leaf=false;n.attributes.subject=o[i].subject;n.attributes.identifier=o[i].identifier;n.attributes.type='extension';n.attributes.checked=false;n.iconCls='iconText';if(n){node.appendChild(n);}}
node.endUpdate();if(typeof callback=="function"){callback(this,node);}}catch(e){alert('Error',"Load Exception Please Try Again.");}},extensionResponse:function(response,node,callback){var xml=response.responseXML;var root=xml.documentElement;var q=Ext.DomQuery;Ext.each(q.select("property",root),function(record){node.beginUpdate();var n=this.createNode({});n.text=record.getAttribute("name");n.leaf=true;n.url=record.getAttribute("url");n.attributes.type='attribute';n.attributes.term=record.getAttribute("name");n.attributes.namespace=record.getAttribute("namespace");n.attributes.qualName=record.getAttribute("qualName");n.attributes.thesaurus=record.getAttribute("thesaurus");n.attributes.required=record.getAttribute("required");n.attributes.description=record.getAttribute("description");n.attributes.examples=record.getAttribute("examples");n.attributes.checked=(n.attributes.required=="true")?true:false;n.iconCls='iconText';if(n.attributes.checked){n.getUI().addClass("required");n.iconCls="iconRequired";n.disabled=true;}
if(n){node.appendChild(n);}
node.endUpdate();if(typeof callback=="function"){callback(this,node);}
if(n.attributes.checked){n.fireEvent('checkchange',n,true);}},this);}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.FileSettings=function(config){this.prop=new GBIF.MetaMaker.Properties({autoHeight:true,style:'border-top: solid thin;'});Ext.apply(this,config,{defaults:{border:false},items:[{xtype:'fieldset',defaultType:'radio',ref:'fileSettingOptions',defaults:{handler:this.changeProp,scope:this},items:[{fieldLabel:'File Settings',itemId:'radio-csv',boxLabel:'CSV File',name:'format',inputValue:'csv'},{fieldLabel:'',itemId:'radio-tab',labelSeparator:'',boxLabel:'Tab Separated File',name:'format',inputValue:'tab'},{fieldLabel:'',itemId:'radio-custom',labelSeparator:'',boxLabel:'Custom Format',name:'format',inputValue:'custom'}],listeners:{change:this.changeProp,scope:this}},this.prop],listeners:{render:function(){this.fileSettingOptions.getComponent('radio-csv').setValue(true);this.fileSettingOptions.fireEvent('change',this.fileSettingOptions.getComponent('radio-csv'),true);}}});GBIF.MetaMaker.FileSettings.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.FileSettings,Ext.form.FormPanel,{changeProp:function(obj,state){if(!state){return;}
switch(obj.inputValue){case'csv':var task=new Ext.util.DelayedTask(function(){this.prop.setCSV();},this);task.delay(300);break;case'tab':this.prop.setTAB();break;default:this.prop.setCustom();break;}}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.MetaPanel=function(config){this.metaData={core:[],extensions:[]};this.filename=new Ext.form.TextField({width:250,emptyText:"dataset metadata document, e.g.  eml.xml",listeners:{valid:this.generateXML,scope:this}});Ext.apply(this,config,{height:200,type:'meta',id:'meta',title:'meta.xml',skip:true,iconCls:'iconPageWhiteCode',padding:10,autoScroll:true,border:false,tbar:[{text:"Save File",scope:this,handler:function(){window.location="resources/api/savefile.php?data="+encodeURIComponent(this.body.dom.textContent);}},"->","Metadata file describing dataset:",this.filename],tpl:new Ext.XTemplate('<pre><div class="meta">&lt;?xml version="1.0"?&gt;\r\n','&lt;archive xmlns="http://rs.tdwg.org/dwc/text/"','<tpl if="metadata != \'\'">',' metadata="{metadata}"','</tpl>','&gt;\r\n','<tpl for="core">','\t&lt;core encoding="{[this.addSlashes(values.fileSettings["File Encoding"])]}" linesTerminatedBy="{[this.addSlashes(values.fileSettings["Line ending"])]}" fieldsTerminatedBy="{[this.addSlashes(values.fileSettings["Field Delimiter"])]}" fieldsEnclosedBy="{[this.addSlashes(values.fileSettings["Fields enclosed by"])]}" ignoreHeaderLines="{[this.addSlashes(values.fileSettings["Ignore header row"])]}" rowType="{rowType}"&gt;\r\n','\t\t&lt;files&gt;\r\n','\t\t\t&lt;location>{filename}&lt;/location&gt;\r\n','\t\t&lt;/files&gt;\r\n','<tpl for="fields">','<tpl if="xindex &gt; 0">','<tpl if="term != \'Spacer\'">','<tpl if="term == \'ID\'">','\t\t&lt;id index="{rIndex}"/&gt;\r\n','</tpl>','<tpl if="term != \'ID\'">','\t\t&lt;field ','<tpl if="rIndex != -1">',' index="{rIndex}" ','</tpl>','<tpl if="rIndex == -1 || static != \'\'">',' default="{static}" ','</tpl>','term="{qualName}"/&gt;\r\n','</tpl>','</tpl>','</tpl>','</tpl>','\t&lt;/core&gt;\r\n','</tpl>','<tpl for="extensions">','\t&lt;extension encoding="{[this.addSlashes(values.fileSettings["File Encoding"])]}" linesTerminatedBy="{[this.addSlashes(values.fileSettings["Line ending"])]}" fieldsTerminatedBy="{[this.addSlashes(values.fileSettings["Field Delimiter"])]}" fieldsEnclosedBy="{[this.addSlashes(values.fileSettings["Fields enclosed by"])]}" ignoreHeaderLines="{[this.addSlashes(values.fileSettings["Ignore header row"])]}" rowType="{rowType}"&gt;\r\n','\t\t&lt;files&gt;\r\n','\t\t\t&lt;location>{filename}&lt;/location&gt;\r\n','\t\t&lt;/files&gt;\r\n','<tpl for="fields">','<tpl if="term != \'Spacer\'">','<tpl if="term == \'Core ID\'">','\t\t&lt;coreid index="{rIndex}"/&gt;\r\n','</tpl>','<tpl if="term != \'Core ID\'">','\t\t&lt;field ','<tpl if="rIndex != -1">',' index="{rIndex}" ','</tpl>','<tpl if="rIndex == -1 || static != \'\'">',' default="{static}" ','</tpl>','term="{qualName}"/&gt;\r\n','</tpl>','</tpl>','</tpl>','\t&lt;/extension&gt;\r\n','</tpl>','&lt;/archive&gt;<br/>','</div>',{exists:function(o){return typeof o!='undefined'&&o!=null&&o!='';},addSlashes:function(o){if(typeof o=="boolean"){return(o)?1:0;}
if(typeof o!='undefined'){o=o.replace("(none)","");return(o.replace(/\"/g,"&amp;quot;"));}else{return("");}}})})
GBIF.MetaMaker.MetaPanel.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.MetaPanel,Ext.Panel,{generateXML:function(){this.metaData.metadata=this.filename.getValue();Ext.each(this.metaData.extensions,function(extension){var pos=-1;var idRec=null;Ext.each(extension.fields,function(field,index){if(field.term=="Core ID"){pos=index;idRec=field;}});if(pos!=-1){extension.fields.splice(pos,1);extension.fields.unshift(idRec);}});Ext.each(this.metaData.core,function(extension){var pos=-1;var idRec=null;Ext.each(extension.fields,function(field,index){if(field.term=="ID"){pos=index;idRec=field;}});if(pos!=-1){extension.fields.splice(pos,1);extension.fields.unshift(idRec);}});this.tpl.overwrite(this.body,this.metaData);}});

Ext.namespace('GBIF');Ext.namespace('GBIF.MetaMaker');GBIF.MetaMaker.Properties=function(config){editable:true;var comboEncoding=new Ext.form.ComboBox({fieldLabel:'comboEncoding',name:'comboEncoding',allowBlank:false,store:['UTF-8','UTF-16','Latin1','Windows1252'],typeAhead:true,mode:'local',triggerAction:'all',emptyText:'-- Select encoding--',selectOnFocus:true});var comboTerminatedBy=new Ext.form.ComboBox({fieldLabel:'comboTerminatedBy',name:'comboTerminatedBy',allowBlank:false,store:['\\r\\n','\\n','\\r'],typeAhead:true,mode:'local',triggerAction:'all',emptyText:'-- Select Type--',selectOnFocus:true});var comboFieldDelimiter=new Ext.form.ComboBox({fieldLabel:'comboFieldDelimiter',name:'comboFieldDelimiter',allowBlank:false,store:['\\t',',',';','|',']'],typeAhead:true,mode:'local',triggerAction:'all',emptyText:'-- Select Type--',selectOnFocus:true});var comboEnclosedBy=new Ext.form.ComboBox({fieldLabel:'comboEnclosedBy',name:'comboEnclosedBy',allowBlank:false,store:['(none)','"',"'"],typeAhead:true,mode:'local',triggerAction:'all',emptyText:'-- Select Type--',selectOnFocus:true});Ext.apply(this,config,{source:{'File Encoding':'UTF-8','Field Delimiter':'\\t','Fields enclosed by':'\"','Line ending':'\\r\\n','Ignore header row':true},listeners:{beforeedit:function(e){return(this.editable);switch(e.record.id){default:return true;}}},customEditors:{'File Encoding':new Ext.grid.GridEditor(comboEncoding),'Line ending':new Ext.grid.GridEditor(comboTerminatedBy),'Line ending':new Ext.grid.GridEditor(comboTerminatedBy),'Field Delimiter':new Ext.grid.GridEditor(comboFieldDelimiter),'Fields enclosed by':new Ext.grid.GridEditor(comboEnclosedBy)}});GBIF.MetaMaker.Properties.superclass.constructor.call(this,config);}
Ext.extend(GBIF.MetaMaker.Properties,Ext.grid.PropertyGrid,{setCSV:function(){this.setSource({'File Encoding':'UTF-8','Field Delimiter':',','Fields enclosed by':'\"','Line ending':'\\r\\n','Ignore header row':true});this.editable=true;},setTAB:function(){this.setSource({'File Encoding':'UTF-8','Field Delimiter':'\\t','Fields enclosed by':'','Line ending':'\\r\\n','Ignore header row':true});this.editable=true;},setCustom:function(){this.setSource({'File Encoding':'UTF-8','Field Delimiter':'','Fields enclosed by':'','Line ending':'','Ignore header row':true});this.editable=true;}});

Ext.namespace('GBIF');Ext.onReady(function(){Ext.fly(document.body).on('contextmenu',function(e,target){e.preventDefault();});Ext.QuickTips.init();Ext.getUrlParam=function(param){var params=Ext.urlDecode(location.search.substring(1));return param?params[param]:params;};this.header={height:95,cls:'glossary-header',region:'north',xtype:'box',border:false,margins:'0 0 5 0',html:'<div class="header">'+'<a href="http://www.gbif.org/" target="_blank" class="gbif">'+'<img src="resources/images/gbif.jpg" alt="GBif" width="104" height="90" border="0" /></a>'+'<div class="header-text">'+'<h1>MetaMaker v1.0</h1>'+'<p><i>GBIF metafile creation tool</i></p>'+'</div></div>'}
this.center=new GBIF.MetaMaker.Center({region:'center'});this.details=new GBIF.MetaMaker.Details({region:'south'});var mainEntry=new Ext.Viewport({layout:'border',items:[this.header,this.center]});Ext.get('loading').remove();Ext.get('loading-mask').fadeOut({remove:true});});
