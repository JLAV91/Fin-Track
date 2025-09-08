
// Buscar elementos en el html para guiardalos como variables
const loginForm = document.getElementById('loginForm');
const alertLogin = document.getElementById('alertLogin');

//Este Login form esta revisando antes de comenzar el codigo si en el DOM ya existe el formulario antes de utilizarlo
if (loginForm) {
  //El addEventListener esta "escuchando" al fomrulario cuando se envia, (al hacer click en submit)
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailLogin = document.getElementById('emailLogin').value.trim();
    const passwordLogin = document.getElementById('passwordLogin').value;

    alertLogin.innerHTML = '';

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
      alertLogin.innerHTML = `<div class="alert alert-warning" role="alert">No hay cuentas registradas.</div>`;
      return;
    }

    if (emailLogin === usuario.email && passwordLogin === usuario.password) {
      alertLogin.innerHTML = `<div class="alert alert-success" role="alert">¡Bienvenido ${usuario.nombre}!</div>`;
      loginForm.reset();
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      alertLogin.innerHTML = `<div class="alert alert-danger" role="alert">Correo o contraseña incorrectos.</div>`;
    }
  });
}