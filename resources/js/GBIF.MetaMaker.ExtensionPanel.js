Ext.namespace('GBIF');
Ext.namespace('GBIF.MetaMaker');

GBIF.MetaMaker.ExtensionPanel = function(config){

	this.fileSettings = new GBIF.MetaMaker.FileSettings({
			region: 'east'
		,	width: 270
		,	minWidth: 270
		,	maxWidth: 270
		,	split: true
	}, this);

	this.extension = new GBIF.MetaMaker.Extension({
			region: 'center'
	}, this);
	
	Ext.apply(this, config, {
			layout: 'border'
		,	defaults: {
				border: false
			}
		,	items: [
					this.fileSettings
				,	this.extension
			]
	});

	GBIF.MetaMaker.ExtensionPanel.superclass.constructor.call(this, config);

}	

Ext.extend(GBIF.MetaMaker.ExtensionPanel,Ext.Panel,  {
});