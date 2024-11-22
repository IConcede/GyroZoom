Demo at https://candid-clafoutis-f914ff.netlify.app/

# OpenSeaDragon Gyroscope Zoom Plugin

This plugin adds gyroscope-based zoom functionality to OpenSeaDragon viewers. It enables users on mobile and tablet devices to zoom into images by tilting their devices.

## Features

- Gyroscope-controlled zooming.
- Configurable zoom levels, steps, and speed boost angles.
- Differentiates between mobile and tablet devices.
- Supports portrait and landscape modes with customizable settings.

## Installation

1. Ensure you have [OpenSeaDragon](https://openseadragon.github.io/) included in your project.
2. Include the plugin script in your project after OpenSeaDragon.

    ```html
    <script src="path/to/openseadragon.js"></script>
    <script src="path/to/openseadragon-gyrozoom.js"></script>
    ```

## Usage

1. Initialize an OpenSeaDragon viewer as usual:

    ```javascript
    const viewer = OpenSeadragon({
      id: "openseadragon-container",
      prefixUrl: "path/to/images/",
      tileSources: "path/to/image.dzi"
    });
    ```

2. Enable the gyroscope zoom:
   ```javascript
   viewer.enableGyroZoom();
   ```

    ```javascript
    viewer.enableGyroZoom({
      maxZoomLevel: 50, // Maximum zoom level
      minZoomLevel: 0.2, // Minimum zoom level
      zoomStep: 0.02, // Zoom step increment
      zoomSpeedBoostAngle: 15, // Angle threshold for speed boost
      speedBoostFactor: 2, // Speed boost multiplier
      landscapeModeEnabled: true, // Enable different settings for landscape mode
      zoomAngleSettings: { // Custom angle settings
        mobile: {
          portrait: { zoomIn: 15, zoomOut: -15 },
          landscape: {
            left: { zoomIn: -75, zoomOut: -95 },
            right: { zoomIn: 95, zoomOut: 75 },
          },
        },
      },
    });
    ```

4. On Safari, request gyroscope permission:

    ```javascript
    viewer.requestSafariPermission();
    ```

## Configuration Options

| Option                 | Type      | Default | Description                                                    |
|------------------------|-----------|---------|----------------------------------------------------------------|
| `maxZoomLevel`         | `number`  | `100`   | The maximum zoom level allowed.                               |
| `minZoomLevel`         | `number`  | `0.1`   | The minimum zoom level allowed.                               |
| `zoomStep`             | `number`  | `0.01`  | The zoom increment per gyroscope event.                       |
| `zoomSpeedBoostAngle`  | `number`  | `20`    | Angle threshold for applying speed boost.                     |
| `speedBoostFactor`     | `number`  | `3`     | Multiplier for the zoom step when speed boost is active.      |
| `landscapeModeEnabled` | `boolean` | `true`  | Enables different settings for landscape mode.                |
| `zoomAngleSettings`    | `object`  | See code example | Customizable gyroscope angle settings for zoom controls. |

## Safari Permissions

Safari requires user interaction to enable gyroscope access. Call `requestSafariPermission()` to prompt users for permission.

```javascript
viewer.requestSafariPermission();
```

A simple implementation could include a button:
```javascript
<button onclick="viewer.requestSafariPermission()">Enable Gyroscope</button>
```

## Compatibility

- **Designed for:** Mobile and tablet devices with gyroscopes.
- **Browser Support:** Major browsers that support device orientation events.

## License

This plugin is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
