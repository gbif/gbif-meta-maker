Ext.namespace('GBIF');
Ext.namespace('GBIF.MetaMaker');

GBIF.MetaMaker.CenterTab = function(config){

	this.metaPanel = new GBIF.MetaMaker.MetaPanel();
	this.aboutPanel = new Ext.Panel({
			title: this.aboutTitle
		,	autoLoad: 'resources/docs/about-'+ lang +'.html'
		,	padding: 10
		,	bodyStyle: 'font-size: 12px'
		,	autoScroll: true
		,	shim: false
	});
	this.coreSpecimensPanel = new GBIF.MetaMaker.ExtensionPanel({
			id: 'core-taxon'
		,	title: this.taxonTitle
		,	type: 'core'
		,	skip: false
		,	identifier: 'http://rs.tdwg.org/dwc/terms/Taxon'
	});

	this.coreObservationsPanel = new GBIF.MetaMaker.ExtensionPanel({
			id: 'core-occurrence'
		,	title: this.OccurrencesTitle
		,	type: 'core'
		,	skip: true
		,	identifier: 'http://rs.tdwg.org/dwc/terms/Occurrence'
	});
	
	Ext.apply(this, config, {
			width: 400
		,	height: 400
		,	activeTab: 0
		,	items: [
					this.aboutPanel
				,	this.metaPanel
				,	this.coreSpecimensPanel
				,	this.coreObservationsPanel
			]
		,	listeners: {
					tabchange: this.checkTab
				,	render: function() {
						this.hideTabStripItem("core-occurrence");
					}
			}
	});
	
	GBIF.MetaMaker.CenterTab.superclass.constructor.call(this, config);
}	

Ext.extend(GBIF.MetaMaker.CenterTab,Ext.TabPanel,  {

	checkTab: function( tp, panel ) {

		if(panel) {
			switch(panel.type) {
				case 'meta':
					panel.metaData.core = [];
					panel.metaData.extensions = [];
					
					tp.items.each(function(tab){
						if (!tab.skip) {
							if (tab.type == 'ext') {
								var tmpRec = {
										name: tab.title
									,	rowType: tab.identifier
									,	filename: tab.extension.filename.getValue()
									,	fileSettings: tab.fileSettings.prop.getSource()
									,	fields: []
								}
								tab.extension.store.each(function(rec) {
									tmpRec.fields.push({
											term: rec.data.term
										,	dataType: rec.data.dataType
										,	required: rec.data.required
										,	sstatic: rec.data.sstatic
										,	qualName: rec.data.qualName
										,	rIndex: rec.data.rIndex
										,	global: rec.data.global
										,	vocabulary: rec.data.vocabulary
									});
								});
								panel.metaData.extensions.push(tmpRec);
								delete(tmpRec);
								panel.generateXML();
							}
	
							if (tab.type == 'core') {
								var tmpProp = tab.fileSettings.prop.getSource();
								if (Ext.isEmpty(tmpProp)) {
									tmpProp = {
											'File Encoding': 'UTF-8'
										,	'Field Delimiter': ','
										,	'Fields enclosed by': '"'
										,	'Line ending': '\\r\\n'
										,	'Ignore header row': true
									}
								}

								var tmpRec = {
										name: tab.title
									,	rowType: tab.identifier
									,	filename: tab.extension.filename.getValue()
									,	fileSettings: tmpProp
									,	fields: []
								}
								
								tab.extension.store.each(function(rec) {
									tmpRec.fields.push({
											term: rec.data.term
										,	dataType: rec.data.dataType
										,	required: rec.data.required
										,	sstatic: rec.data.sstatic
										,	qualName: rec.data.qualName
										,	rIndex: rec.data.rIndex
										,	global: rec.data.global
										,	vocabulary: rec.data.vocabulary										
									});
								});
								panel.metaData.core.push(tmpRec);
								delete(tmpRec);
								panel.generateXML();
							}

						}

					});
					break;
	
				default:
					break;
			}
		}
	}

});