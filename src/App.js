import React from 'react';
import '@ionic/react/css/core.css';
import './App.css';
import { IonApp, IonRouterOutlet } from '@ionic/react';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { IonReactRouter } from "@ionic/react-router";
import Home from './Home';
import Route from "react-router-dom/es/Route";

function App() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" component={Home} exact={true}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
