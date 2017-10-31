import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailedAppPage } from '../detailed-app/detailed-app';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { LoadingController } from 'ionic-angular';
import { ApplicationModalPage } from '../application-modal/application-modal';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-show-apps',
  templateUrl: 'show-apps.html',
})
export class ShowAppsPage {
  // Applications initialization
  // Array that will hold all of the application stored in the device
  applications = [];
  appsToUpload = [];
  loader;
  canUpload = false;
  uploaded;
  notUploaded;
  status;
  errorCount;
  password  = "txt";

  constructor(private nativeStorage: NativeStorage, private network: Network, public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    // initialize  counters at 0
    this.errorCount = 0;
    this.uploaded = 0;
    this.notUploaded = 0;

    this.nativeStorage.keys()
      .then((result) => {
        for (let i in result) {
          this.nativeStorage.getItem(result[i]).then(
            (result) => {
              // check if it was uploaded before
              if (result.uploaded == false) {
                this.canUpload = true;
                this.notUploaded += 1;
                this.appsToUpload.push(result);
              } else {
                this.uploaded += 1;
              }

              this.applications.push(result)
            }, (err) => {
              console.log(err);
            }
          )
        }
      }, (err) => {
        console.log(err);
      })
    // // Pull application data from local storage and push into array
    // this.storage.forEach((data) => {
    //   if (data.uploaded == false) {
    //     this.canUpload = true;
    //     this.notUploaded += 1;
    //   } else {
    //     this.uploaded += 1;
    //   }
    //   // push each application data into our applications array
    //   this.applications.push(data);
    // })
  }
  // start the process to upload application on btn click
  startUploadProcess() {
    let wificheck = this.wifiCheck();
    if (wificheck) {
      //reset error count
      this.errorCount = 0;
      // show the loading dialog
      this.presentLoading();

      this.uploadApplications((result) => {
        // dismiss loader on upload finish
        this.loader.dismiss();
        this.uploadErrorCheck(result);
      })
    } else {
      this.presentWifiAlert()
    }

  }

  // take array of applications pass each one to upload service/function
  uploadApplications(callback) {

    // uploaded documents aysncrously
    for (let i in this.appsToUpload) {
      // check if application has been uploaded before 
        this.uploadOne(this.appsToUpload[i], i ,(result) => {
          console.log("here is the result " + result);
          if (result == false) {
            // update counter on upload failure
            this.errorCount += 1;
          } else {
            // upadate value of successful uploads
            this.successfulUpload(i);
          }
          if (i == String(this.appsToUpload.length -1)){
            callback(this.errorCount);
          }
        })
      
    } // end for loop
  }

  // upload application
  uploadOne(app, num, callback) {
    var msg = "Uploading Applications" ;
    this.loader.setContent(msg);
    this.http.post("http://5f70520b.ngrok.io/app/saveApp", app)
      .map(res => res.json())
      .subscribe(
      response => {
        // return true on success
        callback(true)
      },
      error => {
        // return false on failure
        callback(false)
      })
  }

  // manage applications that were uploaded successfully
  successfulUpload(i) {
    // Store new values in local storage
    this.appsToUpload[i].uploaded = true;
    this.nativeStorage.setItem(this.appsToUpload[i].key, this.appsToUpload[i]);
  }

  // show alert for applications that faild to upload
  uploadErrorCheck(count) {
    if (count > 0){
      this.presentUploadAlert(count);
    }else{
      this.canUpload = false;
      this.uploaded = this.applications.length;
      this.notUploaded = 0;
      console.log(this.uploaded);
      console.log(this.notUploaded);
      this.presentSuccessAlert();
    }
  }

  // push applicaiton data to detailed view page
  pushToPage(app) {
    // show login screen
    const alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            if(data.password == this.password)
            {
              this.navCtrl.push(DetailedAppPage, {
                data: app
              });
            }else{
              this.presentLoginAlert();
            }
          }
        }
      ]
    });
    alert.present();
  }
  // error when signing
  presentLoginAlert() {
    const alert = this.alertCtrl.create({
      title: 'Invalid Password',
      subTitle: "Wrong password was entered",
      buttons: ['Dismiss']
    });
    alert.present();
  }
  // check for wifi signal
  wifiCheck() {
    if (this.network.type == "wifi" || this.network.type == '4g' || this.network.type == '3g' || this.network.type == '2g' || this.network.type == 'cellular') {
      return true;
    } else {
      return false;
    }
  }

  // alert message content
  presentUploadAlert(count) {
    let msg = count + " applications failed to upload. Please try again."
    const alert = this.alertCtrl.create({
      title: 'Application Upload Error',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // present wifi alert
  presentWifiAlert() {
    const alert = this.alertCtrl.create({
      title: 'Wifi Connection Error!',
      subTitle: "No wifi signal detected. Please connect to wifi and try again.",
      buttons: ['Dismiss']
    });
    alert.present();
  }

  // present wifi alert
  presentSuccessAlert() {
    var msg = "Successfully uploaded " + this.appsToUpload.length + " of " + this.appsToUpload.length;
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: msg,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  

  // Loader when uploading applications 
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Uploading Applications"
    });
    this.loader.present();
  }

  // show info on all applicaitons
  // activited by top right menu button
  presentModal() {
    const profileModal = this.modalCtrl.create(ApplicationModalPage, {
      uploaded: this.uploaded,
      notUploaded: this.notUploaded
    });
    profileModal.present();
  }
}



/// replace with line 118     this.http.post("https://txt-server.herokuapp.com/app/saveApp", app)
