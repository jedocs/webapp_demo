import React from 'react';
import init from './init.js';
import commandsModule from './commandsModule.js';
import toolbarModule from './toolbarModule.js';
import ConnectedCornerstoneViewportDownloadForm from './ConnectedCornerstoneViewportDownloadForm';

const Component = React.lazy(() => {
  return import('./OHIFCornerstoneViewport');
});

const OHIFCornerstoneViewport = props => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

/**
 *
 */
export default {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: 'cornerstone',

  /**
   *
   *
   * @param {object} [configuration={}]
   * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
   */
  preRegistration({ servicesManager, configuration = {} }) {
    init({ servicesManager, configuration });
  },

  getViewportModule({ commandsManager }) {
    const ExtendedOHIFCornerstoneViewport = props => {
      const onNewImageHandler = jumpData => {
        commandsManager.runCommand('jumpToImage', jumpData);
        // console.log('jumpdata: ', jumpData);
      };
      return (
        <OHIFCornerstoneViewport {...props} onNewImage={onNewImageHandler} />
      );
    };

    return ExtendedOHIFCornerstoneViewport;
  },
  getToolbarModule() {
    return toolbarModule;
  },
  getCommandsModule({ servicesManager }) {
    return commandsModule({ servicesManager });
  },
};

export { ConnectedCornerstoneViewportDownloadForm };
