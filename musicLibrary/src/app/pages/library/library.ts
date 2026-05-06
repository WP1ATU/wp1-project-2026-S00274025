import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../services/library';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class LibraryComponent implements OnInit {

  tracks: any[] = [];

  constructor(private library: LibraryService) {}

  ngOnInit() {
    this.library.getSongs().subscribe({
      next: (data) => {
        this.tracks = data;
        console.log(this.tracks);
      },
      error: (err) => console.error('Ошибка:', err)
    });
  }

  remove(id: string) {
    this.library.removeSong(id).subscribe(() => {
      this.loadSongs(); 
    });
  }

  private loadSongs() {
    this.library.getSongs().subscribe(data => {
      this.tracks = data;
    });
  }
}