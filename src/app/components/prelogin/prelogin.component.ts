import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { LocalStorageService, MissionService } from '../../services';

@Component({
  selector: 'pre-login',
  templateUrl: './prelogin.component.html',
  styleUrls: ['./prelogin.component.css']
})

export class PreloginComponent implements OnInit {
  public backgroundImg;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private missionService: MissionService,
    private storageService: LocalStorageService,
  ) { }

  public ngOnInit() {
      this.backgroundImg = this.sanitizer
          .bypassSecurityTrustStyle(`url('ams/assets/img/login6.jpg')`);
  }

  public setType(type) {
    console.log('type', type);
    this.missionService.sendMessage({text: 'perlogin-success', type});
    this.router.navigate (['./login/' + type]);
  }
}
