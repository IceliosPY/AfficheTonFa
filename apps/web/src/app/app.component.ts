import { Component } from '@angular/core';
import { BoardCanvasComponent } from './board-canvas.component';

@Component({
  selector: 'atf-main',
  standalone: true,
  imports: [BoardCanvasComponent],
  template: `
    <main class="workspace" aria-label="Fiche Papacito">
      <atf-board-canvas></atf-board-canvas>
    </main>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
