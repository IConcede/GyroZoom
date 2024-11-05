<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Basic OpenSeadragon example</title>
</head>

<body translate="no">
    <div id="seadragon-viewer" style="width:800px; height:600px;"></div>
    <script src="https://openseadragon.github.io/openseadragon/openseadragon.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script id="rendered-js" async>
        const duomo = {
            Image: {
                xmlns: "http://schemas.microsoft.com/deepzoom/2008",
                Url: "https://openseadragon.github.io/example-images/duomo/duomo_files/",
                Format: "jpg",
                Overlap: "2",
                TileSize: "256",
                Size: {
                    Width: "13920",
                    Height: "10200"
                }
            }
        };

        const viewer = OpenSeadragon({
            id: "seadragon-viewer",
            prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
            tileSources: duomo,
            visibilityRatio: 0.5,
        });

        const MAX_ZOOM_LEVEL = 100
        const MIN_ZOOM_LEVEL = 0.1
        const ZOOM_STEP = 0.01
        const ACCELERATE_THRESHOLD_DEGREES = 20
        const ACCELERATION_SPEED_FACTOR = 3

        const isTablet = checkDeviceIsTablet()

        const [portraitZoomInMinDegrees, portraitZoomInMaxDegrees] = isTablet ? [-80, 30] : [10, 120]
        const [portraitZoomOutMinDegrees, portraitZoomOutMaxDegrees] = isTablet ? [-100, -210] : [-10, -120]
        const [landscapeZoomInMinDegrees, landscapeZoomInMaxDegrees] = isTablet ? [-170, -90] : [-80, 0]
        const [landscapeZoomOutMinDegrees, landscapeZoomOutMaxDegrees] = isTablet ? [-190, -270] : [-100, -180]

        function handleOrientationEvent(event) {
            const { alpha, beta, gamma } = event

            const betaRadians = beta / 180 * Math.PI;
            const gammaRadians = gamma / 180 * Math.PI;
            const spinRadians = Math.atan2(Math.cos(betaRadians) * Math.sin(gammaRadians), Math.sin(betaRadians));

            const rotationDegrees = spinRadians * 180 / Math.PI

            const zoomLevel = viewer.viewport.getZoom()

            document.getElementById('output1').innerHTML = 'alpha: ' + alpha.toFixed(1)
            document.getElementById('output2').innerHTML = 'spin: ' + rotationDegrees.toFixed(1)
            document.getElementById('output3').innerHTML = 'isMobile: ' + checkDeviceIsTablet()
            document.getElementById('output4').innerHTML = 'portraitZoomInMinDegrees: ' + portraitZoomInMinDegrees

            const [zoomInMin, zoomInMax, zoomOutMin, zoomOutMax] = window.innerHeight > window.innerWidth 
                                                                    ? [portraitZoomInMinDegrees, portraitZoomInMaxDegrees, portraitZoomOutMinDegrees, portraitZoomOutMaxDegrees]
                                                                    : [landscapeZoomInMinDegrees, landscapeZoomInMaxDegrees, landscapeZoomOutMinDegrees, landscapeZoomOutMaxDegrees]

    
            if (rotationDegrees > zoomInMin && rotationDegrees < zoomInMax && zoomLevel < MAX_ZOOM_LEVEL) {
                if (rotationDegrees < zoomInMin + ACCELERATE_THRESHOLD_DEGREES) {
                    viewer.viewport.zoomBy(1 + ZOOM_STEP)
                } else {
                    viewer.viewport.zoomBy(1 + ZOOM_STEP * ACCELERATION_SPEED_FACTOR)
                }
            } else if (rotationDegrees < zoomOutMin && rotationDegrees > zoomOutMax && zoomLevel > MIN_ZOOM_LEVEL) {
                if (rotationDegrees > zoomOutMin - ACCELERATE_THRESHOLD_DEGREES) {
                    viewer.viewport.zoomBy(1 - ZOOM_STEP)
                } else {
                    viewer.viewport.zoomBy(1 - ZOOM_STEP * ACCELERATION_SPEED_FACTOR)
                }
            }
        }

        window.addEventListener("MozOrientation", handleOrientationEvent, true)
        window.addEventListener("deviceorientation", handleOrientationEvent, true)

        function requestSafariPermission() {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
            }
        }

        function checkDeviceIsTablet() {
            let isMobile = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return !isMobile;
        };
    </script>
    <div id="ah">
        <p style="font-size:2em" id="output1"></p>
        <p style="font-size:2em" id="output2"></p>
        <p style="font-size:2em" id="output3"></p>
        <p style="font-size:2em" id="output4"></p>
        <button style="margin-top:100px;width:800px;height:150px;font-size:3em"
            onclick="requestSafariPermission()">Enable GyroZoom for Safari</button>
    </div>


</body>

</html>
