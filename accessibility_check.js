(function($){
    /*********************************************************************/
    /*    Check if SVG and Font Awesome Icons have aria-hidden='true'    */
    /*********************************************************************/
    var $badIcons = [];
    
    $("svg,.fa").each(function(){
        if($(this).attr("aria-hidden") !== "true"){
            $badIcons.push($(this).get(0));
        }
    });

    if($badIcons.length > 0){
        console.log("Found Icons without aria-hidden:");
        console.log($badIcons);
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


    /******************************************************************/
    /*   Links - Make sure all links on the page:                     */
    /*     1) Don't have "here" inside them to prevent vague links    */
    /*     2) For links that open in a new tab, make sure they have   */
    /*        some manner of supplementary text announcing that to    */
    /*        the user                                                */
    /*     3)                                                         */
    /******************************************************************/

    /**************************************************/
    /*   IMG - Output table of src,alt,width,height   */
    /**************************************************/
    var $badImages = [];

    $("img").each(function(){
        if( !$(this).attr("alt") || !$(this).attr("width") || !$(this).attr("height") ){
            $badImages.push( {"src":$(this).attr("src"),"alt":$(this).attr("alt"),"width":$(this).attr("width"),"height":$(this).attr("height"),"el":$(this).get(0)} );
        } 
    });

    if($badImages.length > 0){
        console.log("Potential Images without Alt, Width, and/or Height:")
        console.table($badImages);
    } 
})(jQuery);
