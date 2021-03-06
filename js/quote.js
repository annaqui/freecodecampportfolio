
//1. User Story: I can click a button to show me a new random quote.

//Retrieve Quote and Author from API
//Insert quote into the blockquote with id #quote
//Insert author into paragraph with id #attributed
//Set cite attribute in Blockquote to the link the Quote came from.

//2. User Story: I can press a button to tweet out a quote.
//Set Tweet URL in anchor with id #tweetit with quote and author:  'https://twitter.com/intent/tweet' + quote +  " - "  + author

/*'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
Returns quotes in this format:
[{
	"ID":1762,
	"title":"R. Klanten, H. Hellige",
	"content":"<p>Today\u2019s designers and illustrators are synthesizing the best elements from past eras of graphic design to create a new visual language with a reduced and rational approach.<\/p>\n",
	"link":"https:\/\/quotesondesign.com\/r-klanten-h-hellige\/",
	"custom_meta":{"Source":"<a href=\"https:\/\/shop.gestalten.com\/index.php\/catalog\/product\/view\/id\/4015#moreinfo\">Book Description<\/a>"}
}] */

function retrieveQuote(){
	$.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        //Check if quote plus author plus hypehn are short enought to Tweet.
        //This makes it a recursive function but relies on there being enough quotes being short enough to Tweet
        if (post.title.length + post.content.length + 3 > 140){
        	retrieveQuote();
        }
        else{
	        $('#attributed').html(post.title);
	        $('#quote').html(post.content);
	        $('#tweetThis').attr('href', "https://twitter.com/intent/tweet?text=" + $(post.content).text() + ' - ' + post.title);
	        $('#quote').attr('cite', post.link);
    	}
      },
      cache: false
    });
 };   

 $(document).ready(function() {
 	 retrieveQuote();
 	 $("#getQuote").on("click", function(){
 	 	retrieveQuote(); 	 	
 	});
 });