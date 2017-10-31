import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApplicationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-application-modal',
  templateUrl: 'application-modal.html',
})
export class ApplicationModalPage {
  uploaded;
  notUploaded;
  total;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        // initialize uploaded and not uploaded counters at 0
        this.uploaded = 0;
        this.notUploaded =0;
        this.total =0;

        // get counter values from params
        this.uploaded = navParams.get('uploaded');
        this.notUploaded = navParams.get('notUploaded');
        this.total = this.uploaded + this.notUploaded;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationModalPage');
  }
  goBack(){
    this.navCtrl.pop();
  }

}
