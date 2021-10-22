var years_list = ['2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','1999','1997','1996'];

$(document).ready(function(){
  var count = years_list.length;
  var year_html = "";
  for (var i=0; i<count; i++) {
    year_html += '<button type="button" class="single-button year-button" data-value="'+years_list[i]+'"><input type="radio" name="year" class="hidden-radio" value="'+years_list[i]+'">'+years_list[i]+'</button>';
  }
  $("#all-years").html(year_html);
});
$(document).on('click','.year-button',function () {
  var car_year = $(this).attr('data-value');
  $("#car-year-value").val(car_year);
  $.ajax({
    method: "GET",

    url: "files/cars.json",

    data: {},
    success: function (data) {
      for (i = 0; i < data.years.length; i++) {
        var years = data.years[i];
        var year = years.year;
        if (car_year == year) {
          var cars = years.cars;
          localStorage.setItem("year", car_year);
          localStorage.setItem("cars", JSON.stringify(cars));
          genrate_cars_buttons();
          return false;
        }
      }
    },
    error: function (xhr, desc, err) {
      console.log(err);
    },
  });
});

function genrate_cars_buttons() {
  var cars_data = localStorage.getItem("cars");
  cars_data = JSON.parse(cars_data);
  var make_html = "";
  for (i = 0; i < cars_data.length; i++) {
    make_html += '<button type="button" class="single-button make-button" data-value="'+cars_data[i].car+'">'+cars_data[i].car+'</button>';
  }

  $("#all-make").html(make_html);
}

$(document).on('click','.make-button',function () {
  var car_make = $(this).attr('data-value');
  $("#car-make-value").val(car_make);

  var cars_data = localStorage.getItem("cars");

  cars_data = JSON.parse(cars_data);

  for (i = 0; i < cars_data.length; i++) {
    var selected_car = cars_data[i];

    if (car_make == selected_car.car) {
      var modals = selected_car.modals;

      localStorage.setItem("models", JSON.stringify(modals));

      genrate_modals_buttons();

      return false;
    }
  }
});

function genrate_modals_buttons() {
  var models_data = localStorage.getItem("models");
  models_data = JSON.parse(models_data);
  var model_html = "";
  for (i = 0; i < models_data.length; i++) {
    model_html += '<button class="single-button model-button" type="button" data-value="'+models_data[i]+'">'+models_data[i]+'</button>';
  }

  $("#all-model").html(model_html);
}

$(document).on('click','.model-button',function () {
  var car_model = $(this).attr('data-value');
  $("#car-model-value").val(car_model);
  console.log("Next Step");
});