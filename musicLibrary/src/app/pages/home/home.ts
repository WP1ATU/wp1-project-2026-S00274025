import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify';
import { LibraryService } from '../../services/library';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  tracks: any[] = [];

  constructor(
    private spotify: SpotifyService,
    private library: LibraryService
  ) {}

  ngOnInit() {
    this.loadTracks();
  }

  loadTracks() {
    this.spotify.getTracks().subscribe(res => {
      this.tracks = res.tracks.items;
    });
  }

  addToLibrary(track: any) {
    const song = {
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      image: track.album.images[0]?.url
    };

    this.library.addSong(song).subscribe();
  }

  skip(track: any) {
    this.tracks = this.tracks.filter(t => t.id !== track.id);
  }
}