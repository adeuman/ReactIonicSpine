import { IonButton } from '@ionic/react';
import React, {useEffect} from 'react';
import { init, stopAnimationRender } from './webgl';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { Media, MediaObject } from '@ionic-native/media/ngx';

function Home() {
    let myAudio;

    useEffect(async () => {
        await ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
    });
    const clearCanvas = () => {
        myAudio.stopRecord();

        console.log(myAudio);

        stopAnimationRender();
    };

    const captureAudio = () => {
        myAudio = this.media.create('documents://myAudio.m4a');

        myAudio.startRecord();
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
