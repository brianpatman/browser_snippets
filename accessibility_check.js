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
