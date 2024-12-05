function signout() {
    localStorage.removeItem('accessToken'); // Or sessionStorage, depending on where it's stored
    window.location.href = '/login'; // Redirect to the login page
  }
  