angular.module( 'acquisitionApp')
	.filter( 'shortNumber', function() {
		return function( number ) {
			if ( number ) {
				abs = Math.abs( number );
				if ( abs >= Math.pow( 10, 12 ) ) {
					// trillion
					number = "$" + ( number / Math.pow( 10, 12 ) ).toFixed( 1 ) + " Trillion";
				} else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
					// billion
					number = "$" + ( number / Math.pow( 10, 9 ) ).toFixed( 1 ) + " Billion";
				} else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
					// million
					number = "$" + ( number / Math.pow( 10, 6 ) ).toFixed( 1 ) + " Million";
				} else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
					// thousand
					number = "$" + ( number / Math.pow( 10, 3 ) ).toFixed( 1 ) + " Thousand";
				}
				return number;
			}
		};
	})
	.filter( 'description', function() {
		return function(desc) {
			if (desc) {
				if(desc.length > 215) {
					var short = desc.substring(0, 215);
					return short += "...";
				}
				return desc;
			}
		};
	})
	.filter('fieldFilter', function() {
	    return function(acquis, fieldFilter) {
	        if(fieldFilter.length > 0) {
	        	var newFieldAcquis = [];
	            for(var i = 0; i < fieldFilter.length; i++) {
	            	for(var j = 0; j < acquis.length; j++) {
	                	if(acquis[j].seller.field === fieldFilter[i]) {
	                    	newFieldAcquis.push(acquis[j]);
	                	}
	            	}
	            }
	            return newFieldAcquis;
	        } else {
	            return acquis;
	        }
	    }
	})
	.filter('countryFilter', function() {
	    return function(acquis, countryFilter) {
	        if(countryFilter.length > 0) {
	        	var newCountryAcquis = [];
	            for(var i = 0; i < countryFilter.length; i++) {
	            	for(var j = 0; j < acquis.length; j++) {
	                	if(acquis[j].seller.country === countryFilter[i]) {
	                    	newCountryAcquis.push(acquis[j]);
	                	}
	            	}
	            }
	            return newCountryAcquis;
	        } else {
	            return acquis;
	        }
	    }
	})
	.filter('readableLink' , function() {
		return function(link) {
			if(link) {
				if(link.search('techcrunch') != -1) {
					link = "Techcrunch";
				} else if(link.search('.bvdinfo.com') != -1) {
					link = "Zephyr";
				} else if(link.search('theguardian.') != -1) {
					link = "The Guardian";
				} else if(link.search('//seekingalpha') != -1) {
					link = "Seeking Alpha";
				} else if(link.search('.') != -1) {
					link = link.split(".")[1];
				}
				return link.charAt(0).toUpperCase() + link.slice(1);
			}
		};
	})
	.filter('valueString' , function() {
		return function(MarketCapitalization) {
			if(MarketCapitalization) {
				if(MarketCapitalization.search('B') != -1) {
					MarketCapitalization = MarketCapitalization.split('B')[0] + " Billion";
				}
			}
			return "$" + MarketCapitalization;
		}
	})