require('SassPath/index.scss');

import View from 'ViewPath/View';

import BaseController from 'ControllerPath/BaseController';

new BaseController().registerController({
    preprocess: function() {
        try {
            App.callback.workerOne = new Worker('./assets/js/webworkerdata.js');
        } catch (e) {
            // Do nothing.
        }
    },

    render: function() {
        try {
            App.callback.workerOne.onerror =  function(message) {
                new View({
                    selectorId: 'app',
                    templateName: 'webworker',
                    templateData: [{
                        id: message.type,
                        userId: message.type,
                        title: message.type,
                        body: message.type
                    }]
                }).render();
            };

            App.callback.workerOne.onmessage =  function(message) {
                if (message.data && message.data.action === 'POSTS') {
                    new View({
                        selectorId: 'app',
                        templateName: 'webworker-posts',
                        templateData: message.data.posts
                    }).render();
                }
            };
        } catch (e) {
            // Do nothing.
        }
    },

    ready: function() {
    }
});
