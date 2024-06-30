import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HomeComponent],
  template: `
    <main>
    <header>
    <nav>
      <div class="nav-content">
        <div class="brand">
          <a href="#">MovieCarter</a>
        </div>
        <div class="tagline">
          <span>Tu cartelera de películas online</span>
        </div>
      </div>
    </nav>
  </header>
      <section>
        <router-outlet></router-outlet>
      </section>
    </main>
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 MovieCarter. Todos los derechos reservados.</p>
        <p>
          <a href="#">Política de Privacidad</a> | <a href="#">Términos de Servicio</a> |
          <a href="#">Contacto</a>
        </p>
      </div>
    </footer>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MovierCarter';
}
