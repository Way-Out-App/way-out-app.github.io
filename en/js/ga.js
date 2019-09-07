(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-40141654-4', 'auto');
ga('send', 'pageview');

/*
This allows tracking when people click on outbound links when necessary
https://support.google.com/analytics/answer/1136920?hl=en
 */
var captureOutboundLink = function(url) {
  ga('send', 'event', 'outbound', 'click', url, {
    'transport': 'beacon',
    'hitCallback': function(){document.location = url;}
  });
};

/*
Add onclick to all loaded elements
 */
var elements = document.getElementsByTagName('a');
for(var i = 0, len = elements.length; i < len; i++) {
  const element = elements[i];
  element.onclick = function () {
    const linkUrl = (element && element.href) || null;
    if (linkUrl) {
      const isInternalLink = ['transitapp.com', 'transit.app', 'localhost'].some(url => linkUrl.includes(url));
      if (!isInternalLink) {
        // Log event to Google Analytics for tracking purposes
        captureOutboundLink(linkUrl);
      }
    }
  }
}
