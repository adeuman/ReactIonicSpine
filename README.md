* If you do not have an IDE downloaded, Install Visual Studio Code
* Download the git repository: https://github.com/adeuman/ReactIonicSpine.git

* If building on android 
    * Install Android Studio (this will also install the Android SDK): https://developer.android.com/studio
    * Install JDK 8, https://www.oracle.com/java/technologies/javase-jdk8-downloads.html
    * Install Gradle binary, https://gradle.org/releases/
    * Add Gradle PATH to environment variables
* If you are not planning to install to your phone also install an emulator
* The Ionic documentation on running on Android lists the steps and some possible pitfalls: https://ionicframework.com/docs/developing/android

* Install Node and npm (if you are using a Mac, install using NVM)
* Install project dependencies: npm install 

* Build the project with Ionic: ionic build

* Android
    * If first build on android or android folder does not already exists in root directory run: 
        * ionic cap add android
        * ionic cap open android
    * Otherwise run:
        * ionic cap update android
        * ionic cap copy android
        * ionic cap open android
    * Once android studio opens click the play button in the top right to build and run the application

    Note:  If you get an error referring to a cordova plugin, try running: ionic cap update android
                followed by: ionic cap open android

* iOS
    * If first build on ios or ios folder does not already exists in root directory run: 
        * ionic cap add ios
        * ionic cap open ios
    * Otherwise run:
        * ionic cap copy ios
        * ionic cap open ios
    * Once xcode opens add the development team under signing and capabilities
    * Click the play button in the top left to build and run application
