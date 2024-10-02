import { Injectable } from '@angular/core';
declare var Twitch: any;

@Injectable({
  providedIn: 'root'
})
export class TwitchCallService {
  embed: any;
  embed_ready = false;
  cantidad_video = 0;

  constructor() { }

  public twitchInsert(channel:any) {
    var options = {
      width: '100%',
      height: '100%',
      channel: channel,
      controls: true,
      layout: 'video',
      muted: false
    };
    this.embed = new Twitch.Player('twitch', options);
    this.embed.setMuted(false);
    this.embed.setVolume(1);
    this.embed.addEventListener(Twitch.Embed.VIDEO_PLAY, function () {
      //@ts-ignore
      this.embed_ready = true;
      //@ts-ignore
      this.cantidad_video++;
      //@ts-ignore
      if (this.cantidad_video == 2) {
        //@ts-ignore
        this.embed.setQuality("480p30");
      } else {
        //@ts-ignore
        if (this.cantidad_video == 3) {
          //@ts-ignore
          this.embed.setQuality("360p30");
        } else {
          //@ts-ignore
          if (this.cantidad_video > 3) {
            //@ts-ignore
            this.embed.setQuality("160p30");
          }
        }
      }
    });
    this.embed.setMuted(false);
    this.embed.setVolume(1);
    this.embed.setQuality("auto")
  }

  setVolume(volume:any) {
    this.embed.setMuted(false);
    this.embed.setVolume(volume);
  }

  qualityTwitch() {
    this.embed.setQuality("160p30");
  }

  getVolume() {
    var volumen = this.embed.getVolume();
    return volumen;
  }
}