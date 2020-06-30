import { IonButton } from '@ionic/react';
import React, {useEffect} from 'react';
import { init, stopAnimationRender } from './webgl';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

function Home() {
    useEffect(async () => {
        await ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.LANDSCAPE);
    });
    const clearCanvas = () => {
        stopAnimationRender();
    };

    return (
            <div className="App">
                <header className="App-header">
                    <p style={{color: "black"}}>Test Ionic React App for Amira</p>
                    <div style={{flexDirection: 'column'}}>
                        <IonButton onClick={init}>Start</IonButton>
                        <IonButton onClick={clearCanvas}>Stop</IonButton>
                    </div>
                    <canvas id="canvas" style={{width: 200, height: 200}}/>
                </header>
            </div>
        );
}

export default Home;
