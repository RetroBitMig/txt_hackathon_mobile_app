import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormPage } from '../form/form';
import { ShowAppsPage } from '../show-apps/show-apps';
import { PetitionPage } from '../petition/petition';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  formPage = FormPage;
  showApps = ShowAppsPage;
  
  constructor(public navCtrl: NavController) {

  }
  petitionPage(){
    console.log("hello")
    this.navCtrl.push(PetitionPage);
  }
}
