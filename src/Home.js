import { IonButton } from '@ionic/react';
import React, {useEffect} from 'react';
import { init, stopAnimationRender } from './webgl';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

function Home() {

    useEffect(async () => {
        await ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
    });
    const clearCanvas = () => {
        stopAnimationRender();
    };

    const captureAudio = () => {
        let mediaCapture = new MediaCapture();

        mediaCapture.captureAudio(1)
          .then(
            (data) => {console.log(data); console.log("whyyyyyyyyyyy")}
          ).catch(
            (err) => console.log("I'm not sure which error I should look at!"+err)
          );
    };

    return (
            <div className="App">
                <header className="App-header">
                    <p style={{color: "black"}}>Test Ionic React App for Amira</p>
                    <div style={{flexDirection: 'column'}}>
                        <IonButton onClick={() => {init();captureAudio(); }}>Start</IonButton>
                        <IonButton onClick={clearCanvas}>Stop</IonButton>
                    </div>
                    <canvas id="canvas" style={{width: 200, height: 200}}/>
                </header>
            </div>
        );
}

export default Home;
