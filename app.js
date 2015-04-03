(function(){

  return {
    appID:  'Quick Links',
    defaultState: 'loading',
    events: {
      'app.created': 'links',
      'ticket.custom_field_22572303.changed': 'links',
    }, //end events



    links: function(){

      var permalink;

      var dealURL = this.ticket().customField('custom_field_22572303');

      if (dealURL.indexOf('salesforce') >= 0){
        this.switchTo('error',{
          error: "This appears to be a Salesforce link.  Please check the Deal URL field."
        });
        {return;}
      }

      var regex = /.*groupon\.com\/deals\/([0-9A-z\-]+)/i;

      if (dealURL.match(regex)) {
          permalink = dealURL.match(regex)[1];
        this.switchTo('links',{
          permalink: permalink
        });
        console.log(permalink);
      }
      else if(dealURL.indexOf('/') == -1 && dealURL !== ""){

         permalink = dealURL;

        this.switchTo('links',{
          permalink: permalink
        });
      }
      else{
        this.switchTo('error',{
          error: "No valid permalink found. Please check the Deal URL field."
        });
      }

    }
  };
}());
