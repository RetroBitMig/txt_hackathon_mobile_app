import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  loader;
  // Sample application data used for submitting form faster
  // Comment out in production
  // application = {
  //   key: '',
  //   uploaded: false,
  //   first_name: "Roberto",
  //   last_name: "Sanchez",
  //   age:"21",
  //   email:"robb177@gmail.com",
  //   grade:"7th",
  //   phone_number:"2133009188",
  //   phone_type:"Parent's Number",
  //   school:"West Los Angeles College",
  //   ethnicity: "Latino/Hispanic",
  //   computers: "Yes",
  //   wifi: "No"
  // };

  // Initialization of application model for form
  // Comment out in development and use sample application data for easier testing
  application = {
    key: '',
    uploaded: false,
    first_name: "",
    last_name: "",
    age:"",
    email:"",
    grade:"",
    phone_number:"",
    phone_type:"",
    school:"",
    ethnicity: "",
    computers: "",
    wifi: "" 
  }


  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController,private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
  }

  logForm() {
    this.submitForm();
  }

  // Empty Form after submission
  emptyForm() {
    this.application = {
      key: '',
      uploaded: false,
      first_name: "",
      last_name: "",
      age:"",
      email:"",
      grade:"",
      phone_number:"",
      phone_type:"",
      school:"",
      ethnicity: "",
      computers: "",
      wifi: "" 
    }
  }

  // // Submit Form data
  // submitForm() {
  //   // store generated key into application model
  //   this.application.key = this.makeId();
  //   // store application in local storage
  //   this.storage.set(this.application.key, this.application);
  //   // Empty the form
  //   this.emptyForm();
  // }


  // Submit Form data
  submitForm() {
    this.presentLoader();
    // store generated key into application model
    this.application.key = this.makeId();
    // store application in local storage
    this.nativeStorage.setItem(this.application.key, this.application)
    .then(
      () =>{
        this.presentSuccessAlert();
        // Empty the form
        this.emptyForm();
      },
      (error) => {  
        this.presentUploadAlert(error);
      }
    );

  }
  // Generate psdeuo random id for each application
  makeId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text);
    return text;
  }
  // alert message content
  presentUploadAlert(err) {
    console.log(err);
    this.loader.dismiss();
    let msg = "Error saving Application Please try again."
    const alert = this.alertCtrl.create({
      title: 'Application Save Error',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  // alert message content
  presentSuccessAlert() {
      this.loader.dismiss();
      let msg = "Successfully Saved Application"
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: msg,
        buttons: ['Dismiss']
      });
      alert.present();
    }

  // display loader
  presentLoader() {
    // Loader when saving img
    this.loader = this.loadingCtrl.create({
      content: "Saving Application Locally"
    });
    // present loader
    this.loader.present();
  }
}
