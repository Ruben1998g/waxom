$("#immersive_slider").immersive_slider({
  animation: "bounce", // As usual, you can change the animation to these: slide (default), bounce, fade, slideUp, and bounceUp
  slideSelector: ".slide", // This option will let you assign c coustom selector for each slides in case .slide is already taken
  container: ".main", // This option lets you define thentainer of which the background will appear. Make sure the slider is inside this container as well.
  cssBlur: false, // Experimental: In case you don't want to keep adding new data-blurred attributes, trigger this to true and it will generate the blur image on the fly (more info below).
  pagination: true, // Toggle this to false if you don't want a pagination
  loop: true, // Toggle to false if you don't want the slider to loop. Default is true.
  autoStart: false // Define the number of milliseconds before it navigates automatically. Change this to 0 or false to disable autoStart. The default value is 5000.
});

var multiItemslidernew = (function () {
      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // основный элемент блока
          _slidernewWrapper = _mainElement.querySelector('.slidernew__wrapper'), // обертка для .slidernew-item
          _slidernewItems = _mainElement.querySelectorAll('.slidernew__item'), // элементы (.slidernew-item)
          _slidernewControls = _mainElement.querySelectorAll('.slidernew__control'), // элементы управления
          _slidernewControlLeft = _mainElement.querySelector('.slidernew__control_left'), // кнопка "LEFT"
          _slidernewControlRight = _mainElement.querySelector('.slidernew__control_right'), // кнопка "RIGHT"
          _wrapperWidth = parseFloat(getComputedStyle(_slidernewWrapper).width), // ширина обёртки
          _itemWidth = parseFloat(getComputedStyle(_slidernewItems[0]).width), // ширина одного элемента    
          _positionLeftItem = 0, // позиция левого активного элемента
          _transform = 0, // значение транфсофрмации .slidernew_wrapper
          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
          _items = []; // массив элементов
        // наполнение массива _items
        _slidernewItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getMin: 0,
          getMax: _items.length - 1,
        }

        var _transformItem = function (direction) {
          if (direction === 'right') {
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
              return;
            }
            if (!_slidernewControlLeft.classList.contains('slidernew__control_show')) {
              _slidernewControlLeft.classList.add('slidernew__control_show');
            }
            if (_slidernewControlRight.classList.contains('slidernew__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
              _slidernewControlRight.classList.remove('slidernew__control_show');
            }
            _positionLeftItem++;
            _transform -= _step;
          }
          if (direction === 'left') {
            if (_positionLeftItem <= position.getMin) {
              return;
            }
            if (!_slidernewControlRight.classList.contains('slidernew__control_show')) {
              _slidernewControlRight.classList.add('slidernew__control_show');
            }
            if (_slidernewControlLeft.classList.contains('slidernew__control_show') && _positionLeftItem - 1 <= position.getMin) {
              _slidernewControlLeft.classList.remove('slidernew__control_show');
            }
            _positionLeftItem--;
            _transform += _step;
          }
          _slidernewWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function (e) {
          if (e.target.classList.contains('slidernew__control')) {
            e.preventDefault();
            var direction = e.target.classList.contains('slidernew__control_right') ? 'right' : 'left';
            _transformItem(direction);
          }
        };

        var _setUpListeners = function () {
          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
          _slidernewControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        // инициализация
        _setUpListeners();

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          }
        }

      }
    }());

    var slidernew = multiItemslidernew('.slidernew')