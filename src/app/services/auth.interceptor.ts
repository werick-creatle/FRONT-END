import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Tenta pegar o texto que eu salvei no Login
  const usuarioLogado = localStorage.getItem('usuario_logado');
  
  if (usuarioLogado) {
    // 2. Transforma o texto em Objeto para ler o Token
    const dados = JSON.parse(usuarioLogado);
    const token = dados.token; // O nome do campo que vem da sua API

    if (token) {
      // 3. Clona a requisição original e cola o Token no cabeçalho
      const reqComToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Manda a requisição turbinada
      return next(reqComToken);
    }
  }

  // Se não tiver token, manda a requisição normal (sem nada)
  return next(req);
};