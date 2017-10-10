import React from 'react';
import $ from 'jquery';
class Footer extends React.Component{
	render() {
		return (
			<div id="footerBox">
      </div>
		)
	}

  
	componentDidMount() {
      var This = this;
      var reg=new RegExp(/(<img src=")/g);
  		$.ajax({
          type: "get",
          url: "http://10.10.20.201/public_resources/public_footer/index.shtml",
          data: {},
          dataType: "html",
          async: false,
          cache: false,
          success: function(dataJson){
             //var newstr=dataJson.replace(reg,"$1/resource"); 
             $('#footerBox').html(dataJson);
             This.footerJs();
          },
          error: function(jqXHR, textStatus, errorThrown) {
              
          }
      });
	}
  footerJs() {
      var len = $('.about_box h3').not(':last').length;
      $('.about_box h3').not(':last').click(function() {
         $(this).closest('div').find('.secondCox').slideToggle()
      })
  }

}


export default Footer;