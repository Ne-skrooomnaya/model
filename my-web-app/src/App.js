/* eslint-disable no-undef */
    // app.js (пример)
    document.addEventListener("DOMContentLoaded", () => {
      const tg = window.Telegram.WebApp; // Получаем объект Telegram WebApp
      tg.ready(); // Говорим TG, что приложение готово

      const dealButton = document.getElementById("deal-button");
      const gameStatus = document.getElementById("game-status");
      const cardsContainer = document.getElementById("cards");

      let deck = [];
      let playerHand = [];

      dealButton.addEventListener("click", () => {
          startGame();
      });

      function startGame() {
          deck = shuffleDeck(createDeck());
          playerHand = dealHand(5); // Раздаем 5 карт
          renderHand();
          gameStatus.textContent = "Игра началась!";
          tg.MainButton.text = "Сбросить карты";  // Изменяем текст главной кнопки
          tg.MainButton.show(); // Показываем главную кнопку
          tg.MainButton.onClick(() => {  // Обработчик нажатия на главную кнопку
              // TODO: Implement discard logic
              gameStatus.textContent = "Карты сброшены!";
              tg.MainButton.hide();
          });
      }

      function dealHand(numCards) {
          const hand = [];
          for (let i = 0; i < numCards; i++) {
              hand.push(deck.pop());
          }
          return hand;
      }

      function renderHand() {
          cardsContainer.innerHTML = ""; // Очищаем текущие карты
          playerHand.forEach(card => {
              const cardElement = document.createElement("div");
              cardElement.classList.add("card");
              cardElement.textContent = `${card.rank} ${card.suit}`;
              cardsContainer.appendChild(cardElement);
          });
      }

      // Получаем данные пользователя (опционально)
      const user = tg.initDataUnsafe?.user;
      if (user) {
          gameStatus.textContent = `Привет, ${user.first_name}!`;
      }
  });
