import { IonButton } from '@ionic/react';
import React, {useEffect} from 'react';
import { init, stopAnimationRender } from './webgl';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { isPlatform } from '@ionic/react';

function Home() {
    let myAudio;

    useEffect(async () => {
        await ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
    });
    const clearCanvas = () => {
        myAudio.stopRecord();
        myAudio.play();
        console.log(myAudio);

        stopAnimationRender();
    };

    const captureAudio = () => {
        let media = new Media();

        if(isPlatform('ios')) {
            myAudio = media.create('documents://myAudio.m4a');
        } else if(isPlatform('android')) {
            myAudio = media.create('/myAudio.mp3');    
        }
        

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
