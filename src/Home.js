import { IonButton } from '@ionic/react';
import React, { useEffect } from 'react';
import { init } from './webgl';

function Home() {
    useEffect(() => {
        init();
    }, []);

        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <IonButton fill="clear">Start</IonButton>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <canvas id="canvas" style={{ backgroundColor: '#FFFFFF'}} width={100} height={100}/>
                </header>
            </div>
        );
}

export default Home;
