import './style/main.scss';
import $ from 'jquery';

$( () => {

  // stars toogle highlight
  $(".star").click(function() {
    $(this).toggleClass("star--checked");
  });

  // choosing filters
  $(".sidebar-content__element").click(function() {
    $(".sidebar-content__element").removeClass("selected");
    $(this).addClass("selected");
  });
  
  // close button
  $(".JS-exit").click(function() {
    $(".app-container").fadeOut("slow");
  });

});
