import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor no HTML

@Component({
  selector: 'app-carrossel',
  standalone: true, // Garante que ele possa ser usado em seu projeto Standalone
  imports: [CommonModule],
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css']
})
export class CarrosselComponent implements OnInit, OnDestroy {

  // --- 1. DADOS ---
  slides: any[] = [
    { id: 1,  imgClass: 'slide-1' }, 
    { id: 2,  imgClass: 'slide-2' }, 
    { id: 3,  imgClass: 'slide-3' }, 
    { id: 4,  imgClass: 'slide-4' }, 
    { id: 5,  imgClass: 'slide-5' }, 

  ];

  // --- 2. ESTADO E BINDING (Corrigido para evitar erro de inicialização!) ---
  totalSlides: number = this.slides.length; 
  currentIndex: number = 0; 
  intervalTime: number = 4000; // 4 segundos
  carouselInterval: any; 

  // Inicializadas com 0 para satisfazer o modo strict do TypeScript
  currentTransform: string = 'translateX(0%)';
  slideWidthPercentage: number = 0;
  trackWidthPercentage: number = 0;


  ngOnInit(): void {
    // Cálculo dinâmico de largura
    this.slideWidthPercentage = 100 / this.totalSlides;
    this.trackWidthPercentage = this.totalSlides * 100;
    
    this.startAutoplay();
    this.updateTransform();
  }

  ngOnDestroy(): void {
    this.pauseAutoplay();
  }

  // --- 3. FUNÇÕES DE CONTROLE ---
  
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides; 
    this.updateTransform();
  }
  
  updateTransform(): void {
    const offset = -this.currentIndex * this.slideWidthPercentage;
    this.currentTransform = `translateX(${offset}%)`;
  }

  startAutoplay(): void {
    this.pauseAutoplay(); 
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  pauseAutoplay(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  // --- 4. HOST LISTENERS (Pausa ao Passar o Mouse) ---
  @HostListener('mouseenter')
  onMouseEnter() {
    this.pauseAutoplay();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.startAutoplay();
  }
}