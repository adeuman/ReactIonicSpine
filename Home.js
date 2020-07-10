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
        /*let count = 0;
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
            console.log(status);
        });
         */

        // ...and when we're ready to stop recording.
        window.audioinput.stop(function(url) {
            // Now you have the URL (which might be different to the one passed in to audioinput.start())
            // You might, for example, read the data into a blob.
            window.resolveLocalFileSystemURL(url, function (tempFile) {
//
                tempFile(function (tempWav) {
                    tempWav.moveTo('Local/Internal Storage/download/' + 'temp.wav')
                    /*const reader = new FileReader();
                    reader.onloadend = function(file) {
                        // Create the blob from the result.
                        const blob = new Blob([new Uint8Array(file)], { type: "audio/wav" });
                        // Delete the temporary file.
                        tempFile.remove(function (e) { console.log("temporary WAV deleted"); });

                    };
                    reader.readAsArrayBuffer(tempWav);*/
                });
            }, function (e) {
                console.log("Could not resolveLocalFileSystemURL: " + e.message);
            });
        });

        stopAnimationRender();
    };

    const captureAudio = () => {
        /*let media = new Media();

        if(isPlatform('ios')) {
            myAudio = media.create(File.tempDirectory + 'myAudio.m4a');
        } else if(isPlatform('android')) {
            myAudio = media.create(File.applicationStorageDirectory + 'myAudio.aac');
        }

        myAudio.startRecord();*/
        // Get access to the file system
        window.requestFileSystem(window.TEMPORARY, 5*1024*1024, function(fs) {
            console.log("Got file system: " + fs.name);
            const fileSystem = fs;

            // Now you can initialize audio, telling it about the file system you want to use.
            const captureCfg = {
                sampleRate: 16000,
                bufferSize: 8192,
                channels: 1,
                format: window.audioinput.FORMAT.PCM_16BIT,
                audioSourceType: window.audioinput.AUDIOSOURCE_TYPE.DEFAULT,
                fileUrl: window.cordova.file.externalRootDirectory + 'download/'
            };

            // Initialize the audioinput plugin.
            window.audioinput.initialize(captureCfg, function() {
                // Now check whether we already have permission to access the microphone.
                window.audioinput.checkMicrophonePermission(function(hasPermission) {
                    if (hasPermission) {
                        console.log("Already have permission to record.");
                    }
                    else {
                        // Ask the user for permission to access the microphone
                        window.audioinput.getMicrophonePermission(function(hasPermission, message) {
                            if (hasPermission) {
                                console.log("User granted permission to record.");
                            } else {
                                console.warn("User denied permission to record.");
                            }
                        });
                    }
                });
            });
        }, function (e) {
            console.log("Couldn't access file system: " + e.message)
        });

        // Later, when we want to record to a file...
        const captureCfg = {
            fileUrl : window.cordova.file.cacheDirectory + "temp.wav"
        };

        // Start the capture.
        window.audioinput.start(captureCfg);

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
