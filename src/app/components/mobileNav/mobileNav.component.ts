import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'mobile-nav',
  templateUrl: './mobileNav.component.html',
  styleUrls: ['./mobileNav.component.css']
})

export class MobileNavComponent {
    @Input() public mobileNavStatusChanged: boolean;
    public subscription: Subscription;
    public isMobileNavVisible = false;
    public mobileNaveClass = 'mobile-left-nav-hide';
    public userImage = 'assets/img/user.png';
    public users = {
        'mfguseroem' : 'Devendra Negi',
        'shivam.kumardelear' : 'Rishi Sharma'
    };

    // public ngOnChanges() {
    //     //console.log('change alertData:-', this.alertData);
    //     this.isMobileNavVisible = this.mobileNavStatusChanged;
    //     console.log('on ngChange:-', this.mobileNavStatusChanged);
    // }
    constructor(private eRef: ElementRef) { }
    @HostListener('document:click', ['$event'])
    @HostListener('document:touchstart', ['$event'])
    public handleOutsideClick(event) {
        if(this.eRef.nativeElement.contains(event.target)) {
            console.log('click inside');
        } else {
            if(this.mobileNavStatusChanged) {
                this.mobileNavStatusChanged = false;
            }
        }
    }

    public mobileLink(link) {
        this.mobileNavStatusChanged = !this.mobileNavStatusChanged;
    }
      public logout() {
    // this.storageService.delete('userId');
    // this.storageService.delete('userType');
    // this.missionService.sendMessage({text: 'pre-login'});
    // window.location = "https://ams.lgamn.com/logout";
    // this.authenticationService.logout();
    return true;
  }
}
