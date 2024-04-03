import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DutyTypeMessage } from 'src/app/model/duty';
import { SocialParamWithName } from 'src/app/model/param';
import { SocialMediaService } from 'src/app/service';
import { SocialMediaEventService } from 'src/app/service/event/social-media-event.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  socialMediaTwitter: SocialParamWithName | null = {link: '', active: false, name: 'TWITTER'};
  socialMediaFacebook: SocialParamWithName | null = {link: '', active: false, name: 'FACEBOOK'};
  socialMediaYoutube: SocialParamWithName | null = {link: '', active: false, name: 'YOUTUBE'};
  socialMediaInstagram: SocialParamWithName | null = {link: '', active: false, name: 'INSTAGRAM'};
  socialMediaLinkedin: SocialParamWithName | null = {link: '', active: false, name: 'LINKEDIN'};

  subscription!: Subscription;

  constructor(private socialMediaService : SocialMediaService,
    private socialMediaEventService: SocialMediaEventService){}

  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }

  ngOnInit() {
    this.subscription = this.socialMediaEventService.getMessage().subscribe((message : {operation: string} | null) => {
      if(message){
          this.refreshSocialMedia();
      }
    });

    this.refreshSocialMedia();
  }

  private refreshSocialMedia() : void {
    this.socialMediaService.getAll().subscribe(data => {
      this.socialMediaLinkedin = data.find(it => it.name === 'LINKEDIN') || null;
      this.socialMediaTwitter = data.find(it => it.name === 'TWITTER') || null;
      this.socialMediaFacebook = data.find(it => it.name === 'FACEBOOK') || null;
      this.socialMediaYoutube = data.find(it => it.name === 'YOUTUBE') || null;
      this.socialMediaInstagram = data.find(it => it.name === 'INSTAGRAM') || null;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
