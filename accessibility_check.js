(function($){
    console.clear();
    /*********************************************************************/
    /*    Check if SVG and Font Awesome Icons are either hidden          */
	/*    (with aria-hidden="true") or, with SVGs, that they have        */
	/*    some manner of aria-label or aria-labelledby attribute.        */
    /*********************************************************************/
    var $badIcons = [];
    $("svg,.fa").each(function(){
		if(
			$(this).attr("aria-hidden") !== "true" &&
			( $(this).is("svg") && !$(this).attr('aria-labelledby') && !$(this).attr("aria-label") )
		){
            $badIcons.push($(this).get(0));
        }
    });

    if($badIcons.length > 0){
        console.log("Found Icons without aria-hidden:");
        console.log($badIcons);
    }


	/***********************************************************/
	/*   Headers - Check if there are multiple <h1> elements   */
	/***********************************************************/
	var h1Elements = $("h1");

	if(h1Elements.length > 1){
		console.log("Found Multiple <h1> elements: ");
		console.log( document.querySelectorAll("h1") );
	}

	/***********************************************************/
	/*    Headers - Check if there are out-of-order headers    */
	/***********************************************************/
	/*    UserWay puts this attribute on headers that it       */
	/*    judges to be out of order; pretty good indication    */
	/***********************************************************/
	var $oooHeaderElements = $("[data-uw-rm-heading='level']");

	if($oooHeaderElements.length > 0){
		console.log("Found Out-of-Order Headers: ");
		console.log( $oooHeaderElements );
	}

    /*******************************************************/
    /*   IFrames - Make sure they have a title attribute   */
    /*******************************************************/
    var $badFrames = [];
    $("iframe").each(function(){
        if( $(this).attr("src") && !$(this).attr("title")){
            $badFrames.push($(this).get(0));
        } 
    });

    if($badFrames.length > 0){
        console.log("Found Iframes without associated title attribute: ");
        console.log($badFrames);
    }

    /*******************************************************/
    /*   Check Lightbox Links are <button>s not <a> tags   */
    /*******************************************************/
    var $badLightboxLinks = [];
    $(".lightbox-link").each(function(){
       if($(this).is("a")){
            $badLightboxLinks.push( $(this).get(0) );       
       } 
    });

    $(".pop-open").each(function(){
        if($(this).is("a")){
            $badLightboxLinks.push( $(this).get(0) );
        }
    })

    if($badLightboxLinks.length > 0){
        console.log("Found Lightbox Links that are <a> tags instead of <button> tags: ");
        console.log($badLightboxLinks);
    }

    /*************************************************/
    /*   Check to make sure that all popup buttons   */
    /*      1) Are <button>s instead of <a> tags     */
    /*      2) If they are a video popup, they       */
    /*         should have a data-title attribute    */
    /*         along with a data-video               */
    /*************************************************/
    var $badVideoPopButtons = [];
    var $badSemanticPopButtons = [];
    $(".pop-open").each(function(){
        if( $(this).data("video") && !$(this).data("title") ){
            $badVideoPopButtons.push( $(this).get(0) );
        }
        
        if( $(this).is("a") ){
            $badSemanticPopButtons.push( $(this).get(0) );
        }
    });

    if($badVideoPopButtons.length > 0 ){
        console.log("Found Bad Video Popup Buttons: ");
        console.log($badVideoPopButtons);
    }

    if($badSemanticPopButtons.length > 0){
        console.log("Found Popup Buttons using <a> tags instead of <button tags: ");
        console.log($badSemanticPopButtons);
    }

        
    /*************************************************************/
    /*   Popups - Make sure all popups have correct attributes   */
    /*************************************************************/
    var $badPopups = [];
    $(".pop-outer").each(function(){
        var roleAttr   = $(this).attr("role");
        var labelledBy = $(this).attr("aria-labelledby");
        var label      = $(this).attr("aria-label");
        
        if(
            !roleAttr || 
            roleAttr != "dialog" ||
            (!labelledBy && !label)
        ){
            $badPopups.push( $(this).get(0) );
        } 
    });

    if($badPopups.length > 0){
        console.log("Popup doesn't have proper attributes: ");
        console.log($badPopups);
    }


	/***************************************************************/
    /*   Buttons - Make sure all buttons have an accessible name   */
    /***************************************************************/
	var $emptyButtons = [];

	$(".site-container button").each(function(){
		var innerImgAlt = $(this).find("img").attr('alt');
		var ariaLabel   = $(this).attr("aria-label");

		if( 
			!$(this).text().trim() && 
			!(innerImgAlt && innerImgAlt.trim().length > 0) &&
			!ariaLabel
		){
			$emptyButtons.push( $(this).get(0) );
		}
	});

	if($emptyButtons.length > 0){
		console.log("Found buttons without appropriate text: ");
		console.log($emptyButtons);
	}
		

    /******************************************************************/
    /*   Links - Make sure all links on the page:                     */
    /*     1) Don't have "here" inside them to prevent vague links    */
    /*     2) Don't have a valid "href" attribute, that might         */
    /*        indicate that this element should be a <button>         */ 
    /*        instead.                                                */
    /*     3) For links that open in a new tab, make sure they have   */
    /*        some manner of supplementary text announcing that to    */
    /*        the user                                                */
    /******************************************************************/
    var $vagueLinks = [];
    var $linksThatShouldBeButtons = [];
	var $emptyLinks = [];
    var $newTabLinks = [];
    
    $(".site-container a").each(function(){
        /****************************************************/
        /*   Classify this as a vague link if it contains   */ 
        /*   the text "here"                                */
        /****************************************************/
        if( 
            $(this).text().indexOf(" here") !== -1
        ){
            $vagueLinks.push( $(this).get(0) );
        }

        /**************************************************/
        /*   Check if links have a valid HREF attribute   */
        /**************************************************/
        if( 
            !$(this).attr("href").startsWith("http://") &&
            !$(this).attr("href").startsWith("https://") &&
            !$(this).attr("href").startsWith("/") &&
            !$(this).attr("href").startsWith("mailto:") &&
            !$(this).attr("href").startsWith("tel:")
        ){
            $linksThatShouldBeButtons.push( $(this).get(0) );
        }

		/*********************************************/
		/* Check if links are "empty" (lacking text) */
		/*********************************************/
		var innerImgAlt = $(this).find("img").attr('alt');
		var ariaLabel   = $(this).attr("aria-label");
		
		if( 
			!$(this).text().trim() && 
			!(innerImgAlt && innerImgAlt.trim().length > 0) &&
			!ariaLabel
		){
			$emptyLinks.push( $(this).get(0) );
		}

        /*************************************************************************************/
        /*    Check if links that open in a new tab have one of the following:               */
        /*      1) An aria-label mentioning a new tab                                        */
        /*      2) An IMG within with an alt tag mentioning a new tab                        */
        /*      3) If there is an element within that mentions a new tab                     */
        /*************************************************************************************/
        if( $(this).attr("target") == "_blank" ){
            var ariaLabel  = $(this).attr("aria-label");
            var insideImg  = $(this).find("img");
            var insideText = $(this).find(".sr-only");

            if( 
                (!ariaLabel || ariaLabel.indexOf("new tab") == -1 ) && 
                (!insideImg.attr("alt") || insideImg.attr("alt").indexOf("new tab") == -1 ) &&
                (!insideText || insideText.text().indexOf("new tab") == -1) &&
                $(this).attr("href").indexOf("mailto:") == -1 &&
                $(this).attr("href").indexOf("tel:") == -1
            ){
                $newTabLinks.push( $(this).get(0) );
            }
        }
    });

    if($vagueLinks.length > 0){
        console.log("Possible vague links found: ");
        console.log($vagueLinks);
    }

    if($linksThatShouldBeButtons.length > 0){
        console.log("Found links without valid HREF: ");
        console.log($linksThatShouldBeButtons);
    }

	if($emptyLinks.length > 0){
		console.log("Found links that are empty. Maybe add some text for screen readers?: ");
		console.log($emptyLinks);
	}

    if($newTabLinks.length > 0){
        console.log("Found links that open in a new tab without supplementary text: ");
        console.log($newTabLinks);
    }

    /*************************************************************/
    /*   All <input> elements have a single associated <label>   */
    /*************************************************************/
    var $badInputs = [];
    var $inputsMultipleLabels = [];
    
    $("input").each(function(){
        var $inputID = $(this).attr("id");
        var $inputType = $(this).attr("type");
        var $associatedLabels = $("label[for='" + $inputID + "']");

        if($inputType == "submit" || $inputType == "button" || $inputType == "hidden"){
            return;
        }

        if( $associatedLabels.length == 0 ){
            $badInputs.push( $(this).get(0) );
        }

        if( $associatedLabels.length > 1 ){
            $inputsMultipleLabels.push( $(this).get(0) );
        }
    });

    if($badInputs.length > 0){
        console.log("Found <input> elements without an associated <label>: ");
        console.log($badInputs);
    }

    if($inputsMultipleLabels.length > 0){
        console.log("Found <input> elements with multiple associated <label> elements: ");
        console.log($inputsMultipleLabels);
    }


    /***********************************************************************/
    /* Tablist - Check that all expected attributes in a tablist are there */
    /***********************************************************************/
     // role
	//     tablist
	//     tabpanel
	// 	      aria-labelledby -> cooresponding tab
	//     tab
	// 	      aria-controls -> cooresponding tabpanel
	// 	      aria-selected -> true/false
        
    var $badTabs = [];
    if( $("[role='tablist']").length || $("[role='tabpanel']").length || $("[role='tab']").length ){
        // We've got a tab system on the page!!

		$("[role='tabpanel']").each(function(){
			var labelledBy = $(this).attr("aria-labelledby");
			var $tab = $("#" + labelledBy);

			if( $tab.length == 0 || $tab.attr("role") != "tab" ){
				$badTabs.push( $(this).get(0) );
			}
		});

		$("[role='tab']").each(function(){
			var ariaSelected = $(this).attr("aria-selected");
			var ariaControls = $(this).attr("aria-controls");
			var $tabpanel = $("#" + ariaControls);

			if( $tabpanel.length == 0 || !ariaSelected || $tabpanel.attr("role") != "tabpanel" ){
				$badTabs.push( $(this).get(0) );
			}
		});
    }

	if($badTabs.length > 0){
		console.log("Found problematic tab components: ");
		console.log($badTabs);
	}

    /**************************************************/
    /*   IMG - Output table of src,alt,width,height   */
    /**************************************************/
    var $badImages = [];
    $("img").each(function(){
        // Ignore any IMG element without a src attribute 
        if(!$(this).attr("src")){
            return true;
        }
        
        if( !$(this).attr("alt") || !$(this).attr("width") || !$(this).attr("height") ){
            $badImages.push({
                "src":    $(this).attr("src"),
                "alt":    $(this).attr("alt"),
                "width":  $(this).attr("width"),
                "height": $(this).attr("height"),
                "el":     $(this).get(0)
            });
        } 
    });

    if($badImages.length > 0){
        console.log("Potential Images without Alt, Width, and/or Height:")
        console.table($badImages);
    } 
})(jQuery);
