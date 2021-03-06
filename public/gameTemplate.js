(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['gameTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"game\" data-price=\""
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "\">\r\n  <div class=\"game-contents\">\r\n	<div class=\"game-image-container\">\r\n	  <img src=\""
    + alias4(((helper = (helper = helpers.boxArt || (depth0 != null ? depth0.boxArt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"boxArt","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.gameTitle || (depth0 != null ? depth0.gameTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gameTitle","hash":{},"data":data}) : helper)))
    + "\">\r\n	</div>\r\n	<div class=\"game-info-container\">\r\n	  <a href=\"#\" class=\"game-title\">"
    + alias4(((helper = (helper = helpers.gameTitle || (depth0 != null ? depth0.gameTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"gameTitle","hash":{},"data":data}) : helper)))
    + "</a> \r\n	  <span class=\"game-price\">$"
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</span>\r\n	</div>\r\n  </div>\r\n</div>";
},"useData":true});
})();