$(function(){
// append a "now" button to date fields
$('input').filter(function() {
        return this.id.match(/\w+date/);
    }).parent().append(
        "<button class='datebtn' type='button'>now</button>");

// find the buttons created above, and attach a handler to insert date/time
$('.datebtn').click(function() {
    var d = new Date();
    var se = "-";
    var mo = parseInt(d.getMonth()) + 1;
    var day = d.getDate();
    var yr = d.getFullYear();
    var dateTime = yr + se + mo + se + day;
    $(this).parent().find('input').val(dateTime);
    });


var href = document.URL; // Hide the 'new asset type' url if we are already on the creation page
url = href.substr(href.lastIndexOf('/') + 1);
if ( url == '' ) {
  url = href.substr(0, href.lastIndexOf('/'));
  url = url.substr(url.lastIndexOf('/') + 1);
} if ( isNaN(url) ) {
  console.log('hiding');
  $('#newtype').hide();
}
});




// Misc validation functions


function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateDomain(domain) {
    var re = new RegExp( //  With modifications:  https://gist.github.com/729294
    "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)?" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
          // IP address exclusion
          // private & local networks
          "(?!10(?:\\.\\d{1,3}){3})" +
          "(?!127(?:\\.\\d{1,3}){3})" +
          "(?!169\\.254(?:\\.\\d{1,3}){2})" +
          "(?!192\\.168(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
          // TLD identifier
          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:/[^\\s]*)?" +
      "$", "i"
    );
    return re.test(domain);
}

function validatePhone(phone) {
    var re = /((\(\d{3}\)?)|(\d{3}))([\s-.\/]?)(\d{3})([\s-.\/]?)(\d{4})$/;
    return re.test(phone);
}

function validateYear(year) {
    var date = new Date();
    var cur_year = date.getFullYear();
    var re = /^\d{4}$/;
    return ( ( re.test(year) ) && ( year <= cur_year ) );
}

function validateZip(zip) {
    var re = /^\d{5}(-\d{4})?$/;
    return re.test(zip);
}



function example(){
    var x;
    var watermark_color;
    $('.wpcf7-not-valid').first().each(function(){
        watermark_color = $(this).css('background-color');
    });
    $('#required-example').each(function(){
        $(this).css('background-color', watermark_color);
    });
};

function flush(){
    $('.apply-watermark').each(function(){
        if ($(this).data('watermark_text') == $(this).val()) {
            $(this).val('');
        }
    });
}

$(function() { // Misc "watermark" functions for forms PJN (jQuery)
    $('.apply-watermark').each(function(){ // Watermark function
        if (!$(this).data('watermarked')){
            $(this).data('watermarked', true);
            $(this).data('watermark_text', $(this).val());
            $(this).data('watermark_color', $(this).css('color'));
        }
    });

    if ($('.wpcf7-response-output').text() == "Your message was sent successfully. Thanks."){
        alert($('.wpcf7-response-output').text());
    }

    $('.apply-watermark').focus(function(){ // Tooltip functionality
        $(this).css('color', '#000');
        $('#tooltip').remove();
        if ($(this).data('watermark_text') == $(this).val()){
            $(this).val('');
        }
        $(this).before('<div id="tooltip"></div>');
        $('#tooltip').html('<p>' + $(this).data('watermark_text') + ':</p>' );
        var pos = $(this).position();
        b_width = $('body').width();
        t_space = $(this).offset().left;
        $('#tooltip').css('width', 'auto');
        $('#tooltip').css('max-width', (t_space - 20) + 'px' );
        $('#tooltip').css('top', (pos.top - $('#tooltip').height() + 20) + 'px' );
        $('#tooltip').css('left', pos.left);
        $('#tooltip').css('margin-left', '-'+($('#tooltip').width()+20)+'px');
        $(this).css('color', '#000');
        $(this).data('watermark_focused', true)
    });

    $('.apply-watermark').blur(function(){
        $('#tooltip').remove();
        if ($(this).val() == '') {
            $(this).css('color', $(this).data('watermark_color'));
            $(this).val($(this).data('watermark_text'));
        }
    });
    // Format the form
    $('.apply-watermark.unwrap').each(function(){
        $(this).parent().prev().remove();
    });

    // Validate, clean, submit. PJN
    $('submitButton').click(function(){
        var invalid_count = 0;
        $('.apply-watermark').each(function(){
            $(this).data('valid', null);
            var classList = $(this).attr('class').split(/\s+/);
            var val = $(this).val();
            var input = $(this);
            $.each( classList, function(index, item){
                if (item === 'wpcf7-validates-as-required'){
                    input.data('required', true);
                }

                if (item === 't-year') {
                    input.data('valid', validateYear(val));
                }
                else if (item === 't-zip') {
                    input.data('valid', validateZip(val));
                }
                else if (item === 't-tel') {
                    input.data('valid', validatePhone(val));
                }
                else if (item === 't-email') {
                    input.data('valid', validateEmail(val));
                }
                else if (item === 't-web') {
                    input.data('valid', validateDomain(val));
                }
            }); // End class marking
            if ((input.data('watermark_text') == null) || (input.data('watermark_text') == val)) {
                input.data('valid', false);
            }
            else if (input.data('valid') == null) {
                input.data('valid', true);
            } // End validity marking

            if ($(this).data('required')) {
                if (!($(this).data('valid'))) {
                    invalid_count++;
                    $(this).addClass('wpcf7-not-valid');
                }
                else {
                    $(this).removeClass('wpcf7-not-valid');
                }
            }
        }); // End marking functions
        console.log(invalid_count);
        if ($('.wpcf7-acceptance').is(':checked')){
            if  (invalid_count == 0){
                flush();
                $('.wpcf7-form').get(0).submit(function(){
                    alert($('.wpcf7-response-output').text());
                });
            }
            else {
                $('.wpcf7-response-output').addClass('wpcf7-validation-errors');
                $('.wpcf7-response-output').text('There are errors with your submission.');
                $('#required-example-text').text('*Errors are marked: ');
                scrollTo('#required-example');
                example();
                invalid_count = 0;
            }
        }
        else {
            alert('Please accept the terms.');
        }
    });
});
