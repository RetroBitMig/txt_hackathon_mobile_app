import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
/**
 * Generated class for the DetailedAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detailed-app',
  templateUrl: 'detailed-app.html',
})
export class DetailedAppPage {
  application;
  constructor(public authService: AuthServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    // Pull param data passed from last page on page construction
    this.application = this.navParams.get('data');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedAppPage');
  }

  // Pull param data passed from last page on page enter
  // Fallback in case data isnt pulled in constructor
  ionViewWillEnter(){
    this.application = this.navParams.get('data');
    console.log(this.application);
  }

}
