/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let body = document.querySelector('.sidebar-mini');
    let toggle = document.querySelector('.sidebar-toggle');

    toggle.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const btnLogin = document.querySelector(".menu-item_login");
    const btnLogOut = document.querySelector(".menu-item_logout");
    const btnReg = document.querySelector(".menu-item_register");

    btnLogin.addEventListener("click", () => {
      App.getModal("login").open();
    });

    btnLogOut.addEventListener("click", () => {
      User.logout((error, response) => {
        if (error) {
          console.error(error);
          return;
        }
        if (response.success) {
          App.setState("init");
        }
      });
    });

    btnReg.addEventListener("click", () => {
      App.getModal("register").open();
    });
  }
}