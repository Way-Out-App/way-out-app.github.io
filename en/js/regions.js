$(function() {
  var email = getCookie('email'),
      currentRegion = $("#all-regions").data("currentregion"),
      currentCountry = $("#all-regions").data("currentcountry");

  // Show/hide multimodal sections
  $(".multimodal .logos-container a").on('click', function() {
    var logoClass = this.href.split("#")[1];

    $(".multimodal").hide();
    $(".multimodal." + logoClass).show();
    return false;
  });

  // Regions menu
  function populateRegionsMenu(country) {
    var regionsMenu = [],
        countryRegions = regions[country];

    $(countryRegions).each(function(index, region) {
      var $item = $("<a>", { href: "/region/" + region.slug }).text(region.region);

      if (currentRegion && (region.slug === currentRegion.slug)) {
        $item.addClass('active');
      }

      regionsMenu.push($item);
    });

    $(".cities").empty().append(regionsMenu);
    return false;
  }

  $("#see-all-regions").on('click', function() {
    $("section#all-regions").toggle();
  });

  if (((currentRegion && currentRegion.score) || !currentCountry) || (location.hash.split('#')[1] && location.hash.split('#')[1].match(/all-regions/))) {
    $("section#all-regions").show();
  }

  // Build the countries/regions menu
  var regions = $("#all-regions").data("regions"),
      countries = $("#all-regions").data("countries");

  var countriesMenu = [];
  $(countries).each(function(index, country) {
    var $item = $("<a>", { href: "#" + country }).text(country);

    if (currentRegion && (country === currentCountry)) {
      $item.addClass('active');
    }

    $item.on('click', function() {
      $(".countries a").removeClass("active");
      $(this).addClass("active");

      populateRegionsMenu(country);
      return false;
    });
    countriesMenu.push($item);
  });

  $(".countries").append(countriesMenu);
  populateRegionsMenu(currentCountry || "United States");

  $("#overlay a").on('click', function() {
    $("#overlay").hide();
  });

  function recordVote(regionId) {
    if (regionIds = getCookie('votedRegionIds')) {
      var currentValue = JSON.parse(regionIds);
      currentValue.push(regionId);
      setCookie('votedRegionIds', JSON.stringify(currentValue));
    } else {
      setCookie('votedRegionIds', JSON.stringify([regionId]));
    }
  }

  // Cookie handling
  function setCookie(name, value) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);

    var c_value = escape(value) + "; path=/; expires="+exdate.toUTCString();
    document.cookie = name + "=" + c_value;
  }

  function getCookie(name) {
      var i,x,y,ARRcookies=document.cookie.split(";");

      for (i = 0; i < ARRcookies.length; i++) {
          x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
          y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
          x = x.replace(/^\s+|\s+$/g,"");

          if (x == name) {
              return unescape(y);
          }
      }
  }
});
