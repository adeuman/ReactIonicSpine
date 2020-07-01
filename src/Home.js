import { IonButton } from '@ionic/react';
import React, { useEffect } from 'react';
import { init, stopAnimationRender } from './webgl';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { File } from '@ionic-native/file';
import { Media } from '@ionic-native/media/ngx';
import { isPlatform } from '@ionic/react';

function Home() {
    let myAudio;

    useEffect(async () => {
        await ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
    });
    const clearCanvas = async () => {
        let count = 0;
        myAudio.stopRecord();
        myAudio.play();
        myAudio.onStatusUpdate.subscribe(status => {
            if (status === 4) {
                if (count === 1) {
                    myAudio.stop();
                    myAudio.release();
                } else {
                    count++;
                }
            }
            console.log(status)
        });

        stopAnimationRender();
    };

    const captureAudio = () => {
        let media = new Media();

        if(isPlatform('ios')) {
            myAudio = media.create(File.tempDirectory + 'myAudio.m4a');
        } else if(isPlatform('android')) {
            myAudio = media.create(File.applicationStorageDirectory + 'myAudio.aac');
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
