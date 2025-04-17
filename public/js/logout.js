/* eslint-disable */

const logoutBtn = document.querySelector('.nav__el--logout');

async function logout() {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    e.preventDefault();

    logout();
  });
}
