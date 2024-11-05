(function(OpenSeadragon) {
    if (!OpenSeadragon) {
      throw new Error('OpenSeadragon viewer is required for this plugin.')
    }
  
    OpenSeadragon.Viewer.prototype.enableGyroZoom = function(options = {}) {
      const viewer = this
      
      const maxZoomLevel = options.maxZoomLevel || 100
      const minZoomLevel = options.minZoomLevel || 0.1
      const zoomStep = options.zoomStep || 0.01
      const zoomSpeedBoostAngle = options.zoomSpeedBoostAngle || 20
      const speedBoostFactor = options.speedBoostFactor || 3
      const landscapeModeEnabled = options.landscapeModeEnabled ?? true

      const [portraitZoomInMinDegrees, portraitZoomInMaxDegrees] = [10, 120]
      const [portraitZoomOutMinDegrees, portraitZoomOutMaxDegrees] = [-10, -120]
      const [landscapeZoomInMinDegrees, landscapeZoomInMaxDegrees] = [-80, 0]
      const [landscapeZoomOutMinDegrees, landscapeZoomOutMaxDegrees] = [-100, -180]
  
      function handleOrientationEvent(event) {
        const { alpha, beta, gamma } = event
  
        const betaRadians = beta / 180 * Math.PI
        const gammaRadians = gamma / 180 * Math.PI
        const spinRadians = Math.atan2(Math.cos(betaRadians) * Math.sin(gammaRadians), Math.sin(betaRadians))
  
        const rotationDegrees = spinRadians * 180 / Math.PI
  
        const zoomLevel = viewer.viewport.getZoom()
  
        const [zoomInMin, zoomInMax, zoomOutMin, zoomOutMax] = window.innerHeight > window.innerWidth && landscapeModeEnabled
                                                                  ? [portraitZoomInMinDegrees, portraitZoomInMaxDegrees, portraitZoomOutMinDegrees, portraitZoomOutMaxDegrees]
                                                                  : [landscapeZoomInMinDegrees, landscapeZoomInMaxDegrees, landscapeZoomOutMinDegrees, landscapeZoomOutMaxDegrees]
  
        if (rotationDegrees > zoomInMin && rotationDegrees < zoomInMax && zoomLevel < maxZoomLevel) {
          if (rotationDegrees < zoomInMin + zoomSpeedBoostAngle) {
            viewer.viewport.zoomBy(1 + zoomStep)
          } else {
            viewer.viewport.zoomBy(1 + zoomStep * speedBoostFactor)
          }
        } else if (rotationDegrees < zoomOutMin && rotationDegrees > zoomOutMax && zoomLevel > minZoomLevel) {
          if (rotationDegrees > zoomOutMin - zoomSpeedBoostAngle) {
            viewer.viewport.zoomBy(1 - zoomStep)
          } else {
            viewer.viewport.zoomBy(1 - zoomStep * speedBoostFactor)
          }
        }
      }
  
      // Add event listeners for device orientation
      window.addEventListener("MozOrientation", handleOrientationEvent, true);
      window.addEventListener("deviceorientation", handleOrientationEvent, true);
  
      // Safari-specific permission handling
      this.requestSafariPermission = function() {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          DeviceOrientationEvent.requestPermission();
        }
      };
    };
  })(OpenSeadragon);
