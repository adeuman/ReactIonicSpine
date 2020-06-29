import { IonPage, IonButton } from '@ionic/react';
import React, { useEffect } from 'react';
import { init } from './webgl';

function Home() {
    useEffect(() => {
        init();
    }, []);

        return (
            <IonPage>
                <div className="App">
                    <header className="App-header">
                        <p>
                            Edit <code>src/App.js</code> and save to reload.
                        </p>
                        <button>Start</button>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                        <canvas id="canvas" style={{width: 200, height: 200}}/>
                    </header>
                </div>
            </IonPage>
        );
}

export default Home;
