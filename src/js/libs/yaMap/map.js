import logo from '../../../img/map/location-pin.svg'

ymaps.ready(init);
function init() {
  
  var myMap = new ymaps.Map("map", {
    center: [59.943543, 30.338928],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark(
    [59.943543, 30.338928],
    {
      balloonContent: `
        <div class="balloon">
          <div class="balloon__address">Наб. реки Фонтанки 10-15</div>
          <div class="balloon__contacts">
            <a href="tel:+78121234567">+8 (812) 123-45-67</a>
          </div>
        </div>
      `,
    },
    {
      iconLayout: 'default#image',
      iconImageHref: logo,
      icon_imagesize: [40, 40],
      iconImageOffset: [-20, -40]
    });

    myMap.controls.remove('geolocationControl')
    myMap.controls.remove('searchControl')
    myMap.controls.remove('trafficControl')
    myMap.controls.remove('typeSelector')
    myMap.controls.remove('rulerControl')
    myMap.controls.remove(['scrollZoom'])
    
    myMap.geoObjects.add(myPlacemark);
    // myPlacemark.balloon.open()
}