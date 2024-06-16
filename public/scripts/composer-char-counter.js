import $ from 'jquery';
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

$(document).ready(function() {
  console.log('Document is ready');

  $("#btn").on('click', function() {
  console.log(this); //The this keyword is a reference to the button
});

$("#btn").on('click', () => {
  console.log(this); //The this keyword here refers to something else!
});
});


// $('.textarea').on('input', function() {
//   const maxLength = 140;
//   const currentLength = $(this).val().length;
//   const remainingLength = maxLength - currentLength;

//   const counter = $(this).closest('.new-tweet').find('.counter');
//   counter.text(remainingLength);

//   if (remainingLength < 0) {
//     counter.addClass('over-limit');
//   } else {
//     counter.removeClass('over-limit');
//   }
// });